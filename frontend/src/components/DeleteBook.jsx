import React,{useState} from 'react'
import BackButton from './BackButton'
import Spinner from './Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteBook() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  const handleDeleteBook = () => {
    setLoading(true)
    axios.delete(`http://localhost:5000/books/${id}`).then(() => {
      setLoading(false)
      navigate('/')
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  return (
    <div className='p-4 bg-[#FECD45] w-[100vw] h-[100vh]'>
      <BackButton />
      <h1 className='text-5xl my-8 font-serif'>Delete Book</h1>
      {loading ? (<Spinner />) : ''}
      <div className='flex flex-col items-center border-2 border-black rounded-xl bg-[#1A2238] w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl font-serif text-[#e04b37]'>Are you sure! You want to delete this Book</h3>
        <button className='p-4 bg-red-600 text-white text-2xl m-8 w-full font-serif' onClick={handleDeleteBook}>Yes! Delete It</button>
      </div>
    </div>
  )
}

export default DeleteBook
