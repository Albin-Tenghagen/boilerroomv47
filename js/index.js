function removeAllChildren(articleSection) {
   while( articleSection.firstChild) {
    articleSection.removeChild(articleSection.firstChild)
   }
}

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

let articleSection = document.createElement("section")
articleSection.setAttribute("class", "articleSection")
newsContainer.appendChild(articleSection)

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
let searchTerm =  document.getElementsByClassName("searchNewsInput").value.trim();  
if(searchTerm.value.trim() === "") {
    console.log("Error, input is empty")
  } else {
    console.log("input is not empty, yay!")
    searchForArticles(searchTerm)
  }

})

function searchForArticles(query) {
  const yourApiKey = '1006e9f332db40bd8553b27720785488'
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=sv&from=2024-11-03&sortBy=publishedAt&apiKey=${yourApiKey}`

  fetch(url)
    .then(response =>  {
    if(!response.ok) {
        throw new Error('HTTP-fel! status' + response.statusText);
    }
    console.log("response", response )
    return response.json()
  })
  .then(data => {
    console.log(data)
    let articleArray = data.articles

    if(articleArray.length === 0) {
      articleSection.innerHTML = '<p>Inga artiklar funna<p>' 
    }

    console.log("articleArray", articleArray )
    articleArray.forEach(article => {
      let articleContainer = document.createElement("article")
      articleContainer.setAttribute("class", "articleContainer")
      articleSection.appendChild(articleContainer)

      let articleTitle = document.createElement("h3")
      articleTitle.textContent =  article.title
      articleTitle.setAttribute("class", "articleTitle")
      articleContainer.appendChild(articleTitle) 

      let articleSummary = document.createElement("p")
      articleSummary.setAttribute("class", "articleSummary")
      articleSummary.textContent = article.description;
      articleContainer.appendChild(articleSummary)

      let timeStamp = document.createElement("p")
      timeStamp.setAttribute("class", "timeStamp")
      // Formatera tidsstämpeln
      let publishedAt = article.publishedAt // Exempel: "2024-11-22T15:30:00Z"
      let dateAndTime = publishedAt.replace("Z", "").split("T") // Delar på "T" för att separera datum och tid
      let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}` // Lägger till mellanrum mellan datum och tid
      timeStamp.textContent = formattedTimeStamp
      articleContainer.appendChild(timeStamp)
      
      let articleAuthor = document.createElement("p")
      articleAuthor.setAttribute("class", "articleAuthor")
      articleAuthor.textContent = article.author;
      articleContainer.appendChild(articleAuthor)
    
      let articleImage = document.createElement("img")
      articleImage.setAttribute("class", "articleImage")
      articleImage.src = article.urlToImage    
      articleContainer.append(articleImage)

      let readMoreButton = document.createElement("button")
      readMoreButton.textContent = "Läs mer"
      readMoreButton.setAttribute("class", "readMoreButton")
      articleContainer.appendChild(readMoreButton)
    });
})

  .catch((err) => {
    console.log("error", err)
  })
}

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
    let articleArray = data.articles

    console.log("articleArray", articleArray )
    articleArray.forEach(article => {
      let articleContainer = document.createElement("article")
      articleContainer.setAttribute("class", "articleContainer")
      articleSection.appendChild(articleContainer)

      let articleTitle = document.createElement("h3")
      articleTitle.textContent =  article.title
      articleTitle.setAttribute("class", "articleTitle")
      articleContainer.appendChild(articleTitle) 

      let articleSummary = document.createElement("p")
      articleSummary.setAttribute("class", "articleSummary")
      articleSummary.textContent = article.description;
      articleContainer.appendChild(articleSummary)

      let timeStamp = document.createElement("p")
      timeStamp.setAttribute("class", "timeStamp")
      // Formatera tidsstämpeln
      let publishedAt = article.publishedAt // Exempel: "2024-11-22T15:30:00Z"
      let dateAndTime = publishedAt.replace("Z", "").split("T") // Delar på "T" för att separera datum och tid
      let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}` // Lägger till mellanrum mellan datum och tid
      timeStamp.textContent = formattedTimeStamp
      articleContainer.appendChild(timeStamp)
      
      let articleAuthor = document.createElement("p")
      articleAuthor.setAttribute("class", "articleAuthor")
      articleAuthor.textContent = article.author;
      articleContainer.appendChild(articleAuthor)
    
      let articleImage = document.createElement("img")
      articleImage.setAttribute("class", "articleImage")
      articleImage.src = article.urlToImage    
      articleContainer.append(articleImage)

      let readMoreButton = document.createElement("button")
      readMoreButton.textContent = "Läs mer"
      readMoreButton.setAttribute("class", "readMoreButton")
      articleContainer.appendChild(readMoreButton)
    });
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
  let articleArray = [] 
  removeAllChildren(articleSection)
  console.log("articleArray", articleArray)  
  console.log("economyButton is responsive")
  fetch('https://newsapi.org/v2/top-headlines/sources?language=sv&category=business&apiKey=1006e9f332db40bd8553b27720785488')
  .then(response =>  {
    if(!response.ok) {
        throw new Error('HTTP-fel! status' + response.statusText);
    }
    console.log("response", response )
    return response.json()
  })
  .then(data => {
    console.log(data)
    let articleArray = data.articles

    console.log("articleArray", articleArray )
    articleArray.forEach(article => {
      let articleContainer = document.createElement("article")
      articleContainer.setAttribute("class", "articleContainer")
      articleSection.appendChild(articleContainer)

      let articleTitle = document.createElement("h3")
      articleTitle.textContent =  article.title
      articleTitle.setAttribute("class", "articleTitle")
      articleContainer.appendChild(articleTitle) 

      let articleSummary = document.createElement("p")
      articleSummary.setAttribute("class", "articleSummary")
      articleSummary.textContent = article.description;
      articleContainer.appendChild(articleSummary)

      let timeStamp = document.createElement("p")
      timeStamp.setAttribute("class", "timeStamp")
      // Formatera tidsstämpeln
      let publishedAt = article.publishedAt // Exempel: "2024-11-22T15:30:00Z"
      let dateAndTime = publishedAt.replace("Z", "").split("T") // Delar på "T" för att separera datum och tid
      let formattedTimeStamp = `${dateAndTime[0]} ${dateAndTime[1]}` // Lägger till mellanrum mellan datum och tid
      timeStamp.textContent = formattedTimeStamp
      articleContainer.appendChild(timeStamp)
      
      let articleAuthor = document.createElement("p")
      articleAuthor.setAttribute("class", "articleAuthor")
      articleAuthor.textContent = article.author;
      articleContainer.appendChild(articleAuthor)
    
      let articleImage = document.createElement("img")
      articleImage.setAttribute("class", "articleImage")
      articleImage.src = article.urlToImage    
      articleContainer.append(articleImage)

      let readMoreButton = document.createElement("button")
      readMoreButton.textContent = "Läs mer"
      readMoreButton.setAttribute("class", "readMoreButton")
      articleContainer.appendChild(readMoreButton)
    });
})

  .catch((err) => {
    console.log("error", err)
  })
    //TODO empty the newsContainer and create articles basen on category
    //TODO empty the newsContainer and create articles basen on category
  //TODO should create several article elements that append to newsContainer
  //TODO one article element per news, h1 for titel, p for summary, p for timeStamp, p for Author or source
});
