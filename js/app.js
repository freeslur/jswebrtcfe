"use strict";

var myFace = document.getElementById("myFace");
var myStream;

function getMedia() {
  try {
    // myStream = await navigator.mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true,
    // });
    console.log(myStream);
  } catch (e) {
    console.log(e.message);
  }
}

getMedia();