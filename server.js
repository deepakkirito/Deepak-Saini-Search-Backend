const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const plot = require('./ads-model');

const app = express();

app.use(cors());

app.use('/', (req,res,next) => {
    if(req.url === '/') {
        res.status(200).send('working');
    } else {
        next();
    }
})
app.use('/', routes);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;
db.on(`error`,console.error.bind(console,`DB error`));
db.on(`open`, ()=>{
    console.log(`MongoDB is connected Successfully`);;
    startServer();
})

const startServer = () => {
    app.listen(process.env.PORT , (err)=>{
        if(err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server is listening at port ${process.env.PORT}`);
    })
}

