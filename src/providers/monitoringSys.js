import { seperateSentence } from "../utils/handleMessageContent.js";
import stringSimilarity from "string-similarity";
import { getCensoredWords } from "../controllers/censoredWords.controller.js";

class MonitorSys {
  bannedWords = [];

  constructor() {
    getCensoredWords((data) => {
      this.bannedWords = data;
    });
  }

  addNewWord = (word) => {
    this.bannedWords.push(word);
    console.log("ADD NEW BANNED WORD");
  };

  removeWord = (wordId) => {
    this.bannedWords = this.bannedWords.filter((word) => word.id !== wordId);
    console.log("REMOVE A BANNED WORD");
  };

  getScannedMessageStatus = (content) => {
    const wordsInContent = seperateSentence(content);
    let status = "SAFE";

    for (const bannedWord of this.bannedWords) {
      for (const word of wordsInContent) {
        const similarityRate = stringSimilarity.compareTwoStrings(
          bannedWord.word,
          word
        );
        if (similarityRate >= 0.9) {
          return "HARMFUL";
        } else if (similarityRate >= 0.7) {
          status = "FLAG";
        }
      }
    }

    return status;
  };
}

export default MonitorSys;
