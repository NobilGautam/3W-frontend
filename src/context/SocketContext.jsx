import { io } from "socket.io-client"
import { createContext } from "react"

const devURL = "http://localhost:5000/";

const socket = io(devURL),
    SocketContext = createContext(socket);

socket.on("connect", ()=> console.log("connected to socked with id " + socket.id));

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider, socket };