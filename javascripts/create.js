document.addEventListener('DOMContentLoaded', () => {
  formSubmit()
  let submitBadge = document.getElementById('submitBadge')
  submitBadge.style.display = "none"
  //end of DOMContentLoaded scope\\
})

function formSubmit() {
  let formBtn = document.getElementById('filmForm')
  if (!formBtn) {
    throw new Error('no form present')
  }
  formBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    // grab all values from the form
    let postData = {}
    let formElements = e.target.elements
    let editTitle = e.target.elements[0].value
    let editYear = e.target.elements[1].value
    let editPhoto = e.target.elements[2].value

    let newFilmObj = {
      title: editTitle,
      release_date: editYear,
      photo: editPhoto
    }
    // axios.post that data to the correct backend route
    axios.post('https://fischer-moviedb.herokuapp.com/movies', newFilmObj)
      .then((response) => {
        console.log('response', response)
        if (response) {
          alert(`Success! “I'm quite convinced that cooking is the only alternative to film making. Maybe there's also another alternative, that's walking on foot.” ― WH`)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  })
}