const express = require('express');

const app = express(); //express app

app.set('view engine', 'ejs');

app.listen(3000); //listen for requests, localhost is default

app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host:', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  console.log('\n');
  next();
}); 

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});

});

app.get('/about-me', (req, res) => { //redirect
  res.redirect('about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a new blog'});
});

app.use((req, res) => { // (needs to be in the bottom) this is like a default in a switch case. the use fire for everry request, but the code is read from to top to bottom. it means that this function will only be fires if none of the code above matches the request. basically for every route not especified this will fire
  res.render('404', {title: '404'});
});

