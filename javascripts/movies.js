let parent = document.getElementById('cards')
document.addEventListener('DOMContentLoaded', () => {
  console.log('script: 🎬')
  M.AutoInit();
  getMovies()
  //end of DOMContentLoaded scope\\
})

function getMovies() {
  axios.get('https://fischer-moviedb.herokuapp.com/movies')
    .then((res) => {
      // handle success
      res.data.forEach((movies) => {
        ////////////set data into cards\\\\\\\\\\\\
        ///////////////generate cards\\\\\\\\\\\\\\
        let divRow = document.createElement('div')
        let divCol = document.createElement('div')
        divCol.className = "col s12 m7"
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
        let editBtn = document.createElement('a')

        spanCardTitle.innerText = `${movies.title} \n Year: ${movies.release_date}`
        imgSrc.src = movies.photo
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
        del_button.className = "delBtn"
        divCardContent.appendChild(editBtn)
        editBtn.setAttribute('movieId', movies.id)
        editBtn.setAttribute('data-target', 'modal1')
        editBtn.setAttribute('name', 'Edit')
        editBtn.className = "editBtn modal-trigger"
        editBtn.innerText = "Edit"

        /////edit this record!!\\\\\
        editBtn.addEventListener('click', (ev) => {
          if (ev) {
            modalFunction(ev)
          } else {
            alert(`That didn't work for some reason`)
          }
        })
        //////////// DELETE THIS RECORD! \\\\\\\\\\\\\\\\
        // let del_button = document.querySelectorAll('button.delBtn')
        del_button.addEventListener('click', (ev) => {
          ev.preventDefault()
          if (confirm('Are you sure you want to delete this film?')) {
            axios.delete(`https://fischer-moviedb.herokuapp.com/movies/${movies.id}`)
              .then((res) => {
                console.log(`deleted`)
                ev.target.parentElement.parentElement.remove()
                // getMovies()
                alert(`Deleted! “Those who read own the world, and those who watch television lose it. ” ― WH`)
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            alert('“Do you not then hear this horrible scream all around you that people usually call silence.” - WH')
          }
        })
      })
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    })
}

function modalFunction(ev) {
  let id = ev.target.getAttribute('movieid')
  let openModal = document.querySelectorAll('.modal')
  let instance = M.Modal.init(openModal)

  //axios get call by id to populate modal\\
  axios.get(`https://fischer-moviedb.herokuapp.com/movies/${id}`)
    .then((movie) => {
      console.log('movie', movie)
      let formTitle = document.getElementById('formTitle')
      let modalTitle = document.getElementById('modalTitle')
      let modalYear = document.getElementById('modalYear')
      let modalPhoto = document.getElementById('modalPhoto')
      formTitle.innerText = movie.data[0].title
      modalTitle.value = movie.data[0].title
      modalPhoto.value = movie.data[0].photo
      modalYear.value = movie.data[0].release_date
      let modalMovieID = movie.data[0].id

      let modalSubmit = document.getElementById('modalSubmit')
      modalSubmit.addEventListener('submit', (ev) => {
        ev.preventDefault()

        /////grab all values from the form\\\
        let putData = {}
        let formElements = ev.target.elements
        if (formElements[0].value) {
          putData.title = formElements[0].value
        }
        if (formElements[1].value) {
          putData.release_date = formElements[1].value
        }
        if (formElements[2].value) {
          putData.photo =
            formElements[2].value
        }
        putData.id = modalMovieID

        ////axios put call to update entry\\\\
        axios.put(`https://fischer-moviedb.herokuapp.com/movies/${modalMovieID}`, putData)
          .then((response) => {
            if (response) {
              alert(`Update complete! “Nothing I have witnessed, from lava to crustacean, assailed me liked the caked debris haunting that small plastic soap hammock in the smaller of the bathrooms. Nausea is not a sufficient word.”―WH`)
              ////window reload - not a great solution but works!\\\\
              location.reload()
            } else {
              alert(`That didn't work for some reason...`)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    })
}