import express from 'express';
require('dotenv').config();

const handleErrors = require('./middleware/handleErrors');
const { BadRequest } = require('./utils/errors');

const taskController = require('./controllers/task');
const authController = require('./controllers/auth');

const bodyParser = require('body-parser');
const cors = require('cors');
const env = process.env.NODE_ENV || 'development';

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/tasks', taskController);
app.use('/api/auth', authController);

app.get('*', (req, res) => {
  res.status(404).send('כתובת שהוכנסה שגויה');
});

app.use(handleErrors);

// const port = process.env.PORT || '3001';
const port = 80;


app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
