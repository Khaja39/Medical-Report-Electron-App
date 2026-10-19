const good = "Anshu";
// console.log("The good wont be printed", good);
// add (22, 416);
// console.log(add(22, 416));
const n = Math.random()
console.log(n);
const x = n*100;
console.log(x);
const y = x + 1;
console.log(Math.floor(y));
console.log(Math.ceil(y));
console.log(Math.random());

function add (cc,dhruva){
    const answer = cc + dhruva;
    console.log("The value of first argument is:",cc,"The value of second argument is",dhruva);
    return answer;
    console.log("this wont be printed");
}

function greet(){
     return console.log("Hello");
}
greet();
console.log("The hello is:",greet());