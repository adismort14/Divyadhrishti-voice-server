const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const http = require("http");

const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/upload-audio", (req, res) => {
  // do something with the voice packet received from the app

  console.log(req.body);
  const file = `C:/Users/ADITYA/Downloads/voice.m4a`;
  res.download(file); // Set disposition and send it.
  // const url = "http://10.3.13.139:3000/api/upload-audio";
  // const filename = "audio.m4a";

  // // Set the headers to download the file as an attachment
  // res.setHeader("Content-disposition", "attachment; filename=" + filename);
  // res.setHeader("Content-type", "audio/m4a");

  // // Use http.get to download the file
  // http
  //   .get(url, function (response) {
  //     response.pipe(res);
  //   })
  //   .on("error", function (err) {
  //     console.log(err);
  //     res.send("Error downloading the file");
  //   });
  // send a response back to the app
  res.send("Voice packet received");
});

app.get("/download-audio", (req, res) => {
  const filePath = path.join(__dirname, "uploads", "audio.m4a");
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "audio/m4a",
    "Content-Length": stat.size,
    "Content-disposition": "attachment; filename=audio.m4a",
  });
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// app.get("/api/upload-audio", function (req, res) {
//   const file = `C:/Users/ADITYA/Downloads/voice.m4a`;
//   res.download(file); // Set disposition and send it.
// });

// const server = http.createServer((req, res) => {
//   if (req.url === "/upload-audio" && req.method.toLowerCase() === "post") {
//     const form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error(err);
//         res.statusCode = 500;
//         res.end();
//         return;
//       }

//       const audioFile = files.audio;

//       // Do something with the audio file data here, e.g. write it to disk
//       console.log(
//         `Received audio file: ${audioFile.name}, ${audioFile.type}, ${audioFile.size} bytes`
//       );

//       res.statusCode = 200;
//       res.end("Audio file received");
//     });
//   } else {
//     res.statusCode = 404;
//     res.end();
//   }
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
