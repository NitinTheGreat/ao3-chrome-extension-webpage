import { useState } from 'react'
import { Dialog } from '@headlessui/react'

const demoNotes = [
  { id: '1', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: false },
  { id: '2', title: 'Twist and Shout', tags: ['Angst', 'Historical', 'Tragedy'], completed: false },
  { id: '3', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '4', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '5', title: 'Crying Lightning', tags: ['Angst', 'Skugrou'], completed: false },
  { id: '6', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: true },
]

export default function Component() {
  const [notes, setNotes] = useState(demoNotes)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', tags: '' })
  const [searchTag, setSearchTag] = useState('')

  const addNote = () => {
    const newNoteWithId = {
      ...newNote,
      id: Date.now().toString(),
      tags: newNote.tags.split(',').map(tag => tag.trim()),
      completed: false
    }
    setNotes([...notes, newNoteWithId])
    setNewNote({ title: '', tags: '' })
    setIsModalOpen(false)
  }

  const toggleNoteCompletion = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Notes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Manage your Reading list :</h2>
          <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200 cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" disabled />
                <span className="text-gray-500">Add Name</span>
              </div>
              <span className="text-gray-400">+</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">#Add Tags</p>
          </div>

          {notes.filter(note => !note.completed).map(note => (
            <div key={note.id} className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={() => toggleNoteCompletion(note.id)}
                  />
                  <span>{note.title}</span>
                </div>
                <span className="text-gray-400 cursor-pointer" onClick={() => deleteNote(note.id)}>Delete</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {note.tags.map(tag => `#${tag}`).join(' ')}
              </p>
            </div>
          ))}

          <h2 className="text-lg font-semibold mb-2 mt-6 text-blue-700">Completed :</h2>
          {notes.filter(note => note.completed).map(note => (
            <div key={note.id} className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked
                    onChange={() => toggleNoteCompletion(note.id)}
                  />
                  <span className="line-through">{note.title}</span>
                </div>
                <span className="text-gray-400 cursor-pointer" onClick={() => deleteNote(note.id)}>Delete</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {note.tags.map(tag => `#${tag}`).join(' ')}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Manage Tags :</h2>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search Tags"
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
              />
              <span className="absolute right-3 top-2 text-gray-400">🔍</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative z-20">
            <h3 className="text-lg font-medium mb-4">Add New Note</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 border rounded"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="w-full mb-4 p-2 border rounded"
              value={newNote.tags}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={addNote}
              >
                Add Note
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
