// JavaScript source code
var bookImgPath = encodeURI("../img/bookImg/");
var bookImg64;
var storageAvilible = false;
var storageType = "sessionStorage";
//var storageType = "None";
var dbURL = "http://localhost:3000/Library"
var tblConfig;
var gLib;


//Book object constructor
var Book = function (details, callNum, catagory = "", bookcover = "", plot = "", summary = "", booktype = "") {
    this.details = details;
    this.callNum = callNum;
    this.catagory = catagory;
    this.bookcover = bookcover;
    this.plot = plot;
    this.summary = summary;
    this.booktype = booktype;

}

var TableConfig = function () {
    this.data = [];
    this.recordCount = 0;
    this.pagenum = 0;
    this.currentPage = 1;
    this.pagesize = 0;
    this.lastIndex = -1;
    this.startIndex = -1;
    this.stopIndex = -1;
    this.selectedIndex = -1;
}

class Library2 {
    //Singleton constructor
    constructor(storagekey) {
        if (!Library2.instance) {
            this.Books = [];
            this.storagekey = storagekey;
            Library2.instance = this;
        }
        return Library2.instance;
    };

    // Getters
    //get Books() {
    //    return this._Books();
    //};

    // Setters
    //set something() {
    //    return true;
    //}

    // Methods
    //methodname() {
    //    //do something
    //    return true;
    //};

    //this will check to see if Book title by an author exists in Library. If not will add it. This function sets a message. because it is used by other functions and may be repeated the repeat var is used so the message is not set if used by another function.
    addBook(Book, repeat = false) {
        if (Book.details === "undefined") { return false; };
        let t = Book.details.title.toLowerCase();
        let a = Book.details.author.toLowerCase();
        let index = this.indexDetailItem("TA", t, a)
        if (index < 0) {
            this.Books.push(Book);
            if (repeat == false) {
                document.getElementById("msg").innerHTML = Book.details.title + " has been added to the Library.";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return true;

        } else {
            if (repeat == false) {
                document.getElementById("msg").innerHTML = Book.details.title + " is already in the Library.";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return false;
        }
    };

    addBookAjax(Book, repeat = false) {
        if (Book.details === "undefined") { return false; };
        let t = Book.details.title.toLowerCase();
        let a = Book.details.author.toLowerCase();
        let index = this.indexDetailItem("TA", t, a)
        if (index < 0) {
            this.Books.push(Book);
            if (repeat == false) {
                document.getElementById("msg").innerHTML = Book.details.title + " has been added to the Library.";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return true;

        } else {
            if (repeat == false) {
                document.getElementById("msg").innerHTML = Book.details.title + " is already in the Library.";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return false;
        }
    };

    //this will check to see if Book title and author exists in Library as comparied to an array of Book objects. Only if the Book was not found will it be added. 
    addBookArray(BookArray, msg = true) {
        var i = 0;
        var count = 0;
        for (i; i < BookArray.length; i++) {
            if (this.addBook(BookArray[i], true) == true) {
                count++;
            }
        }
        if (msg) {
            document.getElementById("msg").innerHTML = count + ": Book(s) have been added to your Library.";
            document.getElementById("msg").setAttribute("class", "msgclass");
        }
        return count;
    };

    //this will remove a Book from the Library by its title.
    removeBookbyTitle(title) {
        var index = this.indexDetailItem("title", title, "");
        if (index == -1) {
            document.getElementById("msg").innerHTML = "This Book was not found in your Library!";
            document.getElementById("msg").setAttribute("class", "msgclass");
            return false;
        }
        else {
            this.Books.splice(index, 1);
            document.getElementById("msg").innerHTML = uppercase(title) + " has been removed from the Library!";
            document.getElementById("msg").setAttribute("class", "msgclass");
            return true;
        }
    };

    //this will remove a Book from the Library by its call number.
    removeBookbyCallNum(callnum, msg = true) {
        if (callnum.startsWith("RM")) {
            callnum = callnum.substr(2);
        }
        var index = this.indexItem("callNum", callnum);
        if (index == -1) {
            document.getElementById("msg").innerHTML = "This Book was not found in your Library!";
            document.getElementById("msg").setAttribute("class", "msgclass");
            return false;
        }
        else {
            this.Books.splice(index, 1);
            if (msg) {
                document.getElementById("msg").innerHTML = "1 item has been removed from the Library!";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return true;
        }
    };

    //this will remove all Books from the Library by an author.
    removeBookbyAuthor(author) {
        var index = this.indexItem("author", author.toLowerCase());
        //console.log(index);
        var count = 0;
        if (index == -1) {
            document.getElementById("msg").innerHTML = "No Books by this author were found in your Library!";
            document.getElementById("msg").setAttribute("class", "msgclass");
            return false;
        };
        while (index != -1) {
            this.Books.splice(index, 1);
            count++;
            index = this.indexItem("author", author.toLowerCase());
        }
        document.getElementById("msg").innerHTML = count + " book(s) was removed from the Library.";
        document.getElementById("msg").setAttribute("class", "msgclass");
        return true;
    };

    //this will remove a Book from the Library by its author and title.
    removeBookbyTitleAndAuthor(title, author) {
        let t = title.toLowerCase();
        let a = author.toLowerCase();
        let index = this.indexDetailItem("TA", t, a)
        if (index == -1) {
            document.getElementById("msg").innerHTML = "No Books by this author were found in the Library!";
            document.getElementById("msg").setAttribute("class", "msgclass");
            return false;
        }
        else {
            this.Books.splice(index, 1);
            document.getElementById("msg").innerHTML = uppercase(title) + " was removed from the Library.";
            document.getElementById("msg").setAttribute("class", "msgclass");
            return true;
        }
    };

    //this will retrive a random Book from the Library.
    random(msg = true) {
        let ranBook = this.Books[Math.floor((Math.random() * this.Books.length))];
        if (msg) {
            document.getElementById("msg").innerHTML = "We have selected " + ranBook.details.title + " for you.";
            document.getElementById("msg").setAttribute("class", "msgclass");
        }
        return ranBook;
    }

    checkcallNum() {
        let index = -1;
        let callNum = 0;

        do {
            callNum = generateCallNum();
            index = this.indexItem("callNum", callNum)
        }
        while (!index == -1);
        return callNum;
    };

    //this will retrive a collection of Books from the Library by title.
    getBooksByTitle(title, msg = true) {
        let i = 0;
        let Booklist = [];
        let count = 0;
        for (i; i < this.Books.length; i++) {
            let bktitle = this.Books[i].details.title.toLowerCase();
            if (bktitle.indexOf(title.toLowerCase()) !== -1) {
                Booklist.push(this.Books[i]);
                count++;
            }
        }
        if (msg) {
            document.getElementById("msg").innerHTML = "We have found " + count + " Book(s) with the title of: " + uppercase(title);
            document.getElementById("msg").setAttribute("class", "msgclass");
        }

        return Booklist;
    };

    //this will retrive a collection of Books from the Library by author.
    getBooksByAuthor(author, msg = true) {
        let i = 0;
        let Booklist = [];
        let count = 0;
        for (i; i < this.Books.length; i++) {
            let bkauthor = this.Books[i].details.author.toLowerCase();
            if (bkauthor.indexOf(author.toLowerCase()) !== -1) {
                Booklist.push(this.Books[i]);
                count++;
            }
        }
        if (msg) {
            document.getElementById("msg").innerHTML = "We have found " + count + " book(s) by the author: " + uppercase(author);
            document.getElementById("msg").setAttribute("class", "msgclass");
        }
        return Booklist;
    };

    //this will retrive a collection of Books from the Library by author and title.
    getBooksByTitleAuthor(title, author, msg = true) {
        let i = 0;
        let Booklist = [];
        let count = 0;
        for (i; i < this.Books.length; i++) {
            let bkauthor = this.Books[i].details.author.toLowerCase();
            let bktitle = this.Books[i].details.title.toLowerCase();
            if (bkauthor.indexOf(author.toLowerCase()) !== -1 && bktitle.indexOf(title.toLowerCase()) !== -1) {
                Booklist.push(this.Books[i]);
                count++;
            }
        }
        if (msg) {
            document.getElementById("msg").innerHTML = "We have found " + count + " book(s) by the author: " + uppercase(author);
            document.getElementById("msg").setAttribute("class", "msgclass");
        }
        return Booklist;
    };

    //this will retrive a collection of authors from the Library.
    getAuthors() {
        var i = 0;
        var author = "";
        var authorlist = [];
        var count = 0;
        for (i; i < this.Books.length; i++) {
            author = this.Books[i].details.author;
            if (authorlist.indexOf(author) === -1) {
                authorlist.push(author);
                count++;
            }
        }
        document.getElementById("msg").innerHTML = "We have found " + count + " author(s) in the Library.";
        document.getElementById("msg").setAttribute("class", "msgclass");
        return authorlist;
    };

    //this will retrive a random author from the Library.
    getRandomAuthors() {
        var i = 0;
        var author = "";
        var authorlist = [];
        for (i; i < this.Books.length; i++) {
            author = this.Books[i].details.author;
            if (authorlist.indexOf(author) === -1) {
                authorlist.push(author);
            }
        }
        author = authorlist[Math.floor((Math.random() * authorlist.length))].toString();
        document.getElementById("msg").innerHTML = "We have selected " + uppercase(author) + " for you.";
        document.getElementById("msg").setAttribute("class", "msgclass");
        return author;
    };

    indexDetailItem(key, value, value2 = "none") {
        var i = 0;
        var x = "";
        if (key = "TA") {
            for (i = 0; i < this.Books.length; i++) {
                if (this.Books[i].details.title.toLowerCase().includes(value) && this.Books[i].details.author.toLowerCase().includes(value2)) {
                    return i;
                }
            }
        } else {
            for (i = 0; i < this.Books.length; i++) {
                x = this.Books[i].details[key].toLowerCase();
                console.log(x);
                console.log(x.includes(value));
                if (x.includes(value)) {
                    return i;
                }
            }
        }
        return -1;
    }

    indexItem(key, value) {
        var i = 0;
        var x = "";

        for (i = 0; i < this.Books.length; i++) {
            x = this.Books[i][key].toLowerCase();
            if (x.includes(value)) {
                return i;
            }

        }
        return -1;
    }

    //updates Library from local or session storage
    updateLibraryfromStorage(msg = true) {
        let text = "";
        let Bookarr = [];
        let i = 0;
        if (storageType == 'localStorage') {
            text = localStorage.getItem(this.storagekey);
        } else if (storageType == 'sessionStorage') {
            text = sessionStorage.getItem(this.storagekey);
        }
        Bookarr = JSON.parse(text);
        return this.addBookArray(Bookarr, msg);
    }

    //removes Library from local or session storage and creates a new object with key if none is suppied.
    removeLibrary(LibraryKey = "LibraryKey") {
        localStorage.removeItem(this.storagekey);
        sessionStorage.removeItem(this.storagekey);
        this.Library.Books.length = 0;
        this.Library = new Library(LibraryKey);
    }

    //clears Library of books
    clearLibrary(LibraryKey = "LibraryKey") {
        return this.Books.length = 0;
    }

    //Library Sort Methods-------------------------------------------------------
    sortLibraryList(sortType, decend) {
        let BookList = [];

        switch (sortType) {
            case "title":
                BookList = this.sortTitle(decend);
                fillListing(BookList);
                return true;
            case "author":
                BookList = this.sortAuthor(decend);
                fillListing(BookList);
                return true;
            case "page":
                BookList = this.sortPage(decend);
                fillListing(BookList);
                return true;
            case "pub":
                BookList = this.sortDate(decend);
                fillListing(BookList);
                return true;
        }
    }

    sortAuthor(decend = false) {
        let bookList = this.Books;
        bookList.sort(function (a, b) {
            return a.details.author > b.details.author;
        })
        if (decend == true) {
            return bookList.reverse();
        } else {
            return bookList;
        }
    }

    sortTitle(decend = false) {
        let bookList = this.Books;
        bookList.sort(function (a, b) {
            return a.details.title > b.details.title;
        })
        if (decend == true) {
            return bookList.reverse();
        } else {
            return bookList;
        }
    }

    sortPage(decend = false) {
        let bookList = this.Books;
        bookList.sort(function (a, b) {
            return a.details.numberOfPages > b.details.numberOfPages;
        })
        if (decend == true) {
            return bookList.reverse();
        } else {
            return bookList;
        }
    }

    sortDate(decend = false) {
        let bookList = this.Books;
        bookList.sort(function (a, b) {
            return a.details.publishDate > b.details.publishDate;
        })
        if (decend == true) {
            return bookList.reverse();
        } else {
            return bookList;
        }
    }

    sortCallNum(decend = false) {
        let bookList = this.Books;
        bookList.sort(function (a, b) {
            return a.callNum > b.callNum;
        })
        if (decend == true) {
            return bookList.reverse();
        } else {
            return bookList;
        }
    }





    //---------------------------------------------Form Functions-----------------------------------------------------------------
    //this will display a random Book from the Library.
    displayRandomBook() {
        let BookArr = this.random(false);
        $('#rdBookImg').attr('src', decodeURI(BookArr.bookcover));
        document.getElementById("cardtitle2").innerHTML = BookArr.details.title;
        document.getElementById("cardAuthor2").innerHTML = "Written by: " + BookArr.details.author;

        $("#randomBook").modal("toggle");
        return true;
    }



    //for testing. this function will fill the Library
    fillLib() {
        this.Books.length = 0;
        this.Books.push(gIT);
        this.Books.push(gIT2);
        this.Books.push(gGM);
        this.Books.push(gCatherInTheRye);
        this.Books.push(gNP);
        this.Books.push(gTTC);
        this.Books.push(gPOW);
        this.Books.push(gQOS);
        this.Books.push(gQOW);
        this.Books.push(gQOT);
        return this.Books.length;
    };
}

function initialize() {
    CleanLoad();
    gLib = new Library2("gLib");
    tblConfig = new TableConfig();
    GetBooksAjax();
};

//---------------------------------------------------AJAX ELEMENTS---------------------------------------------------------------
function AddBooksAjax(Book) {
    //console.log(Book.details.pubDate);
    var d = new Date(Book.details.pubDate);
    // var c = covertB64();
    //console.log(c);
    //console.log(d);
    //console.log(Book.details.numPages);
    $.ajax({
        dataType: 'json',
        type: "POST",
        url: "http://localhost:3000/Library/",
        data: {
            title: Book.details.title,
            author: Book.details.author,
            pubDate: d,
            numPages: Book.details.numberOfPages,
            catagory: Book.catagory,
            plot: Book.plot,
            summary: Book.summary,
            cover: Book.cover
        },
    }).done(function (response) {
        Book.callNum = response._id;
        if (Library2.prototype.addBook(Book, true)) {
            LoadBookListAjax();
            document.getElementById("addbookmsg").innerHTML = count + " book(s) has been added to library.";
            $("#txtTitle").val('');
            $("#txtAuthor").val('');
            $("#txtPageNum").val('');
            $("#txtPubDate").val('');
            $('#dlCategory option:selected').val('');
            $('input[type=file]').val('');
            $("#txtPlot").val('');
            $("#txtSummary").val('');
            $("#txtTitle").focus();
        }

    }).fail(function () {
        console.log("failed to retrieve data...")
    });
}
function GetBooksAjax() {
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: "http://localhost:3000/Library/"

    }).done(function (response) {
        LoadBookListAjax(response);

    }).fail(function () {
        console.log("failed to retrieve data...")
    });
}

function GetBookAjax(id) {
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: "http://localhost:3000/Library/",
        data: {
            id: id
        }
    }).done(function (response) {
        console.log(response);
        return response;

    }).fail(function () {
        console.log("failed to retrieve data...")
    });
}

//---------------------------------------------------Global Functions---------------------------------------------------------------
//test to see if client storage is availible for current browser. this will then set a global value and then save it to be checked.
function storageAvailable(type) {
    try {
        if (type == "None") { return false; };
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);

        storageAvilible = true;
        if (storageType == 'localStorage') {
            localStorage.setItem("libStorageAvilible", "true");
        } else {
            sessionStorage.setItem("libStorageAvilible", "true");
        }
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

//this is used to take in any string and change the first charter to uppercase.
function uppercase(str) {
    let array1 = str.split(' ');
    let newarray1 = [];
    for (let x = 0; x < array1.length; x++) {
        newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
}

function formatDate(value) {
    d = new Date(value);
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getYear();
}

function covertB64() {
    console.log("covertB64 is running...");
    var file = document.querySelector('input[type=file]').files[0];
    //console.log(file);
    var reader = new FileReader();
    var z;

    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return undefined;
    };

    reader.addEventListener("load", function () {
        z = reader.result;
        console.log("IMG IS:" + z);
        return z;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
    console.log("IMG IS:" + z);
    return z;
}

//---------------------------------------------------Form Controls-------------------------------------------------------------
//model click event that will add a book to library
function formAddBooks() {
    const count = 0;
    if (validateBookEntry()) {
        let ntitle = $("#txtTitle").val();
        let nauthor = $("#txtAuthor").val();
        let nnumberOfPages = $("#txtPageNum").val();
        let npublishDate = $("#txtPubDate").val();
        let callNum = this.Library2().checkcallNum();
        let catagory = $('#dlCategory option:selected').val();
        let bookcover = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')

        let nbook = new Book({ title: ntitle, author: nauthor, numberOfPages: nnumberOfPages, publishDate: npublishDate }, callNum, catagory, bookcover);
        //console.log(nbook);
        if (this.Library2().addBook(nbook, true)) {
            count++;
            this.Library2().saveLibrary();
            LoadBookList();
            document.getElementById("addbookmsg").innerHTML = count + " book(s) has been added to library.";
            $("#txtTitle").val('');
            $("#txtAuthor").val('');
            $("#txtPageNum").val('');
            $("#txtPubDate").val('');
            $('#dlCategory option:selected').val('');
            $('input[type=file]').val('')
            $("#txtTitle").focus();
        }
    }
}

function formAddBooksAjax() {
    const count = 0;

    if (validateBookEntry()) {
        let c = covertB64();
        let bookcover = c;
        console.log("bookcover:" + bookcover);
        let ntitle = $("#txtTitle").val();
        let nauthor = $("#txtAuthor").val();
        let nnumberOfPages = $("#txtPageNum").val();
        let npublishDate = $("#txtPubDate").val();
        let catagory = $('#dlCategory option:selected').val();
        let nplot = $("#txtPlot").val();
        let nsummary = $("#txtSummary").val();

        let nbook = new Book({ title: ntitle, author: nauthor, numberOfPages: nnumberOfPages, publishDate: npublishDate }, 0, catagory, bookcover, nplot, nsummary);
        //AddBooksAjax(nbook);
        console.log(nbook);

    }
}

//controls the removes authors popup ans then calls the function to remove chasedn authos from library.
function removeAuthors(author) {
    let options = {
        'show': 'false'
    }
    if (confirm("You are about to remove all books written by this author. Do you wish to continue!")) {
        $('#txtremoveallauthors').val('');
        $('#removeAuthors').modal('toggle');
        if (this.Library2().removeBookbyAuthor(author)) {
            this.Library2().saveLibrary();
            LoadBookList();
            return true;
        };

    }
}

//checks clientstorage for library. checks client storage for search results. Loads either one into book listing.
function LoadBookList(search = false) {
    document.getElementById("msg").setAttribute("class", "msgclass");
    let text = "";
    let lHeading = "This is a listing of the current books in your selected library...";
    let lSearch = "Library Listing";

    if (search) {
        if (storageType == 'localStorage') {
            text = localStorage.getItem("searchResults");
        } else if (storageType == 'sessionStorage') {
            text = sessionStorage.getItem("searchResults");
        }
        document.getElementById("searchHeader").innerHTML = "Search Results";
        document.getElementById("libHeading").innerHTML = "This is a listing of the results from your search within the library...";
    } else {
        if (storageType == 'localStorage') {
            text = localStorage.getItem(window.Library().storagekey);
        } else if (storageType == 'sessionStorage') {
            text = sessionStorage.getItem(window.Library().storagekey);
        }
    }

    if (text == "None" || text == undefined) {
        document.getElementById("searchHeader").innerHTML = lSearch;
        document.getElementById("libHeading").innerHTML = "No books were found in stored library. Default test book was looked for appearance. Once you add a book to the library, this listing will repopulate...";
        return false;
    } else {
        var Bookarr = [];
        Bookarr = JSON.parse(text);
        displayListing("book");
        fillListing(Bookarr);
        return true;
    };
}

//checks clientstorage for library. checks client storage for search results. Loads either one into book listing.
function LoadBookListAjax(books) {
    document.getElementById("msg").setAttribute("class", "msgclass");
    let lHeading = "This is a listing of the current books in your selected library...";
    let lSearch = "Library Listing";

    if (books == "None" || books == undefined) {
        document.getElementById("searchHeader").innerHTML = lSearch;
        document.getElementById("libHeading").innerHTML = "No books were found in stored library. Default test book was looked for appearance. Once you add a book to the library, this listing will repopulate...";
        return false;
    } else {
        displayListing("book");
        fillListingAjax(books);
        return true;
    };
}


//contols which elements are displayed
function displayListing(listing) {
    switch (listing) {
        case "book":
            $("#tblBKList").show();
            $("#cdBookInfo").show();
            $("#tblAUList").hide();
            $("#editCard").hide();
            break;
        case "author":
            $("#tblBKList").hide();
            $("#cdBookInfo").hide();
            $("#tblAUList").show();
            $("#editCard").hide();
            break;
        case "editcard":
            $("#tblBKList").hide();
            $("#cdBookInfo").hide();
            $("#tblAUList").hide();
            $("#editCard").show();
            break;
    }
    return true;
}

//fills book listing
function fillListing(Bookarr) {
    let i = 0;
    let count = 0;
    //check if storage has value
    //clear table
    $("#tblBKList").find("tr:not(:first)").remove();

    var tr;
    var x = "";
    for (i = 0; i < Bookarr.length; i++) {
        x = Bookarr[i].callNum;
        tr = $('<tr/>');
        tr.append("<td><a href='javascript: void (0)' class='bookdetail' id='" + x + "'>" + x + "</a></td>");
        tr.append("<td>" + Bookarr[i].details.title + "</td>");
        tr.append("<td>" + Bookarr[i].details.author + "</td>");
        tr.append("<td>" + Bookarr[i].details.numberOfPages + "</td>");
        tr.append("<td>" + Bookarr[i].details.publishDate + "</td>");
        tr.append("<td>" + Bookarr[i].catagory + "</td>");
        tr.append("<td><a href='javascript: void (0)' class='bookremove' id=RM" + x + ">Remove</a></td>");
        tr.append("<td><a href='javascript: void (0)' class='bookremove' id=ED" + x + ">Edit</a></td>");
        $('table').first().append(tr);
        count++;
    }
    displayBookDetailbyCallNum(Bookarr[0].callNum);
    return count;
}

//fills book listing
function fillListingAjax(Bookarr) {
    let i = 0;
    let count = 0;
    //check if storage has value
    //clear table
    $("#tblBKList").find("tr:not(:first)").remove();

    var tr;
    var x = "";
    for (i = 0; i < Bookarr.length; i++) {
        x = Bookarr[i]._id;
        d = formatDate(Bookarr[i].pubDate);
        tr = $('<tr/>');
        tr.append("<td><a href='javascript: void (0)' class='bookdetail' id='" + x + "'>" + x + "</a></td>");
        tr.append("<td>" + Bookarr[i].title + "</td>");
        tr.append("<td>" + Bookarr[i].author + "</td>");
        tr.append("<td>" + Bookarr[i].numPages + "</td>");
        tr.append("<td>" + d + "</td>");
        tr.append("<td>" + Bookarr[i].catagory + "</td>");
        tr.append("<td><a href='javascript: void (0)' class='bookremove' id=RM" + x + ">Remove</a></td>");
        tr.append("<td><a href='javascript: void (0)' class='bookremove' id=ED" + x + ">Edit</a></td>");
        $('table').first().append(tr);
        count++;
    }
    displayBookDetailAjax(Bookarr[0]);
    return count;
}

//fills author listing
function fillAUListing(Authorarr) {
    let i = 0;
    count = 0;
    //check if storage has value
    //clear table
    $("#tblAUList").find("tr:not(:first)").remove();

    var tr;
    let x = "";
    for (let i = 0; i < Authorarr.length; i++) {
        tr = $('<tr/>');
        tr.append("<td>" + Authorarr[i] + "</td>");
        console.log(Authorarr[i])
        $("#tblAUList").append(tr);
        count++;
    }
    return count;
}

//fills detail card from selected book
function displayBookDetailbyCallNum(callNum) {
    let BookArr = [];
    BookArr = window.Library2().getBookList("callnum", callNum, "", false)

    if (BookArr.length > 0) {
        $('#cbBookImg').attr('src', decodeURI(BookArr[0].bookcover));
        document.getElementById("cardtitle").innerHTML = BookArr[0].details.title;
        document.getElementById("cardAuthor").innerHTML = "Written by: " + BookArr[0].details.author;
    }
    return BookArr.length;
}

function displayBookDetailAjax(BookArr) {
    $('#cbBookImg').attr('src', BookArr.cover);
    document.getElementById("cardtitle").innerHTML = BookArr.title;
    document.getElementById("cardAuthor").innerHTML = "Written by: " + BookArr.author;
    document.getElementById("cardPlot").innerHTML = BookArr.plot;
    return true;
}

//contols the edit book details form
function displayEditBookDetailbyCallNum(callNum) {
    displayListing("editcard");
    if (callNum.startsWith("ED")) {
        callNum = callNum.substr(2);
    }
    let BookArr = [];
    BookArr = window.Library2().getBookList("callnum", callNum, "", false)
    clearEditForm();
    if (BookArr.length > 0) {
        //console.log(BookArr[0].details.publishDate);
        let date = new Date();
        date = BookArr[0].details.publishDate;
        $('#hfCallNum').val(callNum);
        $('#hfBKcover').val(BookArr[0].bookcover);
        $('#txtedTitle').val(BookArr[0].details.title);
        $('#txtedAuthor').val(BookArr[0].details.author);
        $('#txtedPageNum').val(BookArr[0].details.numberOfPages);
        $('#txtedPubDate').val(BookArr[0].details.publishDateate);
        console.log(date);
        $("#dledCategory").val(BookArr[0].catagory);
    }
    return true;
}

//collects info from edit book details form, resets or cancels form and submits changed info to library function for update. Reloads display with any changes.
function EditBookDetailbyCallNum(callNum) {
    let ncallNum = $('#hfCallNum').val();
    let ntitle = $('#txtedTitle').val();
    let nauthor = $('#txtedAuthor').val();
    let nnumPage = $('#txtedPageNum').val();
    let npub = $('#txtedPubDate').val();
    let ncat = $("#dledCategory").val();
    if (window.Library2().removeBookbyCallNum(ncallNum, false)) {
        let nBook = new Book({ title: ntitle, author: nauthor, numberOfPages: nnumPage, publishDate: npub }, ncallNum, ncat, nbkCover);
        window.Library2().addBook(nBook, true);
        window.Library2().saveLibrary();
        clearEditForm();
        LoadBookList();
    }
    return true;
}

function CancelEditBookDetailbyCallNum(callNum) {
    displayListing("book");
    clearEditForm();
    return true;
}

function clearEditForm() {
    $('#hfCallNum').val('');
    $('#hfBKcover').val('');
    $('#txtedTitle').val('');
    $('#txtedAuthor').val('');
    $('#txtedPageNum').val('');
    $('#txtedPubDate').val('');
}
function flip() {
    $('.card').toggleClass('flipped');
}

function validateBookEntry() {
    return true;
}

function loadLibrary() {
    //opens book listing and details card hides author listing
    displayListing("book");

    //tests to see if object has been created
    var key = window.Library2().storagekey;
    //base object has not been created
    //debugger;
    if (key === "null") {
        //creates library object
        var gLib = new Library2("gLib");
        gLib.fillLib();
        gLib.saveLibrary();
        LoadBookList();
        return true;
    } else {
        LoadBookList();
        return true;
    }
}

function CleanLoad() {
    if ($('#libHeading').length > 0) {
        let gLib = new Library2("gLib");
        $("#tblBKList").hide();
        $("#cdBookInfo").hide();
        $("#tblAUList").hide();
        $("#editCard").hide();
        document.getElementById("libHeading").innerHTML = "No books were found in your current library..."
    }
}

function SearchLibrary() {
    let sText = document.getElementById("txtSearch").value;
    let Bookarr = [];
    let Temparr = [];
    if (cbTitle.checked) {
        Temparr = this.Library2().getBooksByTitle(sText, false);
        if (Bookarr.length == 0) {
            Bookarr = Temparr;
        } else {
            Bookarr = removeDuplicatesFromBookListings(Bookarr, Temparr)
        }
    }
    if (cbAuthor.checked) {
        Temparr = this.Library2().getBooksByAuthor(sText, false);
        if (Bookarr.length == 0) {
            Bookarr = Temparr;
        } else {
            Bookarr = removeDuplicatesFromBookListings(Bookarr, Temparr)
        }
    }
    if (cbTitleAuthor.checked) {
        Temparr = this.Library2().getBooksByTitleAuthor(sText, false);
        if (Bookarr.length == 0) {
            Bookarr = Temparr;
        } else {
            Bookarr = removeDuplicatesFromBookListings(Bookarr, Temparr)
        }
    }
    fillListing(Bookarr);
    return true;
}

function removeDuplicatesFromBookListings(array1, array2) {
    return array1 = array1.filter(val => !array2.includes(val));
}

//author listing element
function showAuthorListing() {
    //opens book listing and details card hides author listing
    displayListing("author");
    let Authorarr = this.Library2().getAuthors();
    fillAUListing(Authorarr);
    return true;
}

function deleteFromLibrary(bookid) {
    this.Library2().removeBookbyCallNum(bookid);
    this.Library2().saveLibrary();
    LoadBookList();
    return true;
}

//automatically creates a callnumber for Library use. testing case only.
function generateCallNum() {
    return Math.floor((Math.random() * 1000) + 1);
}

//---------------------------------------------------JQUERY ELEMENTS---------------------------------------------------------------
$(function () {
    //Global event handlers 

    //Jumbotron buttons
    //This button will create a default library, fill it with books and then save those books to browser storage.
    $("#creatLibrary").on("click", function () {
        //alert("button fired!");
        var gLib = new Library2("gLib");
        gLib.fillLib();
        gLib.saveLibrary();
        loadLibrary();
    });

    $("#loadLibrary").on("click", function () {
        loadLibrary();
    });

    //Admininstration Navigation buttons
    $("#Home").on("click", function () {
        loadLibrary();
    });

    $("#getAuthors").on("click", function () {
        showAuthorListing();
    });

    $('#removeAuthors').on('show.bs.modal', function (e) {
        $("#txtremoveallauthors").val('');
    });
    $('#removeAuthors').on('shown.bs.modal', function (e) {
        $('#txtremoveallauthors').focus();
    });
    $("#btnRemoveAllAuthor").on("click", function () {
        var text = document.getElementById("txtremoveallauthors").value;
        removeAuthors(text);
    });

    $("#btnAddBook").on("click", function () {
        //formAddBooks();
        formAddBooksAjax();
    });

    $("#getRandom").on("click", function () {
        window.Library2().displayRandomBook();
    });

    //Search Form Controls
    //checkbox group
    $("#cbAll").on("click", function () {
        cbTitle.checked = false;
        cbAuthor.checked = false;
        cbTitleAuthor.checked = false;
    });
    $("#cbTitleAuthor").on("click", function () {
        cbTitle.checked = false;
        cbAuthor.checked = false;
        cbAll.checked = false;
    });
    $("#cbTitle").on("click", function () {
        cbAll.checked = false;
        cbTitleAuthor.checked = false;
    });
    $("#cbAuthor").on("click", function () {
        cbAll.checked = false;
        cbTitleAuthor.checked = false;
    });

    //Search button img
    $("#searchLib").on("click", function () {
        //$("cdBookInfo").toggle();
        if ($('#searchLib').length) {
            SearchLibrary();
        }
    });

    //Table Events
    //captures the click event of dynamic link button created in tables
    $("#tblBKList").on("click", function (e) {
        var bookid = $(e.target).attr("id");
        if (bookid.startsWith("RM")) {
            deleteFromLibrary(bookid);
        } else if (bookid.startsWith("ED")) {
            displayEditBookDetailbyCallNum(bookid);
        } else {
            displayBookDetailbyCallNum(bookid);
        }
    });

    //Library Sort events
    $("#sortATitle").on("click", function () {
        window.Library().sortLibraryList("title", false)
    });
    $("#sortDTitle").on("click", function () {
        window.Library().sortLibraryList("title", true)
    });
    $("#sortAAuthor").on("click", function () {
        window.Library().sortLibraryList("author", false)
    });
    $("#sortDAuthor").on("click", function () {
        window.Library().sortLibraryList("author", true)
    });
    $("#sortAPage").on("click", function () {
        window.Library().sortLibraryList("page", false)
    });
    $("#sortDPage").on("click", function () {
        window.Library().sortLibraryList("page", true)
    });
    $("#sortAPub").on("click", function () {
        window.Library().sortLibraryList("pub", false)
    });
    $("#sortDPub").on("click", function () {
        window.Library().sortLibraryList("pub", true)
    });

    //Edit card save button
    $("#editBook").on("click", function () {
        EditBookDetailbyCallNum();
    });
    $("#editBookCancel").on("click", function () {
        CancelEditBookDetailbyCallNum();
    });


});


//Book Instances that contains the properties of each book object.
var gBL = new Book({ title: "Bool", author: "Jason West", numberOfPages: 250, publishDate: "2/2/1888" }, 147, "Western");
var gIT = new Book({ title: "IT", author: "Stephen King", numberOfPages: 1138, publishDate: "9/15/1986" }, 524, "Horror", "IT_old.jpg");
var gIT2 = new Book({ title: "It: A Novel", author: "Stephen King", numberOfPages: 1168, publishDate: "1/5/2016" }, 534, "Horror", "IT_new.jpg");
var gGM = new Book({ title: "The Green Mile", author: "Stephen King", numberOfPages: 1200, publishDate: "8/29/1996" }, 516, "Horror", "SK_GreenMile.jpg");
var gGMM = new Book({ title: "The Green Mile", author: "Scott Talbane", numberOfPages: 410, publishDate: "10/7/1998" }, 710, "Drama", "ST_GreenMile.jpg");
var gCatherInTheRye = new Book({ title: "Catcher In The Rye", author: "JD Salinger", numberOfPages: 200, publishDate: "12/25/1987" }, 734, "Drama", "JD_CITR.jpg");
var gNP = new Book({ title: "New Power", author: "Jeremy Heimans", numberOfPages: 873, publishDate: "4/12/2019" }, 310, "Thriller", "JH_NewPower.jpg");
var gTTC = new Book({ title: "The Follower", author: "Rick Fuller King", numberOfPages: 1250, publishDate: "5/17/2000" }, 756, "Drama", "RF_Follower.jpg");
var gPOW = new Book({ title: "War of Ewwww!", author: "Mary U'Banks", numberOfPages: 210, publishDate: "6/7/1999" }, 888, "Comedy", "jBook.jpg");
var gQOS = new Book({ title: "Kill the Mockingbird", author: "Marko Wines", numberOfPages: 1750, publishDate: "4/12/2014" }, 790, "Drama", "TKMMB1.jpg");
var gQOW = new Book({ title: "Kill the Other Mockingbird", author: "Marko Wines", numberOfPages: 1100, publishDate: "4/12/2016" }, 791, "Drama", "TKMMB2.jpg");
var gQOT = new Book({ title: "Kill the Blue Mockingbird Cause It Dont Like ME!", author: "Marko Wines", numberOfPages: 1650, publishDate: "4/12/2018" }, 792, "Drama", "TKMMB3.jpg");


//-------------------------------------Devloper QA Testing Functions Only---------------------------------------------------------------
//resets Library and clears local and session storage
function resetTotalLibrary(vLibrary, createNew = true, newKey = "LibraryKey") {
    try {

        localStorage.removeItem(vLibrary.storagekey);
        localStorage.removeItem("libStorageAvilible");
        localStorage.removeItem("searchResults");
        sessionStorage.removeItem(vLibrary.storagekey);
        sessionStorage.removeItem("libStorageAvilible");
        sessionStorage.removeItem("searchResults");
        vLibrary.Books.length = 0;
        if (createNew) { vLibrary = new Library(newKey); };

        return true;
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
}

//testing auto loads Library
initialize();
setTimeout(function () {
    $('#msgdiv').fadeOut('fast');
    $('#msg').val('');
}, 30000); // <-- time in milliseconds