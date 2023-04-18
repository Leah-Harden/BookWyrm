

$("#nameBtn").click(function (event) {
    event.preventDefault()
    var bookName = inpName.value;
    function change_page() {
        if (bookName == "Search") {
            console.log("no name")
        } else {
            router.get('/book/:',bookName, async (req, res) => {
                res.render('book', {
                    logged_in: req.session.logged_in
                });
            });
        }
    };
    change_page()
});

function helo() {

    fetch('https://openlibrary.org/search.json?title='+ Home +'&limit=4&fields=title,author_name,isbn,cover_i,number_of_pages_median',{ method:'GET'})
    .then(function(response){return response.json();})
    .then(data => {
        if ( bookName != '') {
            bookTitle = data.title;
            bookAuthor = data.author_name;
            bookPages = data.number_of_pages_median;
            document.getElementById("displayAge").textContent = data.age;
            console.log(data);
        }else{
            console.log("broked age") ; 
        }
        
        
    })
    .catch(err => console.log(err));
}
helo()