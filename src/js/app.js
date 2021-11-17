import { io } from "socket.io-client";

const socket = io.connect("http://176.34.63.148:3000", { secure: false });
const welcome = document.getElementById("welcome");
const call = document.getElementById("call");
const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = navigator.mediaDevices.enumerateDevices();
    const cameras = (await devices).filter((device) => device.kind == "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.deviceId === camera.deviceId) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(deviceId ? cameraConstrains : initialConstrains);
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e.message);
  }
}

muteBtn.addEventListener("click", () => {
  myStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
});

function handleVideoOff() {
  myStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!cameraOff) {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  }
}

cameraBtn.addEventListener("click", handleVideoOff);

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
}

camerasSelect.addEventListener("input", handleCameraChange);

const welcomeForm = welcome.querySelector("form");

function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  console.log(input.value);
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

socket.on("connection", () => console.log("Socket io connected."));
