// DARK MODE
const elBtn = document.getElementById("btn");

if (localStorage.getItem("mode") === "darkk") {
  document.body.classList.add("darkk");
} else {
  document.body.classList.remove("darkk");
}

elBtn.addEventListener("click", () => {
  if (document.body.classList.contains("darkk")) {
    document.body.classList.remove("darkk");
    localStorage.setItem("mode", "light");
    chanel1.postMessage({ type: "mode", value: "light" });
  } else {
    document.body.classList.add("darkk");
    localStorage.setItem("mode", "darkk");
    chanel1.postMessage({ type: "mode", value: "darkk" });
  }
});

import { cars as defaultCars } from "./data.js";

let cars = JSON.parse(localStorage.getItem("cars")) || [...defaultCars];

const elContainer = document.querySelector(".grid");

function saveToLocalStorage() {
  localStorage.setItem("cars", JSON.stringify(cars));
  chanel1.postMessage({ type: "cars", value: cars });
}

// UI ga chiqarish
function showCars() {
  elContainer.innerHTML = "";
  cars.forEach((car, index) => {
    elContainer.innerHTML += `
      <div class="bg-white shadow-md rounded-xl p-4">
        <h1 class="font-bold text-lg mb-2">${car.name}</h1>
        <p class="text-gray-600">${car.description}</p>
        <p><span class="font-bold">Country:</span> ${car.country}</p>
        <p><span class="font-bold">Turkum:</span> ${car.category}</p>
        <p><span class="font-bold">Rang:</span> <span class="font-bold">${car.color}</span></p>

        <div class="flex gap-2 mt-4">
          <button onclick="deleteCar(${index})" class="bg-yellow-500 text-white px-3 py-1 rounded-lg">🗑</button>
          <button onclick="editCar(${index})" class="bg-fuchsia-500 text-white px-3 py-1 rounded-lg">✏️</button>
          <button onclick="detailCar(${index})" class="bg-sky-500 text-white px-3 py-1 rounded-lg">👨‍💻</button>
        </div>
      </div>
    `;
  });
}
showCars();

// Yangi moshina qoshish
function addCar(car) {
  cars.push(car);
  saveToLocalStorage();
  showCars();
  chanel1.postMessage({ type: "add", value: car });
}

document.getElementById("openAddModal").addEventListener("click", () => {
  document.getElementById("addModal").classList.remove("hidden");
  document.getElementById("addModal").classList.add("flex");
});

document.getElementById("saveAdd").addEventListener("click", () => {
  const newCar = {
    name: document.getElementById("addName").value,
    description: document.getElementById("addDescription").value,
    country: document.getElementById("addCountry").value,
    category: document.getElementById("addCategory").value,
    color: document.getElementById("addColor").value,
  };

  addCar(newCar);
  document.getElementById("addModal").classList.add("hidden");
  document.getElementById("addModal").classList.remove("flex");

  document.getElementById("addName").value = "";
  document.getElementById("addDescription").value = "";
  document.getElementById("addCountry").value = "";
  document.getElementById("addCategory").value = "";
  document.getElementById("addColor").value = "";
});

document.getElementById("cancelAdd").addEventListener("click", () => {
  document.getElementById("addModal").classList.add("hidden");
  document.getElementById("addModal").classList.remove("flex");
});

// OCHIRISH
let deleteIndex = null;

window.deleteCar = function (id) {
  deleteIndex = id;
  document.getElementById("deleteModal").classList.remove("hidden");
};

document.getElementById("confirmDelete").addEventListener("click", () => {
  if (deleteIndex !== null) {
    cars.splice(deleteIndex, 1);
    saveToLocalStorage();
    showCars();
    chanel1.postMessage({ type: "delete", value: deleteIndex });
    deleteIndex = null;
  }
  document.getElementById("deleteModal").classList.add("hidden");
});

document.getElementById("cancelDelete").addEventListener("click", () => {
  deleteIndex = null;
  document.getElementById("deleteModal").classList.add("hidden");
});

// TAHRIRLASH
let editIndex = null;

window.editCar = function (id) {
  editIndex = id;
  const car = cars[id];

  document.getElementById("editName").value = car.name;
  document.getElementById("editDescription").value = car.description;
  document.getElementById("editCountry").value = car.country;
  document.getElementById("editColor").value = car.color;

  document.getElementById("editModal").classList.remove("hidden");
};

document.getElementById("saveEdit").addEventListener("click", () => {
  if (editIndex !== null) {
    cars[editIndex] = {
      ...cars[editIndex],
      name: document.getElementById("editName").value,
      description: document.getElementById("editDescription").value,
      country: document.getElementById("editCountry").value,
      color: document.getElementById("editColor").value,
    };
    saveToLocalStorage();
    showCars();
    chanel1.postMessage({
      type: "edit",
      value: { index: editIndex, car: cars[editIndex] },
    });
    editIndex = null;
  }
  document.getElementById("editModal").classList.add("hidden");
});

document.getElementById("cancelEdit").addEventListener("click", () => {
  editIndex = null;
  document.getElementById("editModal").classList.add("hidden");
});

// MALUMOT
window.detailCar = function (id) {
  const car = cars[id];

  document.getElementById("detailContent").innerHTML = `
    <p><b>Nomi:</b> ${car.name}</p>
    <p><b>Trim:</b> ${car.trim || "-"}</p>
    <p><b>Avlod:</b> ${car.generation || "-"}</p>
    <p><b>Yili:</b> ${car.year || "-"}</p>
    <p><b>Rangi (kod):</b> ${car.color || "-"}</p>
    <p><b>Rangi (nomi):</b> ${car.colorName || "-"}</p>
    <p><b>Kategoriya:</b> ${car.category || "-"}</p>
    <p><b>Eshiklar soni:</b> ${car.doorCount || "-"}</p>
    <p><b>Orindiqlar soni:</b> ${car.seatCount || "-"}</p>
    <p><b>Maksimal tezligi:</b> ${car.maxSpeed || "-"}</p>
    <p><b>Tezlanishi:</b> ${car.acceleration || "-"}</p>
    <p><b>Dvigatel:</b> ${car.engine || "-"}</p>
    <p><b>Ot kuchi:</b> ${car.horsepower || "-"}</p>
    <p><b>Yoqligi turi:</b> ${car.fuelType || "-"}</p>
    <p><b>Yonilgi sarfi (shahar):</b> ${car.fuelConsumption?.city || "-"}</p>
    <p><b>Yonilgi sarfi (trassa):</b> ${car.fuelConsumption?.highway || "-"}</p>
    <p><b>Yonilg‘i sarfi (o‘rtacha):</b> ${
      car.fuelConsumption?.combined || "-"
    }</p>
    <p><b>Ishlab chiqarilgan mamlakat:</b> ${car.country || "-"}</p>
    <p><b>Tavsif:</b> ${car.description || "-"}</p>
  `;

  // Madal ochish
  document.getElementById("detailModal").classList.remove("hidden");
  document.getElementById("detailModal").classList.add("flex");

  chanel1.postMessage({ type: "detail", value: id });
};

document.getElementById("closeDetail").addEventListener("click", () => {
  document.getElementById("detailModal").classList.add("hidden");
  document.getElementById("detailModal").classList.remove("flex");
});

const chanel1 = new BroadcastChannel("cars-channel");

chanel1.addEventListener("message", (evt) => {
  const { type, value } = evt.data;

  if (type === "mode") {
    if (value === "darkk") {
      document.body.classList.add("darkk");
    } else {
      document.body.classList.remove("darkk");
    }
    localStorage.setItem("mode", value);
  }

  if (type === "cars") {
    cars = value;
    showCars();
  }

  if (type === "add") {
    cars.push(value);
    showCars();
    saveToLocalStorage();
  }

  if (type === "delete") {
    cars.splice(value, 1);
    showCars();
    saveToLocalStorage();
  }

  if (type === "edit") {
    cars[value.index] = value.car;
    showCars();
    saveToLocalStorage();
  }

  if (type === "detail") {
    detailCar(value);
  }
});
