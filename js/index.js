

    // fetch('https://newsapi.org/v2/everything?q=sverige&from=2024-11-03&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok ' + response.statusText);
    //     }
    //     return response.json(); // Parse JSON data from the response
    //   })
    //   .then(data => console.log(data)) // Use the data
    //   .catch(error => console.error('There has been a problem with your fetch operation:', error));



//-----------------Header Creation------------------------------------------
let headerContainer = document.createElement("header")
headerContainer.setAttribute("class", "headerContainer")
document.body.appendChild(headerContainer)

let headingHeader = document.createElement("h1")
headingHeader.setAttribute("class", "headingHeader")
headingHeader.innerText = "Välkommen till aktuella nyheter"
headerContainer.appendChild(headingHeader)

let sportButton = document.createElement("button")
sportButton.setAttribute("class", "sportButton")
sportButton.innerText = "Sport"
headerContainer.appendChild(sportButton)

let domesticButton = document.createElement("button")
sportButton.setAttribute("class", "domesticButton")
domesticButton.innerText = "Domestic"
headerContainer.appendChild(domesticButton)

let foreignButton = document.createElement("button")
foreignButton.setAttribute("class", "foreignButton")
foreignButton.innerText = "Foreign"
headerContainer.appendChild(foreignButton)


let economyButton = document.createElement("button")
economyButton.setAttribute("class", "economyButton")
economyButton.innerText = "Economy"
headerContainer.appendChild(economyButton)
//--------------------------------------------------------------------------

//------------Main Creation ------------------------------------------------
let newsContainer = document.createElement("main")
newsContainer.setAttribute("class", "newsContainer")
document.body.appendChild(newsContainer)

let searchForm = document.createElement("form")
searchForm.setAttribute("class", "searchForm")
newsContainer.appendChild(searchForm)

let searchNewsInput = document.createElement("input")
searchNewsInput.setAttribute("class", "searchNewsInput")
searchNewsInput.setAttribute("placeholder", "Search articles")
searchForm.appendChild(searchNewsInput)

let searchNewsButton = document.createElement("button")
searchNewsButton.setAttribute("class", "searchNewsButton")
searchNewsButton.innerText = "Search"
searchForm.appendChild(searchNewsButton)
//--------------------------------------------------------------------------

//----------------------Search function-------------------------------------
// searchNewsInput.addEventListener("submit", function() {
//   if(searchNewsInput.value.trim() === "") {
//     console.log("Error, input is empty")
//   } else {
//     console.log("input is not empty, yay!")
//   }
// })

searchForm.addEventListener("submit", function () {
//? searchin endpoint maybe?  
//TODO incorporate submit eventlistener if possible
  if(searchNewsInput.value.trim() === "") {
    console.log("Error, input is empty")
  } else {
    console.log("input is not empty, yay!")
  }
})

//--------------------------------------------------------------------------


//------------------Category Selection--------------------------------------
window.addEventListener("DOMContentLoaded", function(){
  //? Top headlines endpoint maybe?
  fetch('https://newsapi.org/v2/everything?q=sverige&language=sv&from=2024-11-03&sortBy=publishedAt&apiKey=1006e9f332db40bd8553b27720785488')
  .then(response =>  {
    if(!response.ok) {
        throw new Error('HTTP-fel! status' + response.statusText);
    }
    console.log("response", response )
    return response.json()
  })
  .then(data => {
    console.log(data)
})

  .catch((err) => {
    console.log("error", err)
  })



  //TODO Default news that should be displayed as the page is loading in main
  //TODO should create several article elements that append to newsContainer
  //TODO one article element per news, h1 for titel, p for summary, p for timeStamp, p for Author or source
})

sportButton.addEventListener("click", function() {
  console.log("sportButton is responsive")
  //TODO empty the newsContainer and create articles basen on category
  //TODO should create several article elements that append to newsContainer
  //TODO one article element per news, h1 for titel, p for summary, p for timeStamp, p for Author or source
});

domesticButton.addEventListener("click", function() {
  console.log("sportButton is responsive")
    //TODO empty the newsContainer and create articles basen on category
  //TODO should create several article elements that append to newsContainer
  //TODO one article element per news, h1 for titel, p for summary, p for timeStamp, p for Author or source
});

foreignButton.addEventListener("click", function() {
  console.log("sportButton is responsive")
    //TODO empty the newsContainer and create articles basen on category
  //TODO should create several article elements that append to newsContainer
  //TODO one article element per news, h1 for titel, p for summary, p for timeStamp, p for Author or source
});

economyButton.addEventListener("click", function() {
  console.log("sportButton is responsive")
    //TODO empty the newsContainer and create articles basen on category
    //TODO empty the newsContainer and create articles basen on category
  //TODO should create several article elements that append to newsContainer
  //TODO one article element per news, h1 for titel, p for summary, p for timeStamp, p for Author or source
});
