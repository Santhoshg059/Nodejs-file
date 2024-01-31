const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");

//JSON Parsing
app.use(express.json());

//Creating and Reading a txt file
app.get("/", (req, res) => {
  const fileName = `files/${new Date().toISOString()}.txt`;
  const fileContent = new Date().toISOString();
  fs.writeFile(fileName, fileContent, "utf-8", (error) => {
    if (error) {
      console.log(error);
      res.status(500).send("An error occured");
    } else {
      fs.readFile(fileName, "utf-8", (error, data) => {
        if (error) {
          console.log(error);
          res.status(500).send("An error occured");
        } else {
          res.status(200).send(data);
        }
      });
    }
  });
});
//New endpoint to retrieve all text files in a folder
app.get("/getTextFiles", (req, res) => {
  const folderPath = "files";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("An error occured while listing the files from directory");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});