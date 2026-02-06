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

/* =========================
   CORS CONFIG (FIXED)
========================= */

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server & Postman
    if (!origin) return callback(null, true);

    // Allow localhost
    if (
      origin === "http://localhost:3000" ||
      origin === "http://localhost:5173"
    ) {
      return callback(null, true);
    }

    // ✅ Allow ALL Vercel deployments (important)
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));

/* =========================
   BODY PARSER
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =========================
   SOCKET.IO
========================= */

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      if (
        origin === "http://localhost:3000" ||
        origin === "http://localhost:5173"
      ) {
        return callback(null, true);
      }

      callback(new Error("Socket CORS blocked"));
    },
    methods: ["GET", "POST"],
    credentials: false,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Unauthorized socket connection"));
  }
  next();
});

app.set("io", io);

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("Smart Finance Manager API is running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/income-streams", require("./routes/incomeStreamRoutes"));

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
