document.addEventListener('DOMContentLoaded', () => {
  console.log('script: 🎬')
  getMovies()



  //end of DOMContentLoaded scope\\
})

function getMovies() {
  axios.get('https://fischer-moviedb.herokuapp.com/movies')
    .then(function(response) {
      // handle success
      console.log(response.data);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
}

function deleteMovie() {
  axios.delete(`/reports/${recordId}`)
    .then((response) => {
      console.log(response)
      ev.target.parentElement.parentElement.remove()
    })
    .catch((err) => {
      console.log(err)
    })
}

function formSubmit() {
  let form = document.getElementById('create-report')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    for (var i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if (inputName) {
        postData[inputName] = formElements[i].value
      }
    }

    console.log('postData', postData);

    // axios.post that data to the correct backend route
    axios.post('/movies', postData)
      .then((response) => {
        console.log(response)
        getMovies() //call this once again
      })
      .catch((error) => {
        console.log(error)
      })
  })
}