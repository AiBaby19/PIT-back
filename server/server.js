const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/tasks', apiRouter);

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
