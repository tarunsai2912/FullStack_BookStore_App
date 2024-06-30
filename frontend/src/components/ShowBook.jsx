import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BackButton from './BackButton'
import Spinner from './Spinner'

function ShowBook() {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    handleShow()
  }, [])

  const handleShow = async () => {
    setLoading(true)
    try{
      const response = await axios.get(`http://localhost:5000/books/${id}`)
      setBook(response.data)
      setLoading(false)
    } catch(err){
      console.log('Error fetching books:', err);
      setLoading(false)
    }
  }

  return (
    <div className='p-4 bg-[#FECD45] w-[100vw] h-[100vh]'>
      <BackButton />
      <h1 className='text-5xl my-8 font-serif'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-black rounded-xl w-fit p-4 bg-[#1A2238] text-white text-2xl font-serif shadow-5xl'>
          <div className='my-4'>
            <span className='mr-4 text-[#e04b37] text-2xl font-serif shadow-5xl'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-[#e04b37] font-serif shadow-5xl'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-[#e04b37] font-serif shadow-5xl'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-[#e04b37] font-serif shadow-5xl'>Published Year</span>
            <span>{book.year}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-[#e04b37] font-serif shadow-5xl'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-2xl mr-4 text-[#e04b37] font-serif shadow-5xl'>Last Updated Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
