const express = require('express');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

require('./database/index');

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/v1', routes);

const PORT = 3000;

app.listen(PORT);
