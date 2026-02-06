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

/* =======================
   CORS CONFIG (FINAL)
======================= */

const allowedOrigins = [
  "http://localhost:3000",
  "https://smart-finance-managerweb.netlify.app",
];

const netlifyPreviewPattern = /^https:\/\/[a-z0-9-]+--smart-finance-managerweb\.netlify\.app$/i;
const netlifyDeployUrlPattern = /^https:\/\/[a-z0-9-]+-smart-finance-managerweb\.netlify\.app$/i;

const isOriginAllowed = (origin) => {
  if (!origin) return true;

  return (
    allowedOrigins.includes(origin) ||
    netlifyPreviewPattern.test(origin) ||
    netlifyDeployUrlPattern.test(origin) ||
    origin === process.env.FRONTEND_URL
  );
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // 🔴 IMPORTANT
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* 🔑 FORCE CORS HEADERS FOR ALL RESPONSES (CRITICAL FIX) */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isOriginAllowed(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/* =======================
   BODY PARSERS
======================= */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* =======================
   SOCKET.IO
======================= */

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
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

/* =======================
   ROUTES
======================= */

app.get("/", (req, res) => {
  res.send("Smart Finance Manager API is running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/income-streams", require("./routes/incomeStreamRoutes"));

/* =======================
   START SERVER
======================= */

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
