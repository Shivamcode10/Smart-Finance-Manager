
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
  credentials: false, 
};

app.use(cors(corsOptions));

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://smart-finance-manager-xchf.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://smart-finance-manager-xchf.vercel.app"
    ],
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