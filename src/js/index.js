console.log("index.js");

function setImage() {
  const target = document.querySelector("#image");
  const img = document.createElement("img");
  target.appendChild(img);
}

window.addEventListener("DOMContentLoaded", setImage);
