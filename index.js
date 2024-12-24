const express = require("express");
const bodyParser = require("body-parser");
const reporterRoute = require("./routes/reporterRoute");
const cors = require("cors");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const scammerRoute = require("./routes/scammerRoute");
const warningRoute = require("./routes/warningRoute");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json()); // Giúp parse dữ liệu JSON
app.use("/reporter", reporterRoute);
app.use("/scammer", scammerRoute);
app.use("/warning", warningRoute);
app.use(loginRoute);
app.use(registerRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
