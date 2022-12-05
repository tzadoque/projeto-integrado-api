const express = require('express');
const routes = require('./routes/routes');

require('./database/index');

const app = express();

app.use(express.json());
app.use('/v1', routes);

const PORT = 3000;

app.listen(PORT);
