const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to the database!")
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
})

app.get("/", (req, res) => {
    res.json({message: "Welcome to bezkoder applicaton."})
});


require('./app/routes/tutorial.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});