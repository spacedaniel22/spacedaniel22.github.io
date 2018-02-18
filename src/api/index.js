export const config = {
    baseUrl: "https://www.googleapis.com/books/v1",
    searchUrl: "/volumes?q=",
    searchField: "intitle:",
    bookDetailUrl: "/volumes/",
    key: "key=AIzaSyCX89VjwhUTAvNjf4a1bMKChClukfE0M7Q",
    error: {
        notFound: true,
        message: "Book not found"
    },
    unknownAuthors: ["Unknown"],
    missingDescription: "Missing Description",
    fallbackImage: "https://genderstudies.indiana.edu/images/publications/book-cover-placeholder.jpg"
}

export const search = (param = "") => {
    const term = param.split(" ").join("+");
    return fetch(`${config.baseUrl}${config.searchUrl}${config.searchField}${term}&${config.key}`, {
        method: "GET",
    })
    .then(resp => resp.json())
    .then(json => {
        return json.items ? json.items.map(book => ({
            id: book.id,
            authors: book.volumeInfo.authors || config.unknownAuthors,
            title: book.volumeInfo.title
        })) : config.error;
    })
    .catch(error => console.log(error));
}

export const getBookDetail = (id) => {
    return fetch(`${config.baseUrl}${config.bookDetailUrl}${id}?${config.key}`, {
        method: "GET",
    })
    .then(resp => resp.json())
    .then(json => {
        const bookInfo = json.volumeInfo;
        const imageLinks = bookInfo.imageLinks;
        const coverImage = imageLinks ? imageLinks.medium || imageLinks.thumbnail || imageLinks.small : config.fallbackImage;
        return !json.errors ?  {
            id: json.id,
            title: bookInfo.title,
            authors: bookInfo.authors || config.unknownAuthors,
            description: bookInfo.description || config.missingDescription,
            imageLink:  coverImage
        } : config.error;
    })
    .catch(error => console.log(error));
}