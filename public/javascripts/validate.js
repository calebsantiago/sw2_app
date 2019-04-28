function validate() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var expression = /\w+@\w+\.+[A-Za-z]/;
    if(name === "" || password === "" || email === "") {
        alert("you must complete fields");
        return false;
    }
    else if(!expression.test(email)) {
        alert("email is not valid");
        return false;
    }
}