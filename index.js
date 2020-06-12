document.addEventListener("DOMContentLoaded", function(){
  loadPosts()
  loadFormListener()
  clickEvent()
  mouseOverEvent()
  buttonEvent()
})


// add our posts to the page
function addPostsToPage(posts){
  posts.forEach(function(post){
    // need to create the post in here
    attachPost(postHTML(post))
  })
}

// load our posts
function loadPosts(){
  fetch("http://localhost:3000/blogs")
  .then(resp => resp.json())
  .then(data => {
    addPostsToPage(data)
  })
}

// grab text from each field
function getInfo(event){
  return{
    title: event.target.querySelector("#title").value,
    author: event.target.querySelector("#author").value,
    content: event.target.querySelector("#content").value
  }
}


// create our html elements to display the post
function postHTML(post){
  return `
  <div class="card">
    <div class="card-content">
      <span class="card-title">${post.title}</span>
      <p>${post.author}</p>
      <p>${post.content}</p>
      <button class="colorButton">Change Background</button>
    </div>
  </div>
  
  `
}


// append the html elements onto the existing list
const attachPost = function(post){
  document.querySelector(".post-lists").innerHTML += post
}


// clear form
const clearForm = () => {
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("content").value = ""
}


function loadFormListener(){
  // identify the element we want to target
  const postForm = document.getElementById("blog-form")

  // add the event listener to the target (form)
  postForm.addEventListener("submit", function(event){
    event.preventDefault()

    // add functionality
    // grab text from each field
    const postResults = getInfo(event)
    fetch("http://localhost:3000/blogs", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postResults)
    })
    .then(resp => resp.json())
    .then(data => {
      // create our html elements to display the post
      const htmlPost = postHTML(data)

      // append the html elements onto the existing list
      attachPost(htmlPost)


      // bonus: clear the form!
      clearForm()
    })

    

  })
}


const colors = ["red", "orange", "yellow", "green", "blue", "indigo","purple"]
let index = 0
const maxIndex = colors.length

const changeColor = (title) => {   
  title.style.color = colors[index++]
  if(index == maxIndex){
      index = 0;
  }
}

// click event
function clickEvent(){
  const title = document.querySelector(".post-lists h3")
  title.addEventListener("click", function(){
      changeColor(title)
  })
}


// mouse over event
function mouseOverEvent(){
  const header = document.querySelector("h1")
  header.addEventListener("mouseover",()=>changeColor(header))
}


// button event
function buttonEvent(){
  const allPosts = document.querySelector(".post-lists")
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo","purple"]
  let index = 0
  const maxIndex = colors.length
  allPosts.addEventListener("click", function(e){
      if (e.target.className === "colorButton"){
          e.target.parentElement.parentElement.style.backgroundColor = colors[index++]
          if(index == maxIndex){
              index = 0;
          }
      }
  })
}