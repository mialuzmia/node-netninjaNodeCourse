const express = require('express');

const app = express(); //express app

app.set('view engine', 'ejs');

app.listen(3000); //listen for requests, localhost is default

app.get('/', (re, res) => {
  // res.send('<h1>home page</h1>');
  // res.sendFile('./views/index.html' , {root: __dirname});
  res.render('index');
});

app.get('/about', (re, res) => {
  // res.send('<h1>about page</h1>');
  // res.sendFile('./views/about.html' , {root: __dirname});
  res.render('about');

});

app.get('/about-me', (re, res) => { //redirect
  res.redirect('about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create');
});

app.use((req, res) => { // (needs to be in the bottom) this is like a default in a switch case. the use fire for everry request, but the code is read from to top to bottom. it means that this function will only be fires if none of the code above matches the request. basically for every route not especified this will fire
  // res.status(404).sendFile('./views/404.html' , {root: __dirname});
  res.render('404');
});

