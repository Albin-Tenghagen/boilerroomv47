function removeAllChildren(articleSection) {
   while( articleSection.firstChild) {
    articleSection.removeChild(articleSection.firstChild)
   }
}
let articleArray = []

//-----------------Header Creation------------------------------------------
let headerContainer = document.createElement("header")
headerContainer.setAttribute("class", "headerContainer")
document.body.appendChild(headerContainer)

let headingHeader = document.createElement("h1")
headingHeader.setAttribute("class", "headingHeader")
headingHeader.innerText = "Welcome to the latest news"
headerContainer.appendChild(headingHeader)

let techButton = document.createElement("button")
techButton.setAttribute("class", "techButton")
techButton.innerText = "Tech"
headerContainer.appendChild(techButton)

let appleButton = document.createElement("button")
appleButton.setAttribute("class", "appleButton")
appleButton.innerText = "apple"
headerContainer.appendChild(appleButton)

let teslaButton = document.createElement("button")
teslaButton.setAttribute("class", "teslaButton")
teslaButton.innerText = "tesla"
headerContainer.appendChild(teslaButton)

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

searchForm.addEventListener("submit", function (event) {
  //? searchin endpoint maybe?  
  event.preventDefault()
  let searchTerm =  searchNewsInput.value;  
  if(searchTerm.trim() === "") {
      console.log("Error, input is empty")
    } else {
      console.log("input is not empty, yay!")
      searchForArticles(searchTerm)
    }
  
  })
  
  function searchForArticles(query) {
  
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=0db69991ed83415fa6f591a1924e45ef`
    removeAllChildren(articleSection)
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
      articleArray = data.articles
  
      if(articleArray.length === 0) {
        articleSection.innerHTML = '<p>No articles were found<p>' 
      } else {
  
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
  
        let readMoreButton = document.createElement("a")
          readMoreButton.textContent = "Read more"
          readMoreButton.setAttribute("class", "readMoreButton")
          readMoreButton.href = article.url
          articleContainer.appendChild(readMoreButton)
      });
    }
  })
  
    .catch((err) => {
      console.log("error", err)
    })
  }
//--------------------------------------------------------------------------

//------------------------Default News--------------------------------------
window.addEventListener("DOMContentLoaded", function(){
  //? Top headlines endpoint maybe?
  fetch('https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=0db69991ed83415fa6f591a1924e45ef')
  .then(response =>  {
    if(!response.ok) {
        throw new Error('HTTP-fel! status' + response.statusText);
    }
    console.log("response", response )
    return response.json()
  })
  .then(data => {
    console.log(data)
    articleArray = data.articles

    if(articleArray.length === 0) {
      articleSection.innerHTML = '<p>No articles were found<p>' 
    } else {

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

      let readMoreButton = document.createElement("a")
          readMoreButton.textContent = "Read more"
          readMoreButton.setAttribute("class", "readMoreButton")
          readMoreButton.href = article.url
          articleContainer.appendChild(readMoreButton)
    });
  }
})

  .catch((err) => {
    console.log("error", err)
  })
});

//--------------------------------------------------------------------------


//------------------Category Selection--------------------------------------

techButton.addEventListener("click", function () {
  console.log("SportButton is responsive");

  // empties newsContainer
  articleSection.replaceChildren();

  // API-endpoint for sportnews
  let apiUrl = `https://newsapi.org/v2/everything?q=tech&language=en&from=2024-11-05&sortBy=publishedAt&apiKey=0db69991ed83415fa6f591a1924e45ef`;

  // Fetches data from apiUrl
  fetch(apiUrl)
  .then(response =>  {
    if(!response.ok) {
        throw new Error('HTTP-fel! status' + response.statusText);
    }
    console.log("response", response )
    return response.json()
  })
  .then(data => {
    console.log(data)
    articleArray = data.articles

    if(articleArray.length === 0) {
      articleSection.innerHTML = '<p>No articles were found<p>'
    } else {

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
      articleImage.setAttribute("alt", "Picture loaded incorrectly because of cookies")
      articleImage.src = article.urlToImage    
      articleContainer.append(articleImage)

      let readMoreButton = document.createElement("a")
        readMoreButton.textContent = "Read more"
        readMoreButton.setAttribute("class", "readMoreButton")
        readMoreButton.href = article.url
        articleContainer.appendChild(readMoreButton)
    });
  }
})

  .catch((err) => {
    console.log("error", err)
  })

});

appleButton.addEventListener("click", function() {
  console.log("sportButton is responsive")
  articleSection.replaceChildren();
    fetch('https://newsapi.org/v2/everything?q=apple&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=0db69991ed83415fa6f591a1924e45ef')
    .then(response =>  {
      if(!response.ok) {
          throw new Error('HTTP-fel! status' + response.statusText);
      }
      console.log("response", response )
      return response.json()
    })
    .then(data => {
      console.log(data)
      articleArray = data.articles

      if(articleArray.length === 0) {
        articleSection.innerHTML = '<p>No articles were found<p>'
      } else {
  
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
  
        let readMoreButton = document.createElement("a")
          readMoreButton.textContent = "Read more"
          readMoreButton.setAttribute("class", "readMoreButton")
          readMoreButton.href = article.url
          articleContainer.appendChild(readMoreButton)
      });
    }
  })
  
    .catch((err) => {
      console.log("error", err)
    })
  
});

teslaButton.addEventListener("click", function() {
  console.log("tesla is responsive")
  articleSection.replaceChildren();
    fetch('https://newsapi.org/v2/everything?q=tesla&language=en&from=2024-11-5&sortBy=publishedAt&apiKey=0db69991ed83415fa6f591a1924e45ef')
    .then(response =>  {
      if(!response.ok) {
          throw new Error('HTTP-fel! status' + response.statusText);
      }
      console.log("response", response )
      return response.json()
    })
    .then(data => {
      console.log(data)
      articleArray = data.articles

      if(articleArray.length === 0) {
        articleSection.innerHTML = '<p>No articles were found<p>'
      } else {
  
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
  
        let readMoreButton = document.createElement("a")
          readMoreButton.textContent = "Read more"
          readMoreButton.setAttribute("class", "readMoreButton")
          readMoreButton.href = article.url
          articleContainer.appendChild(readMoreButton)
      });
    }
  })
  
    .catch((err) => {
      console.log("error", err)
    })  
  
  });
  
economyButton.addEventListener("click", function() {
  
  removeAllChildren(articleSection)
  console.log("articleArray", articleArray)  
  console.log("economyButton is responsive")
  fetch('https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=0db69991ed83415fa6f591a1924e45ef')
  .then(response =>  {
    if(!response.ok) {
        throw new Error('HTTP-fel! status' + response.statusText);
    }
    console.log("response", response )
    return response.json()
  })
  .then(data => {
    console.log(data)
    articleArray = data.articles

    if(articleArray.length === 0) {
      articleSection.innerHTML = '<p>No articles were found<p>' 
    } else {


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

      let readMoreButton = document.createElement("a")
          readMoreButton.textContent = "Read more"
          readMoreButton.setAttribute("class", "readMoreButton")
          readMoreButton.href = article.url
          articleContainer.appendChild(readMoreButton)
    });

  }
  })

  .catch((err) => {
    console.log("error", err)
  })
  
});
//--------------------------------------------------------------------------

