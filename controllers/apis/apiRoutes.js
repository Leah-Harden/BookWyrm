const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

    const bookData = await fetch(`https://openlibrary.org/search.json?q=the+lord+of+the+rings&limit=5&page=${(!!req.body.page_num ? req.body.page_num : '1')}`);
    const books = await bookData.json();
    const bookInfo = books.docs.map((book) => book = {
        title: (!book.subtitle ? book.title : book.title + ": " + book.subtitle),
        author: book.author_name,
        ...(book.isbn ? { isbn: book.isbn[0] } : {}),
        ...(book.cover_i ? { coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` } : {}),
        ...(book.number_of_pages_median ? { pageCount: book.number_of_pages_median } : {}),
    })
    console.log(bookInfo);

    res.json(bookInfo);
})



router.get('/:title', async (req, res) => {
    // const bookData = await fetch(`https://openlibrary.org/search.json?q=${req.body.title}&limit=5)}`);
    // const books = await bookData.json();
    // const bookInfo = books.docs.map((book) => book = {
    //     title: (!book.subtitle ? book.title : book.title + ": " + book.subtitle),
    //     author: book.author_name,
    //     ...(book.isbn ? { isbn: book.isbn[0] } : {}),
    //     ...(book.cover_i ? { coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` } : {}),
    //     ...(book.number_of_pages_median ? { pageCount: book.number_of_pages_median } : {}),
    // })
    // console.log(bookInfo);
    // res.json(bookInfo);

    
    try {
        const bookData = await fetch(`https://openlibrary.org/search.json?title=${(!!req.body.title ? req.body.title : "game+of+thrones")}&fields=title,author_name,isbn,cover_i,number_of_pages_median&limit=5&page=${(!!req.body.page_num ? req.body.page_num : '1')}`);
        const books = await bookData.json();
        if (books.numFound === 0) {
            res.json({ message: "No books found" });
        } else {
            const bookInfo = books.docs.map((book) => book = {
                title: (!book.subtitle ? book.title : book.title + ": " + book.subtitle),
                author: book.author_name,
                ...(book.isbn ? { isbn: book.isbn[0] } : {}),
                ...(book.cover_i ? { coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` } : {}),
                ...(book.number_of_pages_median ? { pageCount: book.number_of_pages_median } : {}),
            })
            console.log(bookInfo);

            res.json(bookInfo);
        }

    } catch (err) {
        res.json(err);
    }
});


module.exports = router;
