const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = require("./routes/api/router");

//Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(router);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const host = server.address().address;
  // const port = server.address().port;
  console.log(`server runs on host ${host}, port ${PORT}`);
});