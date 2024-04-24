let book1 = {
    title: "harry potter", 
    author: "J.K. Rowling", 
    availability: true 
}
let book2 = {
    title: "oliver twist", 
    author: "Charles Dickens", 
    availability: true
}
let book3 = {
    title: "Kuch tho", 
    author: "Some Author", 
    availability: true
}



let library = {
    books: [...[book1, book2, book3]],

    addBook: function( ...book ) {
        this.books.push(...book);
    },
    findBook: function(title) {
        return this.books.find(book => book.title === title);
    },
    findAuthor: function(author) {
        return this.books.find(book => book.author === author);
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

console.log(library);

// Add a new book
library.addBook({
    title: "the Catcher",
    author: "J.D Salinger",
    availability: true });

console.log(library.books);

// Find a book
let foundBook = library.findBook("harry potter");
console.log(foundBook);

// Find a book
let findAuthor = library.findBook("oliver twist");
console.log(findAuthor);

// Check out a book
library.checkOutBook("harry potter");
console.log(library.books);



// return a book
library.returnBook("harry potter");
console.log(library.books);

