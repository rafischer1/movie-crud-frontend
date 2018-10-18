document.addEventListener('DOMContentLoaded', () => {
  console.log('script: 🎬')
  getMovies()

  //
  // instance.open()
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
        let radio_button_input = document.createElement('a')


        spanCardTitle.innerText = `${movies.title} \n Year: ${movies.release_date}`
        imgSrc.src = movies.photo
        // console.log('image source:', imgSrc.src)

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
        divCardContent.appendChild(radio_button_input)
        radio_button_input.setAttribute('movie-id', movies.id)
        radio_button_input.setAttribute('name', 'Edit')
        radio_button_input.className = "editBtn"
        radio_button_input.innerText = "Edit"
        // console.log(radio_button_input)
        // console.log(movies.id)

        //edit this record!!
        document.addEventListener('DOMContentLoaded', () => {
          let editBtn = document.querySelectorAll('button.editBtn')
          console.log('edit function btn', editBtn)

          editBtn.addEventListener('click', (ev) => {
            console.log('I am a function!')
          })

        })





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
    })
}