document.addEventListener('DOMContentLoaded', () => {
  console.log('script: 🎬')
  getMovies()
  formSubmit()


  //select form stuff



  //end of DOMContentLoaded scope\\
})

function getMovies() {
  axios.get('https://fischer-moviedb.herokuapp.com/movies')
    .then((res) => {
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
        let del_button = document.createElement('button')

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
        divCardContent.appendChild(del_button)
        del_button.innerText = "X"
        del_button.setAttribute('data-id', movies.id)
        // console.log(movies.id)


        // DELETE THIS RECORD!
        del_button.addEventListener('click', (ev) => {
          axios.delete(`https://fischer-moviedb.herokuapp.com/movies/${movies.id}`)
            .then((res) => {
              console.log(`deleted`)
              ev.target.parentElement.parentElement.remove()
              // getMovies()
            })
            .catch((err) => {
              console.log(err)
            })
        })
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

function formSubmit() {
  let formBtn = document.getElementById('filmForm')
  formBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('value:', e.target.elements[2].value)

    // grab all values from the form
    let postData = {}
    let formElements = e.target.elements
    let editTitle = e.target.elements[0].value
    let editYear = e.target.elements[1].value
    let editPhoto = e.target.elements[2].value
    console.log('submit photo:', e.target.elements[2].value)

    let newFilmObj = {
      title: editTitle,
      release_date: editYear,
      photo: editPhoto
    }

    // console.log('film Obj:', newFilmObj)

    // axios.post that data to the correct backend route
    axios.post('https://fischer-moviedb.herokuapp.com/movies', newFilmObj)
      .then((response) => {
        console.log('response', response)
        //call this once again
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