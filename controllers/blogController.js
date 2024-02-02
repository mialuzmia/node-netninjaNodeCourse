const Blog = require('../models/blogs');
const mongoose = require('mongoose');


const blog_index = async (req, res) => {
  try {
    const result = await Blog.find({}).sort({createdAt: -1});
    res.render('index', { title: 'All Blogs', blogs: result });
  } catch(err) {
    res.end(err.message)
  };
};

const blog_details = async (req, res) => {
  const id = req.params.id
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).render('404', {title: '404'});
  };
  try {
    const result = await Blog.findById(id);
    res.render('details',{blog: result, title: 'Blog Details'});
  } catch(err) {
    res.end(err.message);
  };
};

const blog_create_get = (req, res) => {
  res.render('create', {title: 'Create a new blog'});
};

const blog_create_post = async (req, res) => {
  
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

};

const blog_delete = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Blog.findByIdAndDelete(id);
    res.json({ redirect: '/blogs' });
 
  } 
  catch(err) {
    console.log(err);
    res.end(err.message);
  };

};


module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}