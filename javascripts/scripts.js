document.addEventListener('DOMContentLoaded', () => {
  console.log('script: 🎬')
  getMovies()

  //select form stuff


  //end of DOMContentLoaded scope\\
})

function getMovies() {
  axios.get('https://fischer-moviedb.herokuapp.com/movies')
    .then(function(res) {
      // handle success
      // IDEA: set the card image max width to asdjust the pic sizes...instead of sizing evry one/size the conta8ier

      res.data.forEach((movies) => {
        // console.log(movies.photo);

        let divRow = document.createElement('div')
        divRow.className = "row"
        let divCol = document.createElement('div')
        divCol.className = "col s12 m7"
        // divCol.className = "s12"
        // divCol.className = "m7"
        let divCard = document.createElement('div')
        divCard.className = "card"
        let spanCardTitle = document.createElement('span')
        spanCardTitle.className = 'card-title'
        let divCardImage = document.createElement('div')
        divCardImage.className = 'card-image'
        let imgSrc = document.createElement('img')
        let divCardContent = document.createElement('div')
        divCardContent.className = 'card-content'

        spanCardTitle.innerText = `${movies.title} \n Year: ${movies.release_date}`
        imgSrc.src = movies.photo

        let parent = document.getElementById('cards')
        parent.appendChild(divRow)
        divRow.appendChild(divCol)
        divCol.appendChild(divCard)
        divCard.appendChild(spanCardTitle)
        divCard.appendChild(divCardImage)
        divCardImage.appendChild(imgSrc)
        divCard.appendChild(divCardContent)

        let selectForm = document.querySelectorAll('select')
        let instances = M.FormSelect.init(selectForm, movies.title)

      })
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

function selectAutofill() {
  document.addEventListener('DOMContentLoaded', function() {
    getMovies()
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });
}