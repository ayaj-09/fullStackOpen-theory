const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

console.log('Connecting to MONGO DB')

mongoose.connect(uri)
  .then(result => {
    console.log('Connected to MONGO DB')
  })
  .catch(error  => {
    console.log(error.message)
  })

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