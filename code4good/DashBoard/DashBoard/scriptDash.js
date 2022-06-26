const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");

one.onclick = function () {
  one.classList.add("active");
  two.classList.remove("active");
  three.classList.remove("active");
  four.classList.remove("active");
  five.classList.remove("active");
  six.classList.remove("active");
  seven.classList.remove("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};

two.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.remove("active");
  four.classList.remove("active");
  five.classList.remove("active");
  six.classList.remove("active");
  seven.classList.remove("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};
three.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.remove("active");
  five.classList.remove("active");
  six.classList.remove("active");
  seven.classList.remove("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};
four.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.remove("active");
  six.classList.remove("active");
  seven.classList.remove("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};
five.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.add("active");
  six.classList.remove("active");
  seven.classList.remove("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};
six.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.add("active");
  six.classList.add("active");
  seven.classList.remove("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};
seven.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.add("active");
  six.classList.add("active");
  seven.classList.add("active");
  eight.classList.remove("active");
  nine.classList.remove("active");
};
eight.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.add("active");
  six.classList.add("active");
  seven.classList.add("active");
  eight.classList.add("active");
  nine.classList.remove("active");
};
nine.onclick = function () {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.add("active");
  five.classList.add("active");
  six.classList.add("active");
  seven.classList.add("active");
  eight.classList.add("active");
  nine.classList.add("active");
};
