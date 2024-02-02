const express = require('express'); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const app = express(); //express app

const dbURI = 'mongodb+srv://mialuz:7J9lWpJiR2W6HnOB@cluster0.txmrd5g.mongodb.net/node-ninja?retryWrites=true&w=majority'

// mongoose.connect(dbURI)
//   .then(result => {
//     app.listen(3000); 
//     console.log('connected to database')})
//   .catch(err => console.log(err));

const connectToDB = async () => {
  try {
    const result = await mongoose.connect(dbURI);
    console.log('connected to db');
    app.listen(3000); 
    // console.log(result);
  } catch (err) {
    console.log(err);
  };
};
connectToDB();

// set view engine
app.set('view engine', 'ejs');

// middlewares
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

// // mongo sandbox routes
// app.get('/add-blog', async (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   });

//   try {
//     const result = await blog.save();
//     res.json(result);
//   } catch(err) {
//     console.log(err);
//     res.end(err.message);
//   }
// });

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', async (req, res) => {
  try {
    const result = await Blog.find({}).sort({createdAt: -1});
    res.render('index', { title: 'All Blogs', blogs: result });
  } catch(err) {
    res.end(err.message)
  }
});

app.get('/json', async (req, res) => {
  try {
    const result = await Blog.find({});
    res.json(result);
  } catch(err) {
    res.end(err.message)
  }
});


app.post('/blogs', async (req, res) => {
  
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

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a new blog'});
});


app.delete('/blogs/:id', async (req, res) => {
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


app.get('/blogs/:id', async (req, res) => {
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



app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});

});

app.get('/about-me', (req, res) => { //redirect
  res.redirect('about');
});



app.use((req, res) => { // (needs to be in the bottom) this is like a default in a switch case. the use fire for everry request, but the code is read from to top to bottom. it means that this function will only be fires if none of the code above matches the request. basically for every route not especified this will fire
  res.status(404).render('404', {title: '404'});
});

