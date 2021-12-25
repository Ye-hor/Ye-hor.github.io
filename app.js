let myGrocery = [];
let ulElement = document.getElementById("ul-element");
const inputElement = document.getElementById("input-element");
const submitButton = document.getElementById("submit-button");
const clearButton = document.getElementById("clear");
const groceryFromLocalStorage = localStorage.getItem("myGrocery");

if (groceryFromLocalStorage) {
  const parse = JSON.parse(groceryFromLocalStorage);
  myGrocery = Object.values(parse);
  ulCreator(myGrocery);
}

submitButton.addEventListener("click", () => {
  myGrocery.push({
    value: inputElement.value,
    isDone: false,
  });
  inputElement.value = "";

  const groceryObject = {};
  myGrocery.forEach((item, index) => {
    groceryObject[index] = item;
  });

  localStorage.setItem("myGrocery", JSON.stringify(groceryObject));
  ulCreator(myGrocery);
});

clearButton.addEventListener("click", () => {
  localStorage.clear("myGrocery", myGrocery);
  myGrocery = [];
  ulCreator(myGrocery);
});
 
const doneBtn = (index) => {
  myGrocery[index].isDone = !myGrocery[index].isDone;
  const groceryObject = {};
  myGrocery.forEach((item, index) => {
    groceryObject[index] = item;
  });
  localStorage.setItem("myGrocery", JSON.stringify(groceryObject));
  ulCreator(myGrocery);
};

const deleteBtn = (index) => {
  myGrocery.splice(index, 1);
  const groceryObject = {};
  myGrocery.forEach((item, index) => {
    groceryObject[index] = item;
  });
  localStorage.setItem("myGrocery", JSON.stringify(groceryObject));
  ulCreator(myGrocery);
};

function ulCreator(grocery) {
  let listItems = "";
  for (let i = 0; i < grocery.length; i++) {
    const aClassNames = grocery[i].isDone ? "done-decoration" : "";
    listItems += `
    <li id='li-${i}'>
    <a class="name ${aClassNames}" id="name-${i}">
    ${grocery[i].value}
    </a>
    <button class='li-button done' id='done-${i}' onclick="doneBtn(${i})"> done </button>
    <button class='li-button delete' id='delete-${i}' onclick="deleteBtn(${i})"> delete </button>
    </li>
    `;
  }
  ulElement.innerHTML = listItems;
}
