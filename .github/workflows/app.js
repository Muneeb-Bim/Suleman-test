const express = require("express");
const exphbs = require("express-handlebars");
// const bodyParser = require("body-parser");
// const morgan= require("morgan");
// const path = require("path");
const cors = require ("cors");
const db = require("./db")
const app = express();
const verifyRoutes = require("./routes/server")
app.use(cors())
app.use(express.json());


// Test DB
db.authenticate()
.then(()=>console.log("Database Connected"))
.catch(err=>console.log("error"+err))
//Register and Login Route
app.use("/auth", verifyRoutes);
// Restaurants Routes
app.use("/api/v1/restaurants", require("./routes/server"));
// Dashboard
app.use("/app", require("./routes/server"))

const port = process.env.PORT || 3008;
app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`)
});