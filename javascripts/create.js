document.addEventListener('DOMContentLoaded', () => {
  console.log(' create script: 🎬')
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
    // console.log('value:', e.target.elements[2].value)
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

    console.log('submit photo:', newFilmObj.photo)
    // console.log('film Obj:', newFilmObj)
    // axios.post that data to the correct backend route
    axios.post('https://fischer-moviedb.herokuapp.com/movies', newFilmObj)
      .then((response) => {
        console.log('response', response)
        if (response) {
          alert('Film to Database Success!')
        }
        //call this once again
      })
      .catch((error) => {
        console.log(error)
      })
  })
}