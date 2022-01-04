const apiCalls = {
  getHomeArticles() {
    return fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=Fd98X4pesGXhNylIUSA0GWCHorvloM4J')
      .then(response => response.json())
      .catch(error => console.log(error.message))
  }
}

export default apiCalls
