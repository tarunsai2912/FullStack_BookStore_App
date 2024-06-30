import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'

function HomeBook() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchBooks()
  },[])

  const fetchBooks = async () => {
    setLoading(true)
    try{
      const response = await axios.get('http://localhost:5000/books')
      setBooks(response.data.books)
      setLoading(false)
    } catch(err){
      console.log('Error fetching books:', err);
      setLoading(false)
    }
  }

  return (
    <div className='p-4 bg-[#FECD45] w-[100vw] h-[100vh] overflow-y-scroll'>
      <div className='flex justify-between items-center'>
        <h1 className='text-5xl my-8 font-serif'>Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr className='h-[10vh]'>
              <th className='border-none bg-[#2568FB] text-white border-slate-600 rounded-md text-4xl font-serif shadow-5xl'>S.No</th>
              <th className='border-none bg-[#2568FB] text-white border-slate-600 rounded-md text-4xl font-serif shadow-5xl'>Title</th>
              <th className='border-none bg-[#2568FB] text-white border-slate-600 rounded-md text-4xl font-serif shadow-5xl'>Author</th>
              <th className='border-none bg-[#2568FB] text-white border-slate-600 rounded-md text-4xl font-serif shadow-5xl'>Published Year</th>
              <th className='border-none bg-[#2568FB] text-white border-slate-600 rounded-md text-4xl font-serif shadow-5xl'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((each, index) => {
              return(
                <tr key={each._id} className='h-[8vh]'>
                  <td className='border-none border-slate-700 rounded-md text-center text-2xl font-serif bg-[#1A2238] text-[#e04b37]'>
                    {index + 1}
                  </td>
                  <td className='border-none border-slate-700 rounded-md text-center text-2xl font-serif bg-[#1A2238] text-[#e04b37]'>
                    {each.title}
                  </td>
                  <td className='border-none border-slate-700 rounded-md text-center text-2xl font-serif bg-[#1A2238] text-[#e04b37]'>
                    {each.author}
                  </td>
                  <td className='border-none border-slate-700 rounded-md text-center text-2xl font-serif bg-[#1A2238] text-[#e04b37]'>
                    {each.year}
                  </td>
                  <td className='border-none border-slate-700 rounded-md text-center text-2xl font-serif bg-[#1A2238] text-[#e04b37]'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/details/${each._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
                      </Link>
                      <Link to={`/books/edit/${each._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600'/>
                      </Link>
                      <Link to={`/books/delete/${each._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600'/>
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default HomeBook
