// LOAD DATA
const notesData = require('../Develop/db/db.json');
// npm package to generate unique id for each note
const { v4: uuidv4 } = require('uuid');

// ROUTES
module.exports = (app) => {

    // route for /api/notes that will show json data of notes array
    app.get('/api/notes', (req, res) => res.json(notesData));

    // route for /api/notes/:id that will show json data for the specific note with the given id
    app.get('/api/notes/:id', (req, res) => {
        // set the id as a parameter
        const chosenNote = req.params.id;

        // return the json data for that specific id in the array of notes
        for (let i = 0; i < notesData.length; i++) {
            if (chosenNote === notesData[i].id) {
                return res.json(notesData[i]);
            }
        }
    });

    // route to receive a new note to save on the request body and add it to the notes array in db.json
    app.post('/api/notes', (req, res) => {
        
        const {title,text} = req.body;
        // create a unique id for the note
        const id = uuidv4();
        // add the id as a key in the req.body object
        notesData.push({id,title,text});
        res.json(true);
    } );

    // rotue to delete a note from the array of notes
    app.delete('/api/notes/:id', (req, res) => {
        // set the id as a parameter
        const chosenNote = req.params.id;

        // remove the note with that specific id from the stored array of notes in db.json
        for (let i = 0; i < notesData.length; i++) {
            if (chosenNote === notesData[i].id) {
                return res.json(notesData.splice(i, 1));
            }
        }
    });
}