import { io } from "socket.io-client"
import { HRMSSOCKETURL } from "./siteDefault"

export const state = reactive({
  connected: false,
  events: [],
  isLoading: true
})

const config = { transports: ['websocket', 'polling'] }

export const socket = io(HRMSSOCKETURL, config)

socket.on("connect", () => {
  state.connected = true
  state.isLoading = false
  console.log("Socket connected")
})
