const fs = require("fs");
const { title } = require("process");

var fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json"));
  } catch (err) {
    return [];
  }
};

var addingNote = (title, body) => {
  var notes = fetchNotes();

  var note = {
    title,
    body,
  };

  var double = notes.filter((note) => note.title === title);

  if (double.length === 0) {
    notes.push(note);

    fs.writeFileSync("notes.json", JSON.stringify(notes));

    logNote(note);
  } else {
    console.log("Title already exists!");
  }
};

var removeNote = (title) => {
  var notes = fetchNotes();

  var filteredNotes = notes.filter((note) => note.title !== title);

  fs.writeFileSync("notes.json", JSON.stringify(filteredNotes));
};

var readNote = (title) => {
  var notes = fetchNotes();

  var filteredNotes = notes.filter((note) => note.title === title);

  logNote(filteredNotes[0]);
};

var showList = () => {
  var notes = fetchNotes();

  notes.forEach((note) => logNote(note));
};

var logNote = (note) => {
  console.log("********************");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addingNote,
  removeNote,
  readNote,
  showList,
};
