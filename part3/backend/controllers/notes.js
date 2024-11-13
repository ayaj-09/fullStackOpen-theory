const notesRouter = require('express').Router()
const Note = require('../models/note')

// notesRouter.get('/',(request,response) => {
//   response.send('Hello world')
// })

notesRouter.get('/',(request,response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id',(req,res,next) => {
  Note.findById(req.params.id).then(note => {
    if(note){
      res.json(note)
    }
    else{
      res.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})


notesRouter.post('/',(req,res,next) => {
  const body = req.body

  const note = new Note({
    content:body.content,
    important:body.important
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
    .catch(error => next(error))
})

notesRouter.delete('/:id',(req,res,next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result => {
      if(result){
        res.status(204).end()
      }
      else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.put('/:id',(req,res,next) => {
  const body = req.body
  const note = {
    content: body.content,
    important:body.important
  }
  Note.findByIdAndUpdate(req.params.id,note,{ new:true,runValidators:true,context:'query' })
    .then(result => {
      if(result){
        res.json(result)
      }
      else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

module.exports = notesRouter