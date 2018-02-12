export const config = {
    baseUrl: "https://www.googleapis.com/books/v1",
    searchUrl: "/volumes?q=",
    searchField: "intitle:",
    key: "&key=AIzaSyCX89VjwhUTAvNjf4a1bMKChClukfE0M7Q"
}

export const search = (param = "") => {
    const term = param.split(" ").join("+");
    return fetch(`${config.baseUrl}${config.searchUrl}${config.searchField}${term}`, {
        method: "GET",
    })
    .then(resp => resp.json())
    .then(json => {
        return json.items ? json.items.map(book => ({
            id: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title
        })) : "Not Found";
    })
    .catch(error => console.log(error));
}