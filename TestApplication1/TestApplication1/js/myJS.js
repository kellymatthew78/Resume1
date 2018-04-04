

function Person(firstName, lastName, birthMonth, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthMonth = birthMonth;
    this.age = age;
}

var gRob = new Person("Robert", "Murphey", "May", 37);
gRob.fLibation = "Beer";

//function fullName(Person) { return Person.firstName + " " + Person.lastName }
Person.prototype.fullName = function () { return this.firstName + " " + this.lastName}

function runJS() {

    var person2 = { firstName: "Matthew", lastName: "Kelly", birthMonth: "May", fLibation: "Grey Goose" };
    var txt = person2.firstName + " was born in the month of " + person2.birthMonth + ". " + person2.lastName + " loves to drink " + person2.fLibation + ".";
    document.getElementById("demo").innerHTML = txt;
    addData();


}

function addData() {

    document.getElementById("Name").innerHTML = grob.fullName;
    document.getElementById("bMonth").innerHTML = gRob.birthMonth;
    document.getElementById("fDrink").innerHTML = gRob.fLibation;
    document.getElementById("age").innerHTML = gRob.age;
    console.log(gRob);
}

