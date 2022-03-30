const fs = require("fs");
const db = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    app.get("/api/notes", (req, res) => {
        res.json(db);
    });

    app.post("/api/notes", (req, res) => {
        req.body.id = uuidv4();
        var newNote = req.body      
        db.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            res.json(db);
            console.log("note written to db");
        });   
    });

    app.delete("/api/notes/:id", (req, res) => {
        var noteID = req.params.id
        for (var i = 0; i < db.length; i++) {
            if (noteID === db[i].id) {
                db.splice(i, 1);
                console.log("note deleted from db");
            };
        }

        fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            res.json(db);
        });
        
    });
}