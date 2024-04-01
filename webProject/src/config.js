const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb+srv://habiba_Saleem:habibaSaleem96@webcluster.erbonxu.mongodb.net/skinSolutions?retryWrites=true&w=majority&appName=webCluster");

connect.then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Error connecting to database:", error);
});

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("accounts", loginSchema);

module.exports = collection;
