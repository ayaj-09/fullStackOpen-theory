import Note from './components/Note'
import {useState,useEffect} from 'react'
import axios from 'axios'
import noteService from './Service/notes'

const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('a new note...')
  const [showAll,setShowAll] = useState(true)

  useEffect(()=>{
    noteService
      .getAll()
      .then(initialNotes=>{
        setNotes(initialNotes)
      })
  },[])


  const addNote = function(event) {
    event.preventDefault()
    const noteObject = {
      content:newNote,
      important:Math.random()<0.5
    }
    noteService
      .createNote(noteObject)
      .then(note=>{
        setNotes(notes.concat(note))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) =>{
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n=>n.id===id)
    const updatedNote = {...note,important:!note.important}

    noteService
      .updateNote(id,updatedNote)
      .then(note=>setNotes(notes.map(n=>n.id===id?note:n)))
      .catch(error=>{
        alert(
          `the note ${note} is already deleted`
        )
        setNotes(notes.filter(note=>note.id!==id))
      })
  }

  const notesToShow = showAll? notes: notes.filter(note=>note.important)


   return (
    <div>
      <h1>Notes</h1>
      <button onClick = {()=>setShowAll(!showAll)}>
        show {showAll? 'importand': 'all'}
      </button>
      <ul>
        {notesToShow.map(n=>
        <Note key = {n.id} note = {n} toggleImportance={()=>toggleImportanceOf(n.id)}/>
        )}
      </ul> 
      <form onSubmit = {addNote}>
        <input type='text' 
        value = {newNote}
        onChange={handleNoteChange}/>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}
export default App