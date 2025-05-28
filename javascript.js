const myLibrary = [];

function Book(author, title, pages, hasRead, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;

    this.info = function() {
        const readStatus = this.hasRead ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    };
};

function addBookToLibrary(author, title, pages, hasRead) {
    const id = crypto.randomUUID();
    const book = new Book(author, title, pages, hasRead, id);
    myLibrary.push(book);
};

function displayBooks(myLibrary) {
    let container = document.getElementById("books-container");
    container.innerHTML = "";

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.textContent = book.info();
        container.appendChild(card);
        card.setAttribute("data-id", book.id);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("delete-button");
        removeBtn.textContent = "Remove"
        card.append(removeBtn)

        removeBtn.addEventListener("click", () => {
            const id = card.getAttribute("data-id");
            const index = myLibrary.findIndex(book => book.id === id);
            myLibrary.splice(index, 1);

            displayBooks(myLibrary);
        });
    });
};

const BookBtn = document.querySelector("#new-book-button");
const dialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");

BookBtn.addEventListener("click", () => {
    dialog.showModal();
});

const submitBtn = document.querySelector("#submit-btn");
const form = document.querySelector("form")

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pages").value;
    let hasRead = document.getElementById("has_read").checked;

    addBookToLibrary(author, title, pages, hasRead);

    displayBooks(myLibrary);

    form.reset();
    dialog.close();
});


