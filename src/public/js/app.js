const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = false;
let roomName;

function showRoom() {
  room.hidden = false;
  welcome.hidden = true;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom );
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);