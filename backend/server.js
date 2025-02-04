require("dotenv").config();
const express = require("express");
const cors = require("cors");
 
const apiRoutes = require("./routes/api");
const mongoConnect = require("./db/mongoConnect");

const app = express();

mongoConnect();
app.use(express.json());
app.use(cors());

app.use("/", apiRoutes);

const PORT = process.env.PORT || 5000;

//Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
