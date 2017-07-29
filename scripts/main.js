// This file can't run in Firefox. Please try it in Chrome.

var text_input = ""; // Equality used to calculate

/*
 * Function: deleteContent()
 * Usage: deleteContent();
 * -----------------------
 * Delet input box & output box.
 */ 

function deleteContent() {
    input.innerText = "0"; 
    output.innerText = "0";
    text_input = "";
}

/* 
 * Function: isNumber(str)
 * Usage: if (isNumber(temp)) {}
 * -----------------------------
 * Check if the numbers in content is wrong.
 */ 

function isNumber(str) {
    if (str[0] == "." || str[str.length - 1] == ".") return false;
    var n = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == ".") n++;
    }
    if (n > 1) return false;
    return true;
}

/*
 * Function: getToken()
 * Usage: var t = getToken();
 * --------------------------
 * Remove fisrt member of content & get it.
 */

function getToken(content) {
    if (content.length == 0) return "";
    var temp = content[0];
    if (temp == "+" || temp == "-" || temp == "*" || temp == "/" || temp == "(" || temp == ")") {
        var a = content.shift();
        return a;
    }
    else if (isNumber(temp)) {
        var a = content.shift();
        return a;
    }
    else {
        throw "Something is wrong";
    }
}

/*
 * Function: putToken(t)
 * Usage: putToken(t);
 * --------------------
 * Put t back to content.
 */

function putToken(t, content) {
    content.unshift(t);
}

/*
 * Function: prime()
 * Usage: prime();
 * ---------------
 * Get the prime value.
 */

function prime(content) {
    var t = getToken(content);
    if (t == "(") {
        var d = expression(content);
        t = getToken(content);
        if (t != ")") throw "No \")\" in equality";
        return d;
    }
    else if (!isNaN(t)) {
        return parseFloat(t);
    }
    else {
        throw "Something is wrong";
    }
}

/*
 * Function: term(content)
 * Usage: term(content);
 * --------------
 * Get the term value.
 */

function term(content) {
    var left = prime(content);
    var t = getToken(content);
    while (true) {
        if (t == "*") {
            left *= prime(content);
            t = getToken(content);
        }
        else if (t == "/") {
            var temp = prime(content);
            if (temp == 0) throw "Divided by 0";
            left /= temp;
            t = getToken(content);
        }
        else {
            putToken(t, content);
            return left;
        }
    }
}

/*
 * Function: expression(content)
 * Usage: expression(content);
 * --------------------
 * Get the expression value.
 */

function expression(content) {
    var left = term(content);
    // alert("exp-left: " + left);
    var t = getToken(content);
    while (true) {
        if (t == "+") {
            left += term(content);
            t = getToken(content);
        }
        else if (t == "-") {
            left -= term(content);
            t = getToken(content);
        }
        else {
            putToken(t, content);
            return left;
        }
    }
}

/*
 * Function: rightContent()
 * Usage: rightContent();
 * ----------------------
 * Check things about ( & ).
 */

function rightContent(content) {
    var count_1 = 0;
    var count_2 = 0;
    for (var i = 0; i < content.length; i++) {
        if (content[i] == "(") count_1++;
        if (content[i] == ")") count_2++;
        if (i - 1 >= 0) {
            if ((content[i] == ")" && content[i - 1] == "(") || 
                (content[i] == "(" && content[i - 1] == ")")) {
                throw "Something is wrong";
            } 
        }
    }
    if (count_1 != count_2) throw "Something is wrong";
}


/*
 * Function: splitInput()
 * Usage: splitInput();
 * --------------------
 * Get content.
 */
function splitInput(equality) {
    var result = new Array;
    var n = "";
    for (var i = 0; i < text_input.length; i++) {
        console.log(text_input[i]);
        if (text_input[i] == "+" || text_input[i] == "-" || text_input[i] == "*"
        || text_input[i] == "/" || text_input[i] == "(" || text_input[i] == ")") {
            if (n != "") result.push(n);
            n = "";
            result.push(text_input[i]);
        }
        else if (text_input[i] == "." || !isNaN(text_input[i])) {
            n += text_input[i];
        }
        else {
            throw "Something is wrong";
        }
        if (i == text_input.length - 1 && n != "") result.push(n);
    }
    return result;
}

/*
 * Function: calculate(equality)
 * Usage: calculate(equality);
 * -------------------
 * Calculate the equality.
 */

function calculate(equality) {
    try {
        var content = splitInput(equality);
        rightContent(content);
        var cal = expression(content);
        if (String(cal) == "NaN") {
            alert("Error: Something is wrong.");
            deleteContent();
            return;
        }
    }
    catch (err) {
        alert("Error: " + err + ".");
        deleteContent();
        return;
    }
    output.innerText = cal;
}

/*
 * Function: addContent()
 * Usage: onclick = addContent();
 * ------------------------------
 * Response for click event. Main operator of the calculator.
 */

function addContent() {
    var a = window.event;
    var temp = a.srcElement.innerText;
    if (temp == "=") {
        var equality = text_input;
        calculate(equality);
    }
    else if (temp == "del") {
        deleteContent();
    }
    else {
        text_input += temp;
        input.innerText = text_input;
    }
}