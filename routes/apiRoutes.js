var notes = require("../db/db.json")


module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
       return res.json(notes);

    });
    
    app.get("/api/notes/:id", function(req, res){
        const noteId = notes(req.params.id);
        // res.json(noteId);
        
        const getNote = notes.find((note) => note.id === noteId);
        console.log(getNote);
        if (!getNote) {
            res.status(500).send("Note not found")
        } else {
            res.json(getNote);
        }
        console.log(getNote);
    });
    app.post("/api/notes", function(req, res){
      // var newNote = {
      //   title:req.body.title,
      //   id: title.length,
      //   text: req.body.text
      // } ;
      // notes.push(newNote);
      // res.json(notes);
      // console.log(notes);
      const savedNotes = req.body;
        notes.push(savedNotes);
            res.json(notes);
            console.log(notes);

        
    });
    app.delete(`/api/notes/:id`, (req, res) => {
 noteId = Number(req.params.id);
        const newNote = notes.filter((note) => note.id != noteId);
      
        if (!newNote) {
          res.status(500).send('note not found.');
        } else {
          notes = newNote;
          res.send(notes);
        }
      });
    
}
/*// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});*/