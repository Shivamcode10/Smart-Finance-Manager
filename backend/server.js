const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);


const allowedOrigins = [
  "http://localhost:3000",
  "https://smart-finance-manager.netlify.app" // 🔥 frontend URL (update if different)
];


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

app.set("io", io);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Smart Finance Manager API is running 🚀");
});


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/income-streams", require("./routes/incomeStreamRoutes"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
