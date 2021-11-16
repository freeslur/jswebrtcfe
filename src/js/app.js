const myFace = document.getElementById("myFace");

let myStream;

async function getMedia() {
  try {
    myStream = await myFace.style.width;
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