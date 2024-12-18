const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content:{
    type:String,
    minLength:5,
    required:true,
  },
  important:Boolean
})

noteSchema.set('toJSON',{
  transform:(document,returnedObj) => {
    returnedObj.id = String(returnedObj._id)
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Note',noteSchema)