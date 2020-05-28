import * as express from "express";
import cors = require('cors');
import bodyParser = require('body-parser');

import GameController from "./controllers/gameController";

const app = express();
app.use(bodyParser.json())
app.use(cors());

app.post("/api/next-move", GameController.getNextMove);

// App listening on port 3000 and pc's
app.listen(3000, '0.0.0.0');

module.exports = app