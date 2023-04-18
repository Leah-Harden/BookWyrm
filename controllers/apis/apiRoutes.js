const router = require('express').Router();
const fetch = require('node-fetch');
const withAuth = require('../../utils/auth');
const {User, Book, InProgress} = require('../../models');


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
        const bookData = await fetch(`https://openlibrary.org/search.json?title=${req.params.title}&fields=title,author_name,isbn,cover_i,number_of_pages_median&limit=5&page=${(!!req.body.page_num ? req.body.page_num : '1')}`);
        const books = await bookData.json();
        if (books.numFound === 0) {
            res.json({ message: "No books found" });
        } else {
            const bookInfo = books.docs.map((book) => book = {
                title: (!book.subtitle ? book.title : book.title + ": " + book.subtitle),
                author: book.author_name[0],
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

router.post('/addBook', async (req, res) => {
    const bookInfo = req.body;
    const minutes = bookInfo.pageCount / 1.7;
    const seconds = Math.round(minutes * 60);

    try{
        const bookExist = await Book.findOne({ where: {isbn: bookInfo.isbn}});
        if(!bookExist){
            const newBook = await Book.create(bookInfo);
            const newBookInfo = await newBook.get({plain:true});
            const newStartBook = await InProgress.create({
                timeRemaining: seconds,
                book_id: newBookInfo.id,
                user_id: '4f9ca34a-d594-4917-a7f9-c10e0e5a216b'
            })
            res.json(newStartBook);
        } else {
            const bookDbInfo = await bookExist.get({plain:true});
            const inProgressAlready = await InProgress.findOne({where: {book_id: bookDbInfo.id}});
            if(!inProgressAlready){
                const newStartBook = await InProgress.create({
                    timeRemaining: seconds,
                    book_id: bookDbInfo.id,
                    user_id: '4f9ca34a-d594-4917-a7f9-c10e0e5a216b'
                })
                res.json(newStartBook);
            } else{
                res.json('Book already in progress.');
            }
        }
    } catch(err){
        res.json(err);
    }
})


module.exports = router;
