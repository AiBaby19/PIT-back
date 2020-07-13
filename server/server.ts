import express from 'express';

const taskController = require('./controllers/task');
const userController = require('./controllers/user');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/tasks', taskController);
app.use('/api/user', userController);

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
