const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')




usersRouter.get('/' , (request , response) => {
    User.find({}).populate('notes')
    .then(users => {
        response.json(users)
    })
})

usersRouter.post('/' , async (request , response) => {
    const {body} = request
    const {name, username, password} = body

    const existsUser = await User.findOne({username})

    if(existsUser){
        response.status(404).json({error : 'Existing user'})
    }else{
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            username,
            passwordHash
        })
        newUser.save()
        .then(user => {
            response.json(user)
        })
    }
})

usersRouter.delete('/:id' , (request, response) => {
    const {id} = request.params
    User.deleteMany({_id : id})
    .then(() => {
        response.status(204).end()
        console.log('Content deleted');
    })
    .catch(error => {
        next(error)
    })
})



module.exports = usersRouter