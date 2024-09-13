use notesapp;
show tables;
describe notes;
ALTER TABLE notesapp.notes MODIFY COLUMN title VARCHAR(1000);
describe notes;