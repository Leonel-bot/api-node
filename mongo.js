require('dotenv').config()
const mongoose = require('mongoose')
const connectionString = process.env.MONGO_URL


mongoose.connect(connectionString , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected');
})
.catch((error) => {
    console.log(error);
})