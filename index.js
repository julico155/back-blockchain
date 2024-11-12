require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes');

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
