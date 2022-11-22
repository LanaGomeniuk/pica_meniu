const form = document.querySelector(".form");
const container = document.querySelector(".pizza-container");
const list = document.querySelector(".pizza-list");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");

addBtn.addEventListener("click", addPizza);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

function addPizza(e) {
  e.preventDefault();
  const pica = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const toppings = document
    .getElementById("toppings")
    .value.split(" ")
    .join(", ");
  const img = document.querySelector(".pizza-img").src;
  const id = new Date().getTime().toString();

  if ((img, pica, price, toppings)) {
    createListItem(id, img, pica, price, toppings);
    container.classList.add("show-container");
    addToSessionlStorage(id, img, pica, price, toppings);
    form.reset();
  }
}

// ==============================
function clearItems() {
  const items = document.querySelectorAll(".single-pizza");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
    container.classList.remove("show-container");
    sessionStorage.removeItem("list");
  }
}

// ==========================
function removeFromSessionStorage(id) {
  let items = getSessionStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  sessionStorage.setItem("list", JSON.stringify(items));
}

// ==================
function addToSessionlStorage(id, img, pica, price, toppings) {
  const pizza = {
    id: id,
    img: img,
    pica: pica,
    price: price,
    toppings: toppings,
  };
  let items = getSessionStorage();
  items.push(pizza);
  sessionStorage.setItem("list", JSON.stringify(items));
}

function getSessionStorage() {
  return sessionStorage.getItem("list")
    ? JSON.parse(sessionStorage.getItem("list"))
    : [];
}

// ===========
function setupItems() {
  let items = getSessionStorage();
  console.log(items);
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.img, item.pica, item.price, item.toppings);
    });
    container.classList.add("show-container");
  }
}

// delete item from the list
function deleteItem(e) {
  const confirmation = confirm("Pica will be deleted!");
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  if (confirmation) {
    list.removeChild(element);
    if (list.children.length === 0) {
      container.classList.remove("show-container");
    }
    removeFromSessionStorage(id);
  }
}

function createListItem(id, img, pica, price, toppings) {
  const element = document.createElement("article");
  element.classList.add("single-pizza");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = ` <img
              class="single-img"
              src="${img}"
              alt="picture of pizza"
            />
            <div class="pizza-info">
              <h2 class="pizza-name">${pica}</h2>
              <p><span>Price:</span> ${price} Eur</p>
              <h4>Toppings:</h4>
              <p class="pizza-toppings">${toppings}</p>
              <button type="button" class="delete-btn btn">delete</button>`;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  // append child
  list.appendChild(element);
}
