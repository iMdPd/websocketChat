const express = require("express");
const cors = require("cors");
const app = express();
PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
