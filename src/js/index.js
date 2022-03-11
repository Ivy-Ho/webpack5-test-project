console.log("index.js");
import axios from 'axios';
import testImg from "@/img/test.png";

function setImage() {
  const imageHolder = document.querySelector(".image-holder");
  const img = document.createElement("img");
  img.setAttribute("src", testImg);
  imageHolder.appendChild(img);
}

window.addEventListener("DOMContentLoaded", setImage);

class MyName {
  constructor (name){
    this.name = name
  }
  async readMyName() {
    // 測 api 用這裡測
    const { data } = await axios.get('/api/group')
    console.log(data)
  }
}

const me = new MyName('Ivy');

console.log(me.readMyName());

const app = new Vue({
  el: '#app',
  data() {
    return {
      text1 : 'this is from vue data'
    }
  },
})