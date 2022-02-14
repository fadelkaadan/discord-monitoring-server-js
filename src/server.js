import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import flaggedMessagesRoute from "./routes/flaggedMessages.route.js";
import censoredWordsRoute from "./routes/censoredWords.route.js";
import messagesRoute from "./routes/messages.route.js";
import MonitorSys from "./providers/monitoringSys.js";
dotenv.config();

const server = express();
export const monitorSys = new MonitorSys();

server.use(cors());
server.use(express.json());

server.use("/flaggedMessages", flaggedMessagesRoute);
server.use("/messages", messagesRoute);
server.use("/censoredWords", censoredWordsRoute);

server.all("/", (req, res) => {
  res.send("Bot is running 4...");
});

export function start() {
  server.listen(4000, () => {
    console.log("Server is ready...");
  });
}
