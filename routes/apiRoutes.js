let notes = require("../db/db.json");
const fs = require("fs");
const uid = require("uid");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    return res.json(notes);
  });

  const save = () => {
    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), error => {
      if (error) {
        throw error;
      }
    });
  }

  app.post("/api/notes", function (req, res) {
    var newNote = {
      id: uid(),
      title: req.body.title,
      text: req.body.text
    };
    notes.push(newNote);
    save();
    res.json(notes);
    console.log(notes);
  });

  app.delete(`/api/notes/:id`, (req, res) => {
    noteId = req.params.id;
    console.log(noteId);
    const newNote = notes.filter((note) => note.id != noteId);

    notes = newNote;
    save();
    res.send(notes);

  });
}
