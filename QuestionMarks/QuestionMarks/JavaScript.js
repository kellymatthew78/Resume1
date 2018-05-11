
function Question(str) {
    let a = -1;
    let b = -1;
    let c = 0;
    console.time("quest");
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            if (c == 3) {
                b = Number(str[i]);
                if (a + b == 10) {
                    console.timeEnd("quest");
                    return true;
                } else {
                    a = b;
                    b = -1;
                    c = 0;
                }
            } else { a = Number(str[i]); }
        }else if (str[i] == "?" && a > 0) {
            c++;
        }
    }
    console.timeEnd("quest");
    return false;
}