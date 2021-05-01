const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const getToken = require('../services/getToken')
const { listIndexes } = require('../models/User')



notesRouter.get('/' , (request , response) => {
    Note.find({}).populate('user' , {
        username : 1,
        name: 1
    })
    .then(notes => {
        response.json(notes)
    })
})

notesRouter.get('/:id' , (request , response , next) => {
    const {id} = request.params
    Note.findById(id)
    .then(note => {
        response.json(note)
    })
    .catch(error => {
        next(error)
    })
})


notesRouter.post('/' , async (request , response ,next) => {
    const {body} = request
    const { title, description , date = new Date() , userId } = body
    

    const token = getToken(request)

    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch {}

    

    if(!decodedToken.id || !token){
        return response.status(401).json({error : 'token missing or invalid'})
    }

    const {id} = decodedToken
    const user = await User.findById(id)

    const newNote = new Note({
       title,
       description,
       date,
       user : id
    })
    newNote.save()
    .then(note =>  {
        user.notes = user.notes.concat(note)
        user.save()
        response.json(note)
    })
})


notesRouter.delete('/:id' , (request , response, next) => {
    const {id} = request.params
    Note.deleteMany({_id : id})
    .then(() => {
        response.status(204).end()
        console.log('Content deleted');
    })
    .catch(error => {
        next(error)
    })
})






module.exports = notesRouter