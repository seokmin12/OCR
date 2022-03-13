const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.post("/api/ocr", (req, res, next) => {
    const { createWorker } = require('tesseract.js');
    const worker = createWorker();

    var img = req.files.uploadfile;
    var lang = req.body.lang;

    (async () => {
    await worker.load();
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    const { data: { text } } = await worker.recognize(img.data);
    console.log(text);
    res.json({ result: text });
    await worker.terminate();
    })();

});

app.get("/api/test", (req, res) => {
    res.send("hello world");
});
  
app.listen(3000, () => console.log("Listening on port 3000..."));