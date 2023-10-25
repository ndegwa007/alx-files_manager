import controllerRouting from './routes/index';

const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

controllerRouting(app);

app.listen(port, () => {
  console.log(`server listening on ${port}...`);
});
