require('dotenv').config({ path: '../config.env' });
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());
const errorHandler = require('./middlewares/errorHandler');

// connect db
const connectDB = async() => {
   try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
   } catch (err) {
      console.error('Unable to connect')
   }
}
connectDB();

// use logger only in test mode
if(process.env.NODE_ENV === 'test') {
   app.use(logger('dev'));
}

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

// 404 errors
app.use((req, res, next) => {
   const error = new Error('Not found!')
   error.status = 404
   next(error)
})

// error handler
app.use(errorHandler);


// port listener
const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
})