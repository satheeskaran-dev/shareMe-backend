const baseName = require("../baseName");
const { v4: uuid } = require("uuid");
const { join } = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const expressFileUploader = async (file, folderName) => {
  if (!file) return "";
  console.log(folderName);
  const uploadPathToServer = join(baseName, "/public/assets/", folderName);
  let pathToStoreDB = "";
  let filesUploadedSuccess = true;

  if (!fs.existsSync(uploadPathToServer)) {
    await fsPromises.mkdir(uploadPathToServer, {
      recursive: true,
    });
  }

  pathToStoreDB = `public/assets/${folderName}/${uuid()}.${
    file.name.split(".")[1]
  }`;

  const fileUpload = () =>
    new Promise((resolve, reject) => {
      file.mv(join(baseName, pathToStoreDB), (err) => {
        console.log(err);
        if (err) reject(false);
        resolve(true);
      });
    });

  filesUploadedSuccess = await fileUpload();

  if (filesUploadedSuccess) {
    return pathToStoreDB.slice(6);
  } else {
    return "";
  }
};

module.exports = expressFileUploader;
