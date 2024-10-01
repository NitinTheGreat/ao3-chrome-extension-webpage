import { useState, useRef, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';

const initialNotes = [
  { id: '1', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: false },
  { id: '2', title: 'Twist and Shout', tags: ['Angst', 'Historical', 'Tragedy'], completed: false },
  { id: '3', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '4', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: false },
  { id: '5', title: 'Crying Lightning', tags: ['Angst', 'Skugrou'], completed: false },
  { id: '6', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: true },
]

export default function Component() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : initialNotes
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', tags: [] })
  const [currentTag, setCurrentTag] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const modalRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (newNote.title.trim() === '') return
    const newNoteWithId = {
      ...newNote,
      id: Date.now().toString(),
      completed: false
    }
    setNotes(prevNotes => [...prevNotes, newNoteWithId])
    setNewNote({ title: '', tags: [] })
    setCurrentTag('')
    setIsModalOpen(false)
  }

  const toggleNoteCompletion = (id) => {
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ))
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  const handleTagInput = (e) => {
    const value = e.target.value
    if (value.endsWith(' ') && value.trim() !== '') {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, value.trim()]
      }))
      setCurrentTag('')
    } else {
      setCurrentTag(value)
    }
  }

  const removeTag = (tagToRemove) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleSelectedTag = (tag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    )
  }

  const sortedNotes = [...notes].sort((a, b) => {
    const aMatchCount = a.tags.filter(tag => selectedTags.includes(tag)).length
    const bMatchCount = b.tags.filter(tag => selectedTags.includes(tag)).length
    if (aMatchCount !== bMatchCount) {
      return bMatchCount - aMatchCount
    }
    return notes.indexOf(a) - notes.indexOf(b)
  })

  const renderNotes = (completed) => {
    return sortedNotes
      .filter(note => note.completed === completed)
      .map(note => (
        <div key={note.id} className="flex h-[92px] px-6 py-4 items-center self-stretch bg-white mb-4 rounded-lg">
          <input
            type="checkbox"
            className="w-4 h-4 mr-4 rounded border border-[rgba(0,0,0,0.80)] bg-[#EEE]"
            checked={completed}
            onChange={() => toggleNoteCompletion(note.id)}
          />
          <div className="flex-grow">
            <span className={completed ? "line-through" : ""}>{note.title}</span>
            <p className="text-sm text-gray-400 mt-1">
              {note.tags.map(tag => (
                <span 
                  key={tag} 
                  className={`inline-block mr-1 ${
                    selectedTags.includes(tag) ? 'text-blue-500 font-bold' : ''
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" onClick={() => deleteNote(note.id)} className="cursor-pointer">
            <path d="M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.4907C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5" stroke="#BBBBBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ))
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="min-h-screen p-4 md:ml-16 bg-[#F3F5F7] w-full">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold mb-4 text-blue-900">Notes</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-blue-700">Manage your Reading list :</h2>
              <div 
                className="flex w-full h-[92px] px-6 md:px-12 py-[22px] items-start gap-[29px] rounded-lg border border-dashed border-[#B0B0B0] bg-white mb-4 cursor-pointer" 
                onClick={() => setIsModalOpen(true)}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 10V38M10 24H38" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-500">Add Name</span>
              </div>

              {renderNotes(false)}

              <h2 className="text-lg font-semibold mb-2 mt-6 text-blue-700">Completed :</h2>
              {renderNotes(true)}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-blue-700">Manage Tags :</h2>
              <div className="flex p-6 md:p-10 items-center content-center gap-4 self-stretch flex-wrap rounded-lg bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.20)]">
                <div className="relative mb-4 w-full">
                  <input
                    type="text"
                    placeholder="Search Tags"
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTag}
                    onChange={(e) => setSearchTag(e.target.value)}
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-sm cursor-pointer ${
                        selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => toggleSelectedTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div ref={modalRef} className="bg-white rounded-xl w-full max-w-[560px] p-8">
              <h3 className="text-xl font-bold mb-6 text-blue-900">Add a new Note :</h3>
              <div className="mb-6 relative">
                <input
                  type="text"
                  placeholder="Add name"
                  className="w-full p-2 border rounded-md pr-10"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {newNote.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="#Add tags"
                  className="w-full p-2 border rounded-md"
                  value={currentTag}
                  onChange={handleTagInput}
                  onKeyDown={(e) => {
                    if (e.key === ' ' && currentTag.trim() !== '') {
                      e.preventDefault()
                      setNewNote(prev => ({
                        ...prev,
                        tags: [...prev.tags, currentTag.trim()]
                      }))
                      setCurrentTag('')
                    }
                  }}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-[#285599] text-white px-6 py-2 rounded-md font-semibold"
                  onClick={addNote}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}