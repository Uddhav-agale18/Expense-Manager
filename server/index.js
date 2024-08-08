const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const route = require('./routes/user.route')
const cookieParser = require('cookie-parser');
const typeRoute = require('./routes/typeRoutes');
const expRoute = require('./routes/expRoutes');

app.use(express.json())

dotenv.config()

app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
}));

MONGOdb_URL = process.env.MONGO_URL;
PORT = process.env.PORT;
mongoose.connect(MONGOdb_URL)
    .then(() => {
        console.log("Database is connected successfully...");
        app.listen(PORT, () => {
            console.log("App running on http://localhost:" + PORT);
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

const logService = (req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()}, ${req.url}`)
    next()
}

app.use('/user', logService, route)
app.use('/types', logService, typeRoute)
app.use('/exp', logService, expRoute)

app.use('/profile', express.static('upload/images'))

app.use("*", (Req, res) => {
    res.status(404).json({ message: "No resource found" })
})
