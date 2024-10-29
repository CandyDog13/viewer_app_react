const config = {
    baseUrl: "https://api.github.com/search/repositories?q=javascript&amp;sort=stars&amp;order=asc&amp;",
}

export function getInformation(page) {
    return fetch(`${config.baseUrl}page=${page}`)
    .then((response)=> {
        if (!response.ok) {
            throw new Error('Error occurred!')
        }
          return response.json();
    })
    .catch((err)=> console.log(err));
  }