const express = require('express')
const cors = require('cors')
const connectToMongod = require('./db.js')
// const User = require('./models/user')

connectToMongod();

const app = express();
app.use(express.json())
const port = 8080 || process.env.PORT;
app.use(cors())

app.get('/',(req, res)=>{
})

app.use('/api/auth', require('./routes/auth'))

app.listen(port, ()=>{
    console.log(`server running on 'http://localhost:${port}`)
})