/**
 * Date: 31/03/2023
 * Subject: Portfolio All package require
 * Auth: Ismile Sardar
 */

//core module require
const path = require('path');
const {readdirSync} = require('fs');
//third-parity module require
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

//All Third-parity modules use middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//route limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);
//route middleware
readdirSync('./routes').map(file => app.use('/api/v1', require(`./routes/${file}`)));
//undefine router
app.use('*',(req,res) => {
    res.status(404).send('This is Rona Router');
});
//Database connected
mongoose.connect(process.env.DATA_BASE)
        .then((value) =>{
            console.log('Database Connected');
        })
        .catch((err) => {
            console.log(err);
        });

//module exported
module.exports = app;  