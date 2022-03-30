// Dependencies
const fs = require("fs");
const db = require("../Develop/db/db.json");
// Generate unique id(s) for the new note(s)
const { v4: uuidv4 } = require('uuid');

// Export API Routes
module.exports = app => {
    // API GET request to retrieve data from the database
    app.get("/api/notes", (req, res) => {
        res.json(db);
    });

     // API POST to create new note(s)
    app.post("/api/notes", (req, res) => {
        req.body.id = uuidv4();
        var newNote = req.body    
        // Push the new note to the JSON file    
        db.push(newNote);
        // Write note to db.JSON
        fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            
            // else send the response 
            res.json(db);
            console.log("note written to db");
        });   
    });

    // API DELETE to delete notes
    app.delete("/api/notes/:id", (req, res) => {
        var noteID = req.params.id
        for (var i = 0; i < db.length; i++) {
            if (noteID === db[i].id) {
                db.splice(i, 1);
                console.log("note deleted from db");
            };
        }
        // Write the new db to the file 
        fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
            if (err) throw err;
            // else send the response
            res.json(db);
        });
        
    });
}