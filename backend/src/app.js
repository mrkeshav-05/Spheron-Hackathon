import express from 'express';
import cors from 'cors';


import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
const app = express();

app.use(cors ({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static('public'));

app.use(cookieParser());



import customerRouter from './routes/customer.routes.js';
import artistRouter from './routes/artist.routes.js';



app.use('/api/auth/customer', customerRouter);
app.use('/api/auth/artist', artistRouter);


// http://localhost:8000/api/auth/register

export { app };