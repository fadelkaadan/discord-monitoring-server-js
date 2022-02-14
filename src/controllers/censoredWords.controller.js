import docClient from "../docClient.js";
import { v4 as uuidv4 } from "uuid";
import { monitorSys } from "../server.js";

class CensoredWordsController {
  getAll = async (req, res) => {
    try {
      const params = {
        TableName: "censored-words",
      };

      docClient.scan(params, (err, data) => {
        res.status(200).json(data.Items);
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  createOne = async (req, res) => {
    const newId = uuidv4();
    const newWord = {
      id: newId,
      word: req.body.word,
    };
    const params = {
      TableName: "censored-words",
      Item: newWord,
    };

    try {
      docClient.put(params, (err, data) => {
        monitorSys.addNewWord(newWord);
        res.status(200).json(newWord);
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  getOne = async (req, res) => {
    var params = {
      TableName: "censored-words",
      Key: { KEY_NAME: req.params.id },
    };

    try {
      docClient.get(params, function (err, data) {
        res.status(200).json({
          status: "successfully added",
          data,
        });
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };

  deleteOne = async (req, res) => {
    try {
      const params = {
        TableName: "censored-words",
        Key: {
          id: req.params.id,
        },
      };

      docClient.delete(params, (err, data) => {
        monitorSys.removeWord(req.params.id);
        res.status(200).json({
          status: "successfully deleted",
          data: data,
        });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}

export const getCensoredWords = (callback) => {
  try {
    const params = {
      TableName: "censored-words",
    };

    docClient.scan(params, (err, data) => {
      callback(data.Items);
    });
  } catch (error) {
    console.error("ERROR");
  }
};

export default new CensoredWordsController();
