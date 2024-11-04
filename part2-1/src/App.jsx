import Note from './components/Note'
import {useState} from 'react'

const App = (props) => {
  const [notes,setNotes] = useState(props.notes)
  const [newNote,setNewNote] = useState('a new note...')
  const [showAll,setShowAll] = useState(true)

  const addNote = function(event) {
    event.preventDefault()
    const noteObject = {
      id:String(notes.length+1),
      content:newNote,
      important:Math.random()<0.5
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) =>{
    setNewNote(event.target.value)
  }

  const notesToShow = showAll? notes: notes.filter(note=>note.important)


   return (
    <div>
      <h1>Notes</h1>
      <button onClick = {()=>setShowAll(!showAll)}>
        show {showAll? 'importand': 'all'}
      </button>
      <ul>
        {notesToShow.map(n=><Note key = {n.id} note = {n}/>)}
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