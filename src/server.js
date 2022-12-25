const express = require('express');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const cors = require('cors');

require('./database/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', routes);

const PORT = 3000;

app.listen(PORT);
