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

// Allowed Origins list
const allowedOrigins = [
  "http://localhost:3000",
  "https://smart-finance-managerweb.netlify.app",
  process.env.FRONTEND_URL, // Add your frontend URL from .env if needed
];

// Dynamic check for Netlify subdomains (previews, etc)
const isNetlifyOrigin = (origin) => {
  // Matches 'smart-finance-managerweb.netlify.app' and any subdomains
  return origin && origin.endsWith("smart-finance-managerweb.netlify.app");
};

const isOriginAllowed = (origin) => {
  // Allow requests with no origin (like mobile apps, curl, Postman)
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) return true;
  if (isNetlifyOrigin(origin)) return true;
  
  console.log(`Origin NOT allowed: ${origin}`);
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      console.log(`CORS allowing origin: ${origin}`);
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, 
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Manual Headers Fallback
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isOriginAllowed(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Socket IO Setup
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

app.get("/", (req, res) => {
  res.send("Smart Finance Manager API is running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/income-streams", require("./routes/incomeStreamRoutes"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});