// Import Packages
const express = require("express");
const dotenv = require("dotenv");
const usersRoutes = require("./routes/usersRoutes");

// Config DotEnv
dotenv.config();

// ENV Variables
const PORT = process.env.PORT || 3000;  // Port with Fallback

// Initialize or Create Express App
const app = express();

app.use("/api/v1/users", usersRoutes)

// app.get("/", (req, res) => {
//     // res.status(400).send("Hello World");
//     // res.status(200).send({message: "Hello World", status: 200});
//     res.status(200).json({message: "Get Request Successful", status: 200});


// });

app.listen(PORT, () => console.log(`Server Listening to the Port: http://localhost:${PORT}`));
