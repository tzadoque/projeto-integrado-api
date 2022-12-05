const express = require('express');
const routes = require('./routes');

require('./database/index');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT);
