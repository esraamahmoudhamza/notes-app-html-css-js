const notesList = document.getElementById('notesList');
const addNoteBtn = document.getElementById('addNoteBtn');
const noteEditor = document.getElementById('noteEditor');
const emptyState = document.getElementById('emptyState');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');
const searchInput = document.getElementById('search');
const notesHeader = document.getElementById('notesHeader');

let notes = [];
let currentNoteIndex = null;

// Add new note
addNoteBtn.addEventListener('click', () => {
  noteEditor.classList.remove('hidden');
  emptyState.classList.add('hidden');
  noteTitle.value = '';
  noteContent.value = '';
  currentNoteIndex = null;
});

// Save note
saveNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) return;

  if (currentNoteIndex === null) {
    notes.push({ title, content });
  } else {
    notes[currentNoteIndex] = { title, content };
  }
  renderNotes();
  noteEditor.classList.remove('hidden');
});

// Delete note
deleteNoteBtn.addEventListener('click', () => {
  if (currentNoteIndex !== null) {
    notes.splice(currentNoteIndex, 1);
    renderNotes();
    noteEditor.classList.add('hidden');
    if (notes.length === 0) emptyState.classList.remove('hidden');
  }
});

// Render notes list
function renderNotes() {
  notesList.innerHTML = '';

  if (notes.length === 0) {
    emptyState.classList.remove('hidden');
    notesHeader.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    notesHeader.classList.remove('hidden');
  }

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note.title;
    li.addEventListener('click', () => {
      noteEditor.classList.remove('hidden');
      emptyState.classList.add('hidden');
      noteTitle.value = note.title;
      noteContent.value = note.content;
      currentNoteIndex = index;
    });
    notesList.appendChild(li);
  });
}

// Search notes
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = notes.filter(note => note.title.toLowerCase().includes(query));
  notesList.innerHTML = '';
  filtered.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note.title;
    li.addEventListener('click', () => {
      noteEditor.classList.remove('hidden');
      emptyState.classList.add('hidden');
      noteTitle.value = note.title;
      noteContent.value = note.content;
      currentNoteIndex = notes.indexOf(filtered[index]);
    });
    notesList.appendChild(li);
  });
});
