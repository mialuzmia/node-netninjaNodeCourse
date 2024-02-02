const express = require('express'); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();


const app = express(); //express app


const connectToDB = async () => {
  try {
    const result = await mongoose.connect(process.env.DATABASE_URL);
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


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});


app.get('/json', async (req, res) => {
  try {
    const result = await Blog.find({});
    res.json(result);
  } catch(err) {
    res.end(err.message)
  }
});

app.use('/blogs',blogRoutes);

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});

});


app.use((req, res) => { // (needs to be in the bottom) this is like a default in a switch case. the use fire for everry request, but the code is read from to top to bottom. it means that this function will only be fires if none of the code above matches the request. basically for every route not especified this will fire
  res.status(404).render('404', {title: '404'});
});

