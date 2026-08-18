import { io } from "socket.io-client";

const socket = io("http://10.227.72.250:3000", {
  withCredentials: true,
});

export default socket;