import express from "express";
import http from "http";
import WebSocket from "ws";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import EventModel from "./models/Event";
import generateRandomEvent from "./events/event";
import { UserEvent } from "./types/interface";
import { PORT, MONGO_DB_URL } from "./config/config";



const app = express();
const __dirnamePath = path.resolve(); 


app.use(cors({
  origin: "http://localhost:3000", 
}));
app.use(express.json());




mongoose.connect(MONGO_DB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));




const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
  console.log("🔌 Client connected via WebSocket");
  clients.add(ws);

  ws.on("close", () => {
    console.log("🔌 Client disconnected");
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




app.get("/", (_req, res) => {
  res.send("🚀 SaaS Analytics Server ");
});





app.use(express.static(path.join(__dirnamePath, "client/build")));



app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirnamePath, "client/build", "index.html"));
});




server.listen(PORT, () => {
  console.log(`🚀 Server at http://localhost:${PORT}`);
});