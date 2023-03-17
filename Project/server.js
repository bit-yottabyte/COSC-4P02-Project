const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'Project')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});