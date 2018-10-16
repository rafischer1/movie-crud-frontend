// const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
  console.log('script: on')
})
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

// let movieImage = document.getElementById('pageMovieOne')

// Make a request for a user with a given ID
axios.get('https://fischer-moviedb.herokuapp.com/')
  .then(function(response) {
    // handle success
    console.log('Im here')
    console.log(response.body);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .then(function() {
    // always executed
  });