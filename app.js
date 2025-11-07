require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");

const PORT = process.env.PORT || 3000;

// set ejs as the view engine
app.set("view engine", "ejs");

// parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
