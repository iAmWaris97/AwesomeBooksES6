import Book from './modules/book.js';
import Storage from './modules/storage.js';
import BooksToDom from './modules/dom.js';
import Time from './modules/Time.js';

const form = document.querySelector('form');
const navList = document.querySelector('.nav-list');
const navAdd = document.querySelector('.nav-add');
const navContact = document.querySelector('.nav-contact');
const addBook = document.querySelector('.add');
const list = document.querySelector('.list');
const contact = document.querySelector('.contact');

// to display the time
Time.setTime();
document.querySelector('time').innerHTML = new Date().toLocaleString();

// listing books link
navList.addEventListener('click', () => {
  list.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
});

// adding books link
navAdd.addEventListener('click', () => {
  list.classList.add('hide');
  addBook.classList.remove('hide');
  contact.classList.add('hide');
});

// contact link
navContact.addEventListener('click', () => {
  list.classList.add('hide');
  addBook.classList.add('hide');
  contact.classList.remove('hide');
});

document.addEventListener('DOMContentLoaded', BooksToDom.displayBooksInDom);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;

  const book = new Book(title, author);

  BooksToDom.BooksList(book);

  Storage.BooksToStorage(book);

  Storage.checkEmptyList();

  BooksToDom.clearField();
});

document.querySelector('#tbody').addEventListener('click', (e) => {
  BooksToDom.deleteBook(e.target);

  Storage.removeFromStorage(
    e.target.parentElement.previousElementSibling.textContent,
  );
  Storage.checkEmptyList();
});