let express = require('express');
let cors = require('cors')
let app = express();
let routes = require("./src/routes/apiRoutes")

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);


app.listen(5000);