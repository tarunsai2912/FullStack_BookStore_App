import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreateBook from './components/CreateBook'
import EditBook from './components/EditBook'
import DeleteBook from './components/DeleteBook'
import HomeBook from './components/HomeBook'
import ShowBook from './components/ShowBook'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomeBook />}></Route>
      <Route path='/books/create' element={<CreateBook />}></Route>
      <Route path='/books/edit/:id' element={<EditBook />}></Route>
      <Route path='/books/details/:id' element={<ShowBook />}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook />}></Route>
    </Routes>
  )
}

export default App
