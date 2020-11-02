let addToy = false;
const toysURL = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
const form = document.querySelector(".add-toy-form")
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function grabToys() {
  fetch(toysURL)
  .then(resp => resp.json())
  .then(json => renderToys(json))
}

<<<<<<< HEAD
function renderToys(json){
  json.forEach(toy => {
    renderToy(toy)
  })
}

function renderToy(toy){
  const div = document.createElement("div")
  div.setAttribute("class", "card")

  div.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn" id=${toy.id}>Like <3</button>
  </div>`

  toyCollection.appendChild(div)
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function createToy(){
  form.addEventListener("submit", function(event){
    event.preventDefault()                              // good for testing
    const name = event.target[0].value      // make sure to call this "key" the same thing as in API
    const image = event.target[1].value

    const configToy = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
        name,                            // !!!! notice the name, and image, and likes are the same
        image,
        likes: 0
      })
    }

    postToy(configToy)
  })

}

function postToy(configToy){
  fetch(toysURL, configToy)
  .then(resp => resp.json())
  .then(toy => renderToy(toy))          // so renderToy can correctly do it on any new toy!
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function likeFunctionality(){
  toyCollection.addEventListener("click", function(event){
    if (event.target.className === "like-btn") {
      editToyLikes(event)
    }
  })

}


function editToyLikes(event){
  let myLikes = parseInt(event.target.previousElementSibling.innerText) +1    // so we can easily refer to it below

  const configToy = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": myLikes
    })
  }

  fetch(`http://localhost:3000/toys/${event.target.id}`, configToy)
  .then(resp => resp.json())
  .then(toy => event.target.previousElementSibling.innerText = myLikes)   // only render the likes once it comes back
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function main(){
  grabToys()
  createToy()
  likeFunctionality()
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
=======
const toyCollection = document.getElementById("toy-collection");
const toysUrl = 'http://localhost:3000/toys'
const toyForm = document.querySelector(".add-toy-form")
const submitToy = document.querySelector("submit")
const likes = document.querySelectorAll(".like-btn")

////////////////////
function grabToys(){
  fetch(toysUrl)
  .then(resp => resp.json())
  .then(json => parseToys(json))
}

////////////////////////////////
function parseToys(jsonObject){
  jsonObject.forEach(toy => {
    let toyDiv = document.createElement('div');
    toyDiv.className = 'card'
    toyDiv.innerHTML += `<h2>${toy.name}</h2> 
                        <img src=${toy.image} height= 200px>
                        <p>${toy.likes} likes</p>
                        <button class="like-btn" data-id= ${toy.id}>Like</button>`
    toyCollection.append(toyDiv);
  })
}

////////////////////////////////
//////////////////////////////// Add the form to create a toy
////////////////////////////////

function addEventToForm(){
  
  toyForm.addEventListener("submit", function(event){
    
      createToys(event)
  })
}

// creates toy Object, updates backend, calls parseToys on the "Toys.all" response it gets
function createToys(event){

  let toyFormData = {
    "name": event.target[0].value,
    "image": event.target[1].value,
    "likes": 0
  }

  const newToy = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(toyFormData)

  };

  fetch(toysUrl, newToy)
  .then(resp => resp.json())
  .then(json => parseToys(json))
}

////////////////////////////////
////////////////////////////////
////////////////////////////////

function addEventToLikes() {
  toyCollection.addEventListener('click', function(event){
    if (event.target.className === 'like-btn') {
        increaseLikes(event)
}
})
}

//////////////////////////////
function increaseLikes(event){
  const toyId = event.target.dataset.id
  const toyUpdate = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(event.target.previousElementSibling.innerText.split(" ")[0])+1
              
  }) 
  }

  fetch(`http://localhost:3000/toys/${toyId}`, toyUpdate)
  .then(resp => resp.json())
  .then(json => updateLikes(json)
  )
}


//////////////////////////
function updateLikes(obj){
  const likeButtons = document.querySelectorAll('[data-id]')
  likeButtons.forEach(likeButton => {
     if(likeButton["data-id"] === obj.id){
       likeButton.previousElementSibling.innerText = `${obj.likes} likes`
     }
  })
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

>>>>>>> 9f0be03c84bb436f53264dde40ffd4d7fb4873a2
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

<<<<<<< HEAD
  main()
});
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
=======

  grabToys();
  addEventToForm();
  addEventToLikes();


  // const th = document.querySelector("#toy-header")
  // th.addEventListener("click", function(event) {
  //   th.nextElementSibling.nextElementSibling.innerText = "this is how u do it"
  // })
});
>>>>>>> 9f0be03c84bb436f53264dde40ffd4d7fb4873a2
