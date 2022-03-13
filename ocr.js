const { createWorker } = require('tesseract.js');

const worker = createWorker();

(async () => {
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  const { data: { text } } = await worker.recognize('kor.jpeg');
  console.log(text);
  await worker.terminate();
})();