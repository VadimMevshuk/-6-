// Базовий клас User (Користувач)
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// Клас Librarian (Бібліотекар)
class Librarian extends User {
    constructor(id, name, email) {
        super(id, name, email);
    }

    // Метод для додавання книги до бібліотеки
    addBook(library, book) {
        library.addBook(book);
    }

    // Метод для видалення книги з бібліотеки
    removeBook(library, bookTitle) {
        library.removeBook(bookTitle);
    }
}

// Клас Reader (Читач)
class Reader extends User {
    constructor(id, name, email) {
        super(id, name, email);
        this.loans = [];
    }

    // Метод для позичання книги з бібліотеки
    borrowBook(library, bookTitle) {
        const loan = library.loanBook(bookTitle, this);
        if (loan) {
            this.loans.push(loan);
        }
    }

    // Метод для повернення книги до бібліотеки
    returnBook(library, bookTitle) {
        const loanIndex = this.loans.findIndex(loan => loan.book.title === bookTitle);
        if (loanIndex !== -1) {
            const loan = this.loans[loanIndex];
            library.returnBook(loan);
            this.loans.splice(loanIndex, 1);
        } else {
            console.log(`У вас немає книги "${bookTitle}", щоб її повернути.`);
        }
    }
}

// Клас Book (Книга)
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true;
    }
}

// Клас Loan (Позика)
class Loan {
    constructor(book, reader, dueDate) {
        this.book = book;
        this.reader = reader;
        this.dueDate = dueDate;
    }
}

// Клас Library (Бібліотека)
class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.loans = [];
    }

    // Метод для додавання книги
    addBook(book) {
        this.books.push(book);
        console.log(`Книга "${book.title}" додана до бібліотеки.`);
    }

    // Метод для видалення книги
    removeBook(bookTitle) {
        const index = this.books.findIndex(book => book.title === bookTitle);
        if (index !== -1) {
            if (this.books[index].isAvailable) {
                console.log(`Книга "${bookTitle}" видалена з бібліотеки.`);
                this.books.splice(index, 1);
            } else {
                console.log(`Книгу "${bookTitle}" не можна видалити, оскільки вона у позиченні.`);
            }
        } else {
            console.log(`Книгу "${bookTitle}" не знайдено у бібліотеці.`);
        }
    }

    // Метод для додавання користувача
    addUser(user) {
        this.users.push(user);
        console.log(`Користувач "${user.name}" доданий до бібліотеки.`);
    }

    // Метод для позики книги читачем
    loanBook(bookTitle, reader) {
        const book = this.books.find(book => book.title === bookTitle);
        if (book && book.isAvailable) {
            book.isAvailable = false;
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14); // 2 тижні
            const loan = new Loan(book, reader, dueDate);
            this.loans.push(loan);
            console.log(`Книга "${bookTitle}" видана читачу "${reader.name}" до ${dueDate.toLocaleDateString()}.`);
            return loan;
        } else if (!book) {
            console.log(`Книгу "${bookTitle}" не знайдено у бібліотеці.`);
        } else {
            console.log(`Книга "${bookTitle}" вже у позиченні.`);
        }
    }

    // Метод для повернення книги
    returnBook(loan) {
        const index = this.loans.findIndex(l => l === loan);
        if (index !== -1) {
            loan.book.isAvailable = true;
            console.log(`Книга "${loan.book.title}" повернута читачем "${loan.reader.name}".`);
            this.loans.splice(index, 1);
        } else {
            console.log(`Позика не знайдена.`);
        }
    }

    // Метод для перевірки прострочених позик
    checkOverdueLoans() {
        const today = new Date();
        this.loans.forEach(loan => {
            if (loan.dueDate < today) {
                console.log(`Книга "${loan.book.title}" прострочена! Взята читачем "${loan.reader.name}".`);
            }
        });
    }
}

// Тестові сценарії

// Створення бібліотеки
const library = new Library();

// Додавання книг
const book1 = new Book("1984", "Джордж Орвелл"); // Додамо класичну антиутопію "1984" до бібліотеки
const book2 = new Book("Убити пересмішника", "Гарпер Лі"); // Ще одна класична книга, яку додаємо до бібліотеки
library.addBook(book1);
library.addBook(book2);

// Створення користувачів
const librarian = new Librarian(1, "Вадім", "vadim@example.com"); // Бібліотекар Вадім, який додає та видаляє книги
const reader1 = new Reader(2, "Деніс", "denis@example.com"); // Читач Деніс, який бере та повертає книги
const reader2 = new Reader(3, "Кіріл", "kiril@example.com"); // Новий читач Кіріл, який також може брати книги
const reader3 = new Reader(4, "Артем", "artem@example.com"); // Ще один новий читач Артем
library.addUser(librarian);
library.addUser(reader1);
library.addUser(reader2);
library.addUser(reader3);

// Бібліотекар Вадім додає книгу
const book3 = new Book("Прекрасний новий світ", "Олдос Гакслі"); // Вадім додає антиутопію "Прекрасний новий світ"
librarian.addBook(library, book3);

// Читач Деніс бере книгу
reader1.borrowBook(library, "1984"); // Деніс бере книгу "1984" для читання

// Перевірка стану книг у бібліотеці
console.log("Список книг у бібліотеці:", library.books);

// Читач Деніс повертає книгу
reader1.returnBook(library, "1984"); // Деніс повертає книгу "1984" після читання

// Перевірка прострочених позик
library.checkOverdueLoans(); // Перевірка наявності прострочених позик у бібліотеці
// Встановлення cookie
document.cookie = "myCookie=value; SameSite=None; Secure";

// Перевірка встановлених cookie
console.log(document.cookie);
