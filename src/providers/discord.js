import Discord from "discord.js";

class DiscordHandler {
  client = new Discord.Client();

  getMessages = async () => {
    try {
      const channel = await this.client.channels.fetch("879761200492204074");
      const textChannel = channel;
      const messages = await textChannel.messages.fetch({ limit: 25 });

      return messages;
    } catch (error) {
      return error;
    }
  };

  deleteMessage = async (id) => {
    try {
      const channel = await this.client.channels.fetch("879761200492204074");

      const textChannel = channel;
      const deletedMessage = await textChannel.messages.delete(id);

      return deletedMessage;
    } catch (error) {
      return error;
    }
  };
}

export const discord = new DiscordHandler();
