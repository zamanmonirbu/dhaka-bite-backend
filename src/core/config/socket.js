import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./config.js";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  /* ---------- auth every connection ---------- */
  io.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers["authorization"]?.split(" ")[1];

    if (!token) return next(new Error("No token provided"));

    try {
      const payload = jwt.verify(token, jwtSecret);
      socket.userId = payload._id;
      socket.join(payload._id); // Join user-specific room
      return next();
    } catch (err) {
      return next(new Error("Token invalid"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.userId);

    // Handle join room event (for additional room joining if needed)
    socket.on("join", (data) => {
      if (data.room) {
        socket.join(data.room);
        console.log(`User ${socket.userId} joined room: ${data.room}`);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.userId);
    });
  });
}

/* Helper to emit balance updates */
export const emitBalanceUpdate = (userId, balance) => {
  if (io) {
    // Emit to the specific user's room
    io.to(userId.toString()).emit("balance:update", { balance });
    io.to(userId.toString()).emit("balanceUpdated", { balance });
    console.log(`📡 Balance update emitted to user ${userId}: ${balance}`);
  }
};

/* Helper so any module can get IO instance */
export const getIO = () => io;