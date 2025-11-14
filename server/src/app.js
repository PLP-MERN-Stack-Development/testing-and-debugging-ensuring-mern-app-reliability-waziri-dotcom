const express = require('express');
const cors = require('cors');
const bugsRouter = require('./routes/bugs');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
