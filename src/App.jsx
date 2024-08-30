import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './views/BooksPage.jsx';
import SingleBookPage from './views/SingleBookPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import AddBookPage from './views/AddBookPage.jsx';

import {selectUsers} from './store/usersSlice.js';
import {useSelector} from 'react-redux';

function App() {

  const user = useSelector(selectUsers);
  return (
   <>  
      {
        user.currenUser ?
        <BrowserRouter>
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="add-book" element={<AddBookPage />} />
            <Route path="book/:id" element={<SingleBookPage />} />
            <Route path="book-list" element={<BooksPage />} />
          </Routes>
        </BrowserRouter>
        : <LoginPage/>
      }
   </>
  )
}

export default App
