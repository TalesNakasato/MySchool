const cors = require('cors');
const express = require('express')
const routes = require('./routes')

const app = express()
const port = 9000
const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOrigin));

routes(app)

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app