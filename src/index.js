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

function renderToys(json){
  json.forEach(toy => {
    renderToy(toy)
  })
}

function renderToy(toy){
  const div = document.createElement("div")
  div.setAttribute("class", "card")
                                                // here, we give the button an ID so we can refer to which one to edit later
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

  main()
});
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
