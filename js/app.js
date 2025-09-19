// const elBtm = document.getElementById("btm");

// elBtm.addEventListener("click", () => {
//   if (document.body.classList.contains("dark")) {
//     document.body.classList.remove("dark");
//     localStorage.setItem("mode", "light");
//   } else {
//     document.body.classList.add("dark");
//     localStorage.setItem("mode", "dark");
//   }
// });

// window.addEventListener("storage", (e) => {
//   if (e.key === "mode" && e.newValue === "dark") {
//     document.body.classList.add("dark");
//   } else {
//     document.body.classList.remove("dark");
//   }
// });
// const elBtn = document.getElementById("btm");
// const chanel1 = new BroadcastChannel("chanel-1");

// elBtn.addEventListener("click", () => {
//   if (document.body.classList.contains("dark")) {
//     document.body.classList.remove("dark");
//     chanel1.postMessage("light");
//   } else {
//     document.body.classList.add("dark");
//     chanel1.postMessage("dark");
//   }
// });

// chanel1.addEventListener("message", (evt) => {
//   if (evt.data === "dark") {
//     document.body.classList.add("dark");
//   } else {
//     document.body.classList.remove("dark");
//   }
// });
