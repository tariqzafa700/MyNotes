package com.app.notes.service;

import java.util.List;

import com.app.notes.model.NoteDetails;

public interface NotesService {

	Integer createNote(NoteDetails noteDetails);
	
	List<NoteDetails> getNotes();
}
