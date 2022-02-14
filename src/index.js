import { monitorSys, start } from "./server.js";
import { discord } from "./providers/discord.js";
import flaggedMessagesController from "./controllers/flaggedMessages.controller.js";
import messagesController from "./controllers/messages.controller.js";

discord.client.on("ready", () => {
  console.log(`Logged in as ${discord.client.user?.tag}!`);

  discord.client.on("message", (msg) => {
    const status = monitorSys.getScannedMessageStatus(msg.content);
    if (status === "FLAG") {
      flaggedMessagesController.addFlaggedMessage(msg);
    } else if (status === "HARMFUL") {
      messagesController.deleteHarmfulMessage(msg.id);
    } else {
      console.log("SAFE");
    }
  });
});

start();
discord.client.login(process.env.DISCORD_KEY);
