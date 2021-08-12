require('dotenv').config();
const express = require('express');
const user = require('./models/user');
const post = require('./models/post');
const comment = require('./models/comment');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const path = require('path');
const helmet = require('helmet');


const app = express();

app.use(helmet());

// definit les headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// permet d'extraire les données json
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;