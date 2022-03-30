// Dependencies
const path = require("path");

// Export HTML Routes
module.exports = (app) => {

    // GET request & Route to notes
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // GET request & Route to homepage
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}