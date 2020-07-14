import express from 'express';
require('dotenv').config();

const handleErrors = require('./middleware/handleErrors');
const { BadRequest } = require('./utils/errors');

const taskController = require('./controllers/task');
const authController = require('./controllers/auth');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/tasks', taskController);
app.use('/api/auth', authController);

app.use(handleErrors);

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
