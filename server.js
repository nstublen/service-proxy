const express = require("express");
const cors = require("cors");

const app = express();

//app.use(cors());
app.options("*", cors());

app.use("/apod", require("./services/apod"));
app.use("/owm", require("./services/openweathermap"));

app.get("/", (req, res) => res.send("Service Proxy"));

app.listen(3200, () => console.log("Example app is listening on port 3200!"));
