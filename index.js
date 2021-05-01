require('./mongo')
const express = require('express')
const loginRouter = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const handleError = require('./middleware/handleError')
const notFound = require('./middleware/notFound')
const app = express()
app.use(express.json())




app.use('/api/notes' , notesRouter)
app.use('/api/users' , usersRouter)
app.use('/api/login' , loginRouter)



app.use(handleError)
app.use(notFound)





const PORT = process.env.PORT || 3001
app.listen(PORT , () => {
    console.log(`Server running in port ${PORT}`);
})