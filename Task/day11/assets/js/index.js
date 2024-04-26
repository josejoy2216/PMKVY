// books 
let book1 = {
    title: "harry potter", 
    author: "J.K. Rowling",
    description: "Harry Potter, fictional character, a boy wizard created by British author J.K. Rowling.", 
    availability: true 
}
let book2 = {
    title: "oliver twist", 
    author: "Charles Dickens", 
    description: "",
    availability: true
}
let book3 = {
    title: "Kuch tho", 
    author: "Some Author", 
    description: "",
    availability: true
}


//libary main logic
let library = {
    books: [...[book1, book2, book3]],

    addBook: function( ...book ) {
        this.books.push(...book);
    },
    findBook: function(title) {
        return this.books.find(book => book.title === title);
    },
    editBook: function(title, author, description) {
        this.books = this.books.map(book => {
            if (book.title === title) {
                return { ...book, author, description, availability: true };
            } else {
                return book;
            }
        });
    },

    
    checkOutBook: function(title) {
        this.books = this.books.map(book => {
            if (book.title === title) {
                return { ...book, availability: false };
            } else {
                return book;
            }
        });
    },
    returnBook:function(title) {
        this.books = this.books.map(book => {
            if (book.title === title) {
                return { ...book, availability: true };
            } else {
                return book;
            }
        });
    },
};


//search book 
document.getElementById("search").onclick = function (){
    Search = document.getElementById('searchtxt').value;
    console.log(Search)
    let foundBook = library.findBook(Search);

    document.getElementById('title').value = foundBook.title;
    document.getElementById('author').value = foundBook.author;
    document.getElementById('description').value = foundBook.description;
}


//add button click 
document.getElementById("addBtn").onclick = function (){
    Title = document.getElementById('title').value;
    Author = document.getElementById('author').value;
    Description = document.getElementById('description').value;
   
    library.addBook({
        title: Title,
        author: Author,
        description: Description,
        availability: true });

        console.log(Title+" "+Author+ " "+ Description)
        console.log(library.books)

    // clear after adding data 
    document.getElementById('title').value = " ";
    document.getElementById('author').value = " ";
    document.getElementById('description').value = " ";
}


//clear button 
document.getElementById("clrBtn").onclick = function (){
    console.log("deleted" +" " +title+ " " + description )
    document.getElementById('title').value = " ";
    document.getElementById('author').value = " ";
    document.getElementById('description').value = " ";

}


//edit book
document.getElementById("edtBtn").onclick = function (){
    let Title = document.getElementById('title').value;
    let Author = document.getElementById('author').value;
    let Description = document.getElementById('description').value;

    library.editBook(Title, Author, Description);
    
    console.log(library.books)
    
}



















document.getElementById("deleteBtn").onclick = function (){
    title = document.getElementById('dtitle').value;
    description = document.getElementById('ddesp').value;
   
    console.log(title+ " " + description )
    document.getElementById('dtitle').value = " ";
    document.getElementById('ddesp').value = " ";
}



