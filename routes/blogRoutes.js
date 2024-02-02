const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Blog = require('../models/blogs');

router.get('/', async (req, res) => {
  try {
    const result = await Blog.find({}).sort({createdAt: -1});
    res.render('index', { title: 'All Blogs', blogs: result });
  } catch(err) {
    res.end(err.message)
  }
});

router.post('/', async (req, res) => {
  
  try {
    const blog = new Blog(req.body);
    const result = await blog.save();
    console.log('\n',result, '\n');

    res.redirect('/blogs');
  } 
  catch(err) {
    console.log(err);
    res.end(err.message);
  };

});

router.get('/create', (req, res) => {
  res.render('create', {title: 'Create a new blog'});
});


router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Blog.findByIdAndDelete(id);
    res.json({ redirect: '/blogs' });
 
  } 
  catch(err) {
    console.log(err);
    res.end(err.message);
  };

});


router.get('/:id', async (req, res) => {
  const id = req.params.id
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID');
  };
  try {
    const result = await Blog.findById(id);
    res.render('details',{blog: result, title: 'Blog Details'});
  } catch(err) {
    res.end(err.message);
  }
});

module.exports = router;