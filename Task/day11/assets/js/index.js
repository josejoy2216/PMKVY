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
    description: " The titular character is born an orphan and is forced into unjust and cruel situations from child farms to workhouses to a life of crime",
    availability: true
}
let book3 = {
    title: "Fear of Flying", 
    author: "Erica Jong", 
    description: "Knowing it is my favorite book, for my 34th birthday, a boyfriend once gave me a signed first edition of Erica Jong’s Fear of Flying",
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

    deleteBook: function(title) {
        this.books = this.books.filter(book => book.title !== title);
    },
    
    bookOrderd: function(title) {
        this.books = this.books.map(book => {
            if (book.title === title) {
                return { ...book, availability: false };
            } else {
                return book;
            }
        });
    },

    bookReturn:function(title) {
        this.books = this.books.map(book => {
            if (book.title === title) {
                return { ...book, availability: true };
            } else {
                return book;
            }
        });
    },

};



document.addEventListener('DOMContentLoaded', function() {
    // Function to create a card for a book
    function createBookCard(book) {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-4', 'left', 'm-3', 'p-3', 'cardbook');
        let formGroupDiv = document.createElement('div');
        formGroupDiv.classList.add('form-group');

        let titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('class', 'form-control mb-2');
        titleInput.setAttribute('value', book.title);
        titleInput.setAttribute('readonly', true);

        let authorInput = document.createElement('input');
        authorInput.setAttribute('type', 'text');
        authorInput.setAttribute('class', 'form-control mb-2');
        authorInput.setAttribute('value', book.author);
        authorInput.setAttribute('readonly', true);

        let descriptionTextarea = document.createElement('textarea');
        descriptionTextarea.setAttribute('class', 'form-control mb-2');
        descriptionTextarea.setAttribute('readonly', true);
        descriptionTextarea.textContent = book.description; 

        let editButton = document.createElement('button');
        editButton.setAttribute('class', 'btn btn-primary btn-block m-2');
        editButton.textContent = 'Edit book';

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'btn btn-primary btn-block');
        deleteButton.textContent = 'Remove book';

        formGroupDiv.appendChild(titleInput);
        formGroupDiv.appendChild(authorInput);
        formGroupDiv.appendChild(descriptionTextarea);
        formGroupDiv.appendChild(editButton);
        formGroupDiv.appendChild(deleteButton);

        cardDiv.appendChild(formGroupDiv);

        return cardDiv;
    }

    // Function to display all books in the library
    function displayBooks() {
        let booksContainer = document.getElementById('booksContainer');

        // Clear previous book cards
        booksContainer.innerHTML = '';

        library.books.forEach((book, index) => {
            // Create a new row div for every third book
            if (index % 3 === 0) {
                let rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                booksContainer.appendChild(rowDiv);
            }

            // Get the last row div
            let rowDiv = booksContainer.lastElementChild;

            // Create card for the book
            let card = createBookCard(book);

            // Append the card to the last row div
            rowDiv.appendChild(card);
        });
    }

    // Call the function to display all books initially
    displayBooks();



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

    alert(`New Book Added with title ${Title}`)
    // clear after adding data 
    document.getElementById('title').value = " ";
    document.getElementById('author').value = " ";
    document.getElementById('description').value = " ";

      // Update the displayed books
      displayBooks();
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
    // Update the displayed books
    displayBooks();
    
}

//delete book
document.getElementById("deleteBtn").onclick = function() {
    let title = document.getElementById('title').value;

    library.deleteBook(title);
    alert(`A book with the title '${title}' has been deleted.`);
    console.log(library.books);
      // Update the displayed books
      displayBooks();
}

});





