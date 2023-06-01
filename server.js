const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const userRoutes = require('./app/routes/user.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userRoutes);

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET", true);
        return res.status(200).json({});
    }
    next();
});
// Connect the database
mongoose.connect(process.env.MONNGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Application is running on port ${port}`);
            console.log('DB connection Successfully!');
        });
    })
    .catch((error) => {
        console.log(error);
    })