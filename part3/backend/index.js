const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

const requestLogger = (req,res,next) =>{
  console.log('Method: ',req.method)
  console.log('Path: ', req.path)
  console.log('Body: ',req.body)
  console.log('---')
  next()
}

const errorHandler = (error,req,res,next)=>{
  console.log(error.message)
  if(error.name=='CastError'){
    return res.status(400).send({error:'malformed ID'})
  }
  else if(error.name=='ValidationError'){
    return res.status(400).json({error:error.split(':')})
  }
  next(error)
}
app.use(requestLogger)

 
app.get('/',(request,response)=>{
  response.send('Hello world')
})

app.get('/api/notes',(request,response)=>{
  Note.find({}).then(notes=>{
    response.json(notes)
  })
})

app.get('/api/notes/:id',(req,res,next)=>{
  Note.findById(req.params.id).then(note=>{
    if(note){
      res.json(note)
    }
    else{
      res.status(404).end()
    }
  })
  .catch(error=>{
    next(error)
  })
})


app.post('/api/notes',(req,res,next)=>{
  const body = req.body

  const note = new Note({
    content:body.content,
    important:body.important
  })

  note.save().then(savedNote =>{
    res.json(savedNote)
  })
  .catch(error=>next(error))
})

app.delete('/api/notes/:id',(req,res,next)=>{
  Note.findByIdAndDelete(req.params.id)
  .then(result=>{
    if(result){
      res.status(204).end()
    }
    else{
      res.status(404).end()
    }  
  })
  .catch(error=>next(error))
})

app.put('/api/notes/:id',(req,res,next)=>{
  const body = req.body
  const note = {
    content: body.content,
    important:body.important
  }
  Note.findByIdAndUpdate(req.params.id,note,{new:true,runValidators:true,context:'query'})
  .then(result=>{
    if(result){
      res.json(result)
    }
    else{
      res.status(404).end()
    } 
  })
  .catch(error=>next(error))
})


const unknownEndPoint = (req,res,next)=>{
  res.status(404).send({error:'page not found'})
}

app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log('server is running on port',PORT)
})