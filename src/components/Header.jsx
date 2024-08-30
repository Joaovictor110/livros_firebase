import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth} from '../firebase/config.js'
import {useDispatch} from 'react-redux'
import {setUser} from '../store/usersSlice.js' 

function Header({pageTitle}) {

  const dispatch = useDispatch()

  function handleSair(){
    if(confirm('Tem certeza ?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null))
        // Sign-out successful.
       }).catch((error) => {
         console.log(error)
         // An error happened.
       });
    }
    
  }

    return (
      <>

            <h1>{pageTitle}</h1>

            <div className="header-btns">

                    <NavLink to="/">
                      <button className="btn">
                          Livros
                      </button>
                    </NavLink>

                    <NavLink to="/add-book">
                      <button className="btn">
                          Add Livro +
                      </button>
                    </NavLink>

                    <button onClick={handleSair} className="btn transparent">
                      Sair
                    </button>

               
            </div>
    
      </>
    )
  }
  
  export default Header
  