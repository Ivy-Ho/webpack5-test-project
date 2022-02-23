console.log("index.js");
import testImg from "@/img/test.png";

function setImage() {
  const imageHolder = document.querySelector(".image-holder");
  const img = document.createElement("img");
  img.setAttribute("src", testImg);
  imageHolder.appendChild(img);
}

window.addEventListener("DOMContentLoaded", setImage);
