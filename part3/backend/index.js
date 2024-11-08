const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const requestLogger = (req,res,next) =>{
  console.log('Method: ',req.method)
  console.log('Path: ', req.path)
  console.log('Body: ',req.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
 
// app.get('/',(request,response)=>{
//   response.send('Hello world')
// })

app.get('/',(request,response)=>{
  response.json(notes)
})

app.get('/api/notes/:id',(req,res)=>{
  const id = req.params.id
  const note = notes.find(note=>note.id===id)
  if(note){
    res.json(note)
  }
  else{
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length>0?Math.max(...notes.map(n=>n.id)):0
  return String(maxId+1)
}

app.post('/api/notes',(req,res)=>{
  const body = req.body
  if(!body.content){
    return res.status(400).json({error:'Content missing'})
  }

  const note = {
    content:body.content,
    important:Boolean(body.important),
    id:generateId()
  }

  notes = notes.concat(note)
  res.json(note)
})

app.delete('/api/notes/:id',(req,res)=>{
  const id = req.params.id
  notes = notes.filter(note=>note.id!==id)
  res.status(204).end()
})


const unknownEndPoint = (req,res,next)=>{
  res.status(404).send({error:'page not found'})
}

app.use(unknownEndPoint)

const PORT = process.env.PORT||3001
app.listen(PORT,()=>{
  console.log('server is running on port',PORT)
})