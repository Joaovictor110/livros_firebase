import {useState} from 'react';
import { auth} from '../firebase/config.js'
import { 
   createUserWithEmailAndPassword
  ,sendPasswordResetEmail
  ,signInWithEmailAndPassword
  ,onAuthStateChanged
 } from "firebase/auth";

import {useDispatch} from 'react-redux'
import {setUser} from '../store/usersSlice.js' 

function LoginPage() {

  const dicionario_erro = {
    "auth/invalid-credential" : "E-mail ou senha invalida",
    "auth/invalid-email" : "E-mail invalido",
    "auth/email-already-in-use" : "A conta já existe"
  }

  const [loginType, setLoginType] = useState('login');
  const [userCred, setUserCred] = useState('')
  const [error, setError] = useState('')

 
  const  dispatch =  useDispatch()

  onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    dispatch(setUser({id: user.uid, email: user.email}))
    const uid = user.uid;
    // ...
  } else {
    // No user is signed in.
    dispatch(setUser(null))
  }
  })

  function handleCred(e){
    setUserCred({...userCred, [e.target.name]: e.target.value})
  }
 
  function handleCriar(e){
    e.preventDefault()
    setError('')

    
    createUserWithEmailAndPassword(auth, userCred.email, userCred.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      console.log(user)
      // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode)
       setError(dicionario_erro [error.code] || error.message)
      // ..
    });
    }

    function handleEntrar(e){
      e.preventDefault()
      setError('')
      signInWithEmailAndPassword(auth, userCred.email, userCred.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setError(dicionario_erro [error.code] || error.message) 
        //...
      });
    }
    
    function handleRedefinirSenha(){
      const email = prompt('Digite seu E-mail')
      sendPasswordResetEmail(auth, email)
      alert('E-mail enviado com instruções para redefinir sua senha!')
    }



  
    return (
      <>
        <div className="container login-page">
          <section>
            <h1>Etec Albert Einstein</h1>
            <p>Entre ou crie uma conta para continuar.</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Entrar
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Criar Conta
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>E-mail *</label>
                      <input onChange={(e)=>{handleCred(e)}} type="text" name="email" placeholder="Informe seu email" />
                  </div>
                  <div className="form-control">
                      <label>Senha *</label>
                      <input onChange={(e)=>{handleCred(e)}} type="password" name="password" placeholder="Informe a senha" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>handleEntrar(e)} className="active btn btn-block">Entrar</button>
                    : 
                    <button onClick={(e)=>handleCriar(e)} className="active btn btn-block">Criar Conta</button>
                  }

                  { error &&
                  <div className="error">
                      {error}
                    </div>
                  }
                  <p className="forgot-password" onClick={handleRedefinirSenha}>Esqueci minha senha.</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage