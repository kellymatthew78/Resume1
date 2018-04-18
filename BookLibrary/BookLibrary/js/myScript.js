// JavaScript source code
var storageAvilible = false;
var storageType = "sessionStorage";
//var storageType = "localStorage";
//var storageType = "None";


//Singleton library object
var Library;
(function () {
    var libraryinstance;

    Library = function Library(storagekey) {
        if (libraryinstance) {
            return libraryinstance;
        }

        libraryinstance = this;

        // all the functionality
        this.Books = [];
        this.storagekey = storagekey;

        return libraryinstance;
    };
}());

//Normal library object
//var Library = function (storagekey) {
//    this.Books = [];
//    this.storagekey = storagekey;

//};

//Book object constructor
var Book = function (details, callNum, catagory = "") {
    this.details = details;
    this.callNum = callNum;
    this.catagory = catagory;

}

//this will check to see if Book title by an author exists in Library. If not will add it. This function sets a message. because it is used by other functions and may be repeated the repeat var is used so the message is not set if used by another function.
Library.prototype.addBook = function (Book, repeat = false) {
    try {
        //console.log(Book.details.title)
        if (Book.details === "undefined") { return false; };
        var index = this.getIndex("titleAuthor", Book.details.title.toLowerCase(), Book.details.author.toLowerCase())
        if (index < 0) {
            this.Books.push(Book);

            if (repeat == false) {
                document.getElementById("msg").innerHTML = Book.details.title + " has been added to the Library.";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return true;
        }
        else {
            if (repeat == false) {
                document.getElementById("msg").innerHTML = Book.details.title + " is already in the Library.";
                document.getElementById("msg").setAttribute("class", "msgclass");
            }
            return false;
        }
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
};

//this will check to see if Book title and author exists in Library as comparied to an array of Book objects. Only if the Book was not found will it be added. 
Library.prototype.addBookArray = function (BookArray) {
    try {
        var imp_title, imp_author, index, success;
        var i = 0;
        var Booksadded = 0;
        for (i; i < BookArray.length; i++) {
            imp_title = BookArray[i].details.title;
            imp_author = BookArray[i].details.title;
            //if ((this.Books.indexOf(imp_title) === -1)) {
            //    this.Books.push(BookArray[i]);
            //    Booksadded = Booksadded + 1;
            //}
            if (this.addBook(BookArray[i], true) == true) {
                Booksadded = Booksadded + 1;
            }
        }
        document.getElementById("msg").innerHTML = Booksadded + ": Book(s) have been added to your Library.";
        document.getElementById("msg").setAttribute("class", "msgclass");
        return Booksadded;
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
};

//this will remove a Book from the Library by its title.
Library.prototype.removeBookbyTitle = function (title) {
    try {
        var index = this.getIndex("title", title.toLowerCase())
        //console.log(index)
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
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
};

//this will remove all Books from the Library by an author.
Library.prototype.removeBookbyAuthor = function (author) {
    try {
        var index = this.getIndex("author", author.toLowerCase());
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
            index = this.getIndex("author", author.toLowerCase());
        }
        document.getElementById("msg").innerHTML = count + " book(s) was removed from the Library.";
        document.getElementById("msg").setAttribute("class", "msgclass");
        return true;
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }

};

//this will remove a Book from the Library by its author and title.
Library.prototype.removeBookbyTitleAndAuthor = function (title, author) {
    try {
        var index = this.getIndex("titleAuthor", title.toLowerCase(), author.toLowerCase())
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
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
};

//this will retrive a random Book from the Library.
Library.prototype.random = function () {
    var ranBook = this.Books[Math.floor((Math.random() * this.Books.length))];
    document.getElementById("msg").innerHTML = "We have selected " + ranBook.details.title + " for you.";
    document.getElementById("msg").setAttribute("class", "msgclass");
    return ranBook;
}

//this will retrive a collection of Books from the Library by title.
Library.prototype.getBooksByTitle = function (title) {
    try {
        var i = 0;
        var Booklist = [];
        var count = 0;
        for (i; i < this.Books.length; i++) {
            var bktitle = this.Books[i].details.title.toLowerCase();
            //console.log(title.indexOf(item.toLowerCase()));
            if (bktitle.indexOf(title.toLowerCase()) !== -1) {
                Booklist.push(this.Books[i]);
                count++;
            }
        }
        document.getElementById("msg").innerHTML = "We have found " + count + " Book(s) with the title of: " + uppercase(title);
        document.getElementById("msg").setAttribute("class", "msgclass");
        return Booklist;
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
};

//this will retrive a collection of Books from the Library by author.
Library.prototype.getBooksByAuthor = function (author) {
    var i = 0;
    var Booklist = [];
    var count = 0;
    for (i; i < this.Books.length; i++) {
        var bkauthor = this.Books[i].details.author.toLowerCase();
        //console.log(author.indexOf(item.toLowerCase()));
        if (bkauthor.indexOf(author.toLowerCase()) !== -1) {
            Booklist.push(this.Books[i]);
            count++;
        }
    }
    document.getElementById("msg").innerHTML = "We have found " + count + " book(s) by the author: " + uppercase(author);
    document.getElementById("msg").setAttribute("class", "msgclass");
    return Booklist;
};

//this will retrive a collection of authors from the Library.
Library.prototype.getAuthors = function () {
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
Library.prototype.getRandomAuthors = function () {
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

//this is a master search function that will return the index or length of the Library based on the type of search you are performing and the item(s) you are searching for.
Library.prototype.getIndex = function (type, item = "", item2 = "") {
    var index = -1;
    var i = 0;
    if (this.Books.length != 0) {
        //console.log("function search is: " + type);
        switch (type) {
            case "length":
                index = this.Books.length;
                break;

            case "title":
                for (i; i < this.Books.length; i++) {
                    if (this.Books[i].details.title.toLowerCase() == item) {
                        index = i;
                        break;
                    }
                }
                break;

            case "author":
                //console.log("case author is running");
                for (i; i < this.Books.length; i++) {
                    //console.log(this.Books[i].details.author.toLowerCase() +"/" + item)
                    if (this.Books[i].details.author.toLowerCase() == item) {
                        index = i;
                        break;
                    }
                }
                break;

            case "titleAuthor":
                //console.log("case author is running");
                for (i; i < this.Books.length; i++) {
                    //console.log(this.Books[i].details.author + " / " + item);
                    if ((this.Books[i].details.title.toLowerCase() == item) && (this.Books[i].details.author.toLowerCase() == item2)) {
                        index = i;
                        break;
                    }
                }
                break;
            default:
                break;
        }
        return index;
    } else {
        return index;
    }
};

//this is a master search function that will return array of objects from the Library based on the type of search you are performing and the item(s) you are searching for.
Library.prototype.getBookList = function (key, value, value2 = "") {
    try {
        var i = 0;
        var Booklist = [];
        var count = 0;
        document.getElementById("msg").setAttribute("class", "msgclass");
        if (this.Books.length != 0) {
            //console.log("function search is: " + type);

            switch (key) {

                case "titlePart":
                    //var compare = "";
                    //for (i; i < this.Books.length; i++) {
                    //    compare = this.Books[i].details.title.toLowerCase();
                    //    console.log(compare + "/" + item.toLowerCase());
                    //    if (compare.includes(item.toLowerCase())) {
                    //        //if (this.Books[i].details.title.toLowerCase().includes(item.toLowerCase())) {
                    //        Booklist.push(this.Books[i]);
                    //    }
                    //}
                    break;
                case "authorandtitle":
                    return this.getSVBookList("authortitle", value, value2)
                    break;
                case "titleandauthor":
                    return this.getSVBookList("authortitle", value, value2)
                    break;
                case "lessthanpages":
                    for (i; i < this.Books.length; i++) {
                        if (this.Books[i].details.numberOfPages < value) {
                            Booklist.push(this.Books[i]);
                            count++;
                        }
                    }
                    break;
                case "morethanpages":
                    for (i; i < this.Books.length; i++) {
                        if (this.Books[i].details.numberOfPages > value) {
                            Booklist.push(this.Books[i]);
                            count++;
                        }
                    }
                    break;

                case "beforeDate":
                    for (i; i < this.Books.length; i++) {
                        if (this.Books[i].details.publishDate < value) {
                            Booklist.push(this.Books[i]);
                            count++;
                        }
                    }
                    break;

                case "afterDate":
                    for (i; i < this.Books.length; i++) {
                        if (this.Books[i].details.publishDate > value) {
                            Booklist.push(this.Books[i]);
                            count++;
                        }
                    }
                    break;

                case "callnum":
                    for (i; i < this.Books.length; i++) {
                        if (this.Books[i].callNum <= value) {
                            Booklist.push(this.Books[i]);
                            count++;
                        }
                    }
                    break;
                default:
                    return this.getSVBookList(key, value)
            }

            document.getElementById("msg").innerHTML = "Searching by " + uppercase(key) + " found " + count + " Book(s) in this Library.";
            return Booklist;

        } else {
            return Booklist;
        }
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }

};

Library.prototype.getSVBookList = function (key, value, value2 = "none") {
    try {
        var i = 0;
        var Booklist = [];
        var count = 0;
        var search = "";
        document.getElementById("msg").setAttribute("class", "msgclass");
        if (key = "authortitle") {
            for (i = 0; i < this.Books.length; i++) {
                if ((this.Books[i].details.title.toLowerCase() == value) && (this.Books[i].details.author.toLowerCase() == value2)) {
                    Booklist.push(this.Books[i]);
                    count++;
                }
            }
        } else {
            for (i = 0; i < this.Books.length; i++) {
                search = this.Books[i].details[key].toLowerCase();
                if (search.indexOf(value.toLowerCase()) !== -1) {
                    Booklist.push(this.Books[i]);
                    count++;
                }
            }
        }

        document.getElementById("msg").innerHTML = "Searching by " + uppercase(key) + " found " + count + " Book(s) in this Library.";
        return Booklist;
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
}

//this function will check 1 time if client storage is availible. if so a global var is set that will be used for concurrent checks. It then will be able to use either local or session storage based on a value set. These setting will also be saved. creates an alert if storage is not usable.
Library.prototype.saveLibrary = function () {
    try {
        if (storageAvilible == true) {
            if (storageType == 'localStorage') {
                localStorage.setItem(this.storagekey, JSON.stringify(this.Books));
                return localStorage.hasOwnProperty(this.storagekey);
            } else if (storageType == 'sessionStorage') {
                sessionStorage.setItem(this.storagekey, JSON.stringify(this.Books));
                return sessionStorage.hasOwnProperty(this.storagekey);
            }
        } else {
            if (storageAvailable(storageType)) {
                if (storageType == 'localStorage') {
                    localStorage.setItem(this.storagekey, JSON.stringify(this.Books));
                    return localStorage.hasOwnProperty(this.storagekey);
                } else if (storageType == 'sessionStorage') {
                    sessionStorage.setItem(this.storagekey, JSON.stringify(this.Books));
                    return sessionStorage.hasOwnProperty(this.storagekey);
                }
            }
            else {
                document.getElementById("msg").innerHTML = "Window storage is not avilible!";
                document.getElementById("msg").setAttribute("class", "errclass");
                return false;
            }

        }

    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
}

//updates Library from local or session storage
Library.prototype.updateLibraryfromStorage = function () {
    try {
        var text = "";
        var Bookarr = [];
        var i = 0;

        if (storageType == 'localStorage') {
            text = localStorage.getItem(this.storagekey);
        } else if (storageType == 'sessionStorage') {
            text = sessionStorage.getItem(this.storagekey);
        }
        Bookarr = JSON.parse(text);
        return this.addBookArray(Bookarr);
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
}

//removes Library from local or session storage and creates a new object with key if none is suppied.
Library.prototype.removeLibrary = function (LibraryKey = "LibraryKey") {
    localStorage.removeItem(this.storagekey);
    sessionStorage.removeItem(this.storagekey);
    this.Library.Books.length = 0;
    this.Library = new Library(LibraryKey);
}

//clears Library of books
Library.prototype.clearLibrary = function (LibraryKey = "LibraryKey") {
    return this.Books.length = 0;
}

//automatically creates a callnumber for Library use. testing case only.
function generateCallNum() {
    return Math.floor((Math.random() * 1000) + 1);
}

//resets Library and clears local and session storage
function resetTotalLibrary(vLibrary, newKey = "LibraryKey") {
    try {

        localStorage.removeItem(vLibrary.storagekey);
        localStorage.removeItem("libStorageAvilible");
        sessionStorage.removeItem(vLibrary.storagekey);
        sessionStorage.removeItem("libStorageAvilible");
        vLibrary.Books.length = 0;
        vLibrary = new Library(newKey);
        return true;
    }
    catch (e) {
        document.getElementById("msg").innerHTML = e;
        document.getElementById("msg").setAttribute("class", "errclass");
    }
}

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
    var array1 = str.split(' ');
    var newarray1 = [];

    for (var x = 0; x < array1.length; x++) {
        newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    }
    return newarray1.join(' ');
}

function LoadBookList() {
    //alert("Just Testing!!!");
    //check if storage has value
    //clear table
    $("#tblBKList").find("tr:not(:first)").remove();
    var text = "";
    var Bookarr = [];
    var i = 0;

    if (storageType == 'localStorage') {
        text = localStorage.getItem(window.Library().storagekey);
    } else if (storageType == 'sessionStorage') {
        text = sessionStorage.getItem(window.Library().storagekey);
    }
    Bookarr = JSON.parse(text);
    //console.log(Bookarr);
    var tr;
    var x = "";
    for (var i = 0; i < Bookarr.length; i++) {
        x = Bookarr[i].callNum;
        tr = $('<tr/>');
        //<a href='#' id='link'>Click me!</a>
        tr.append("<td><a href='javascript: void (0)' class='bookdetail' id='CN"+ x  + "'>" + x + "</a></td>");
        tr.append("<td>" + Bookarr[i].details.title + "</td>");
        tr.append("<td>" + Bookarr[i].details.author + "</td>");
        tr.append("<td>" + Bookarr[i].details.numberOfPages + "</td>");
        tr.append("<td>" + Bookarr[i].details.publishDate + "</td>");
        tr.append("<td>" + Bookarr[i].catagory + "</td>");
        $('table').first().append(tr);
    }  
}



function displayBookDetailbyCallNum(callNum) {
    var BookArr = window.Library().getBookList("callnum", callNum)
    console.log(BookArr.length);
    console.log(BookArr);
    return BookArr.length; 
}
//for testing. this function will fill the Library
Library.prototype.fillLib = function () {
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


//JQUERY---------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {

    //event handler for load library button

    //This button will create a default library, fill it with books and then save those books to browser storage.
    $("#creatLibrary").on("click", function () {
        //alert("button fired!");
        var gLib = new Library("gLib");
        gLib.fillLib();
        gLib.saveLibrary();
        console.log(gLib);
    });

    $("#loadLibrary").on("click", function () {
        LoadBookList();
    });

   //captures the click event of dynamic link button
    $('#tblBKList').click(function (e) {
        var selected_id = $(e.target).attr("id"); // or e.target.id
        alert(selected_id + "2nd run");
    });

    //$('#bookdetail').on("click", function () {
    //    alert("firing");
    //    var bookid = $(this).prop('id');
    //    console.log(bookid);
    //    //displayBookDetailbyCallNum(bookid);
    //});


});

//Library Instance
//var gLib = new Library("gLib");

//Book Instances that contains the properties of each book object.
var gBL = new Book({ title: "Bool", author: "Jason West", numberOfPages: 250, publishDate: "Feburary 3, 1888" }, generateCallNum(), "Western");
var gIT = new Book({ title: "IT", author: "Stephen King", numberOfPages: 1138, publishDate: "September 15, 1986" }, generateCallNum(), "Horror");
var gIT2 = new Book({ title: "It: A Novel", author: "Stephen King", numberOfPages: 1168, publishDate: "January 5, 2016" }, generateCallNum(), "Horror");
var gGM = new Book({ title: "The Green Mile", author: "Stephen King", numberOfPages: 1200, publishDate: "August 29, 1996" }, generateCallNum(), "Horror");
var gGMM = new Book({ title: "The Green Mile", author: "Scott Talbane", numberOfPages: 410, publishDate: "October 7, 1998" }, generateCallNum(), "Drama");
var gCatherInTheRye = new Book({ title: "Catcher In The Rye", author: "JD Salinger", numberOfPages: 200, publishDate: "December 25, 1987" }, generateCallNum(), "Drama");
var gNP = new Book({ title: "New Power", author: "Jeremy Heimans", numberOfPages: 873, publishDate: "April 12, 2019" }, generateCallNum(), "Thriller");
var gTTC = new Book({ title: "Dan the Follower", author: "Jeremy Heimans", numberOfPages: 1250, publishDate: "May 17, 2000" }, generateCallNum(), "Drama");
var gPOW = new Book({ title: "War of Ewwww!", author: "Mary U'Banks", numberOfPages: 210, publishDate: "June 7, 1999" }, generateCallNum(), "Comedy");
var gQOS = new Book({ title: "Kill the Mockingbird", author: "Marko Wines", numberOfPages: 1750, publishDate: "April 12, 2014" }, generateCallNum(), "Drama");
var gQOW = new Book({ title: "Kill the Other Mockingbird", author: "Marko Wines", numberOfPages: 1100, publishDate: "April 12, 2016" }, generateCallNum(), "Drama");
var gQOT = new Book({ title: "Kill the Blue Mockingbird Cause It Dont Like ME!", author: "Marko Wines", numberOfPages: 1650, publishDate: "April 12, 2018" }, generateCallNum(), "Drama");

//Array collection of Book Instances
var gBookArray1 = [gIT, gGM, gCatherInTheRye];
var gBookArray2 = [gNP, gTTC, gPOW];
var gBookArray3 = [];

//testing auto loads Library
//gLib.fillLib();

//--------------------------------------------------------------------------------------------------------------------------
