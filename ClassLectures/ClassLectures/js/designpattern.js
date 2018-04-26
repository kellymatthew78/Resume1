//Closures------------------------------------------------------------------------------------------------------------------------
var myClosure = (function () {
    var a = 0;
    return function () {
        document.getElementById("closure").innerHTML = a++;
    };
})();

//Immediate Functions----------------------------------------------------------------------------------------------------------------
(function () {
    document.getElementById("immfunct").style.color = "green";
}())

//Module-----------------------------------------------------------------------------------------------------------------------------
var Store = (function () {
    var a, x;
    var _sales = [{ transactionId: '1234', amount: '12.34' }];
    function _privateMethod() {
        return a = "I am a private varible. I can only be accessed from this function from which I lay...";
    };
    var publicMethod = function () {
        return x = "I am a public varible. I can only be accessed from anywhere where i can be seen...";
    };
    // public interface
    return {
        getSales: function () {
            return _sales;
        },
        purchase: publicMethod
    };
})();

function ViewStoreItems() {
    try {
        var x = [];
        x = Store.getSales();
        console.log(Store);
        document.getElementById("modStoreSales").innerHTML = "This line access the 'getSales' function which returns the private sales array. This is used to access a private varible from a public method: transactionId: " + x[0].transactionId + " amount: " + x[0].amount;
        document.getElementById("modStorePublic").innerHTML = Store.purchase;
        document.getElementById("modStorePrivate").innerHTML = Store._privateMethod();
    }
    catch (e) {
        document.getElementById("modStorePrivate").innerHTML = e + " error caused by trying to access a private varible.";
    }
}

//Factory----------------------------------------------------------------------------------------------------------




//Observer and Pub Sub------------------------------------------------------------------------------------------------

