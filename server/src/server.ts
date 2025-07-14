import express from "express";
import http from "http";
import WebSocket from "ws";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import EventModel from "./models/Event";
import generateRandomEvent from "./events/event";

dotenv.config();

const app = express();




app.use( cors({
    origin: [
      "http://localhost:3000",
      "https://saasrealtimeanalyticsappclient.onrender.com",
    ],
    credentials: true,
  })
);



app.use(express.json());


app.get("/", (_req, res) => {
  res.send("Backend Server is live");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});


const mongoURL = process.env.MONGO_DB_URL;
if (!mongoURL) {
  throw new Error("MONGO_DB_URL is not defined in .env");
}

mongoose
  .connect(mongoURL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  console.log("🔌 WebSocket client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("🔌 WebSocket client disconnected");
    clients.delete(ws);
  });
});


setInterval(async () => {
  const event = generateRandomEvent();
  const newEvent = new EventModel(event);
  await newEvent.save();

  const data = JSON.stringify(event);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}, 2000);


app.get("/api/events", async (_req, res) => {
  const events = await EventModel.find().sort({ timestamp: 1 }).limit(500);
  res.json(events);
});




const buildPath = path.join(__dirname, "../client/build");

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  app.get("/*", (_req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  console.warn("⚠️ client/build not found. Skipping static file serving.");
}




const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(` Server listening on port ${port}`);
});