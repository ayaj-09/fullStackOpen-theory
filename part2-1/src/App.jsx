import Note from './components/Note'
import {useState,useEffect} from 'react'
import noteService from './Service/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote,setNewNote] = useState('a new note...')
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

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
        setErrorMessage(`Note ${note.content} was already removed from the server`)
        setTimeout(()=>{
          setErrorMessage(null)
        },2000)
        setNotes(notes.filter(note=>note.id!==id))
      })
  }

  const notesToShow = showAll? notes: notes.filter(note=>note.important)


   return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
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
      <Footer/>
    </div>
  )
}
export default App