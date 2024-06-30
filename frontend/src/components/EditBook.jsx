import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import BackButton from './BackButton'
import Spinner from './Spinner'

function EditBook() {
  const [title, setTitle] = useState('')
  const {id} = useParams()
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    handleEdit()
  }, [])

  const handleEdit = async () => {
    setLoading(true)
    try{
      const response = await axios.get(`http://localhost:5000/books/${id}`)
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setYear(response.data.year)
      setLoading(false)
    } catch(err){
      console.log('Error fetching books:', err);
      setLoading(false)
    }
  }

  const handleEditBook = () => {
    const newBook = {
      title,
      author,
      year
    }
    setLoading(true)
    axios.put(`http://localhost:5000/books/${id}`, newBook).then(() => {
      setLoading(false)
      navigate('/')
    }).catch((err) => {
      console.log('Error fetching books:', err);
      setLoading(false)
    })
  }

  return (
    <div className='p-4 bg-[#FECD45] w-[100vw] h-[100vh]'>
      <BackButton />
      <h1 className='text-5xl my-8 font-serif'>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : ''}
      <div className='flex flex-col border-2 border-black bg-[#1A2238] rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='mr-4 text-[#e04b37] text-2xl font-serif'>Title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 font-serif border-black px-4 py-2 w-full'></input>
        </div>
        <div className='my-4'>
          <label className='mr-4 text-[#e04b37] text-2xl font-serif'>Author</label>
          <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 font-serif border-black px-4 py-2 w-full'></input>
        </div>
        <div className='my-4'>
          <label className='mr-4 text-[#e04b37] text-2xl font-serif'>Published Year</label>
          <input type='number' value={year} onChange={(e) => setYear(e.target.value)} className='border-2 font-serif border-black px-4 py-2 w-full'></input>
        </div>
        <button className='p-2 bg-sky-300 m-8 font-serif text-2xl' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook
