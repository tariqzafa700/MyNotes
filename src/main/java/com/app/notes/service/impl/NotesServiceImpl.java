package com.app.notes.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.app.notes.model.NoteDetails;
import com.app.notes.service.NotesService;

@Service
public class NotesServiceImpl implements NotesService {

	List<NoteDetails> notes = new ArrayList<>();
	
	private static Integer id = 0;
	
	@Override
	public Integer createNote(NoteDetails noteDetails) {
        notes.add(noteDetails);
        return Integer.valueOf(++id);
	}

	@Override
	public List<NoteDetails> getNotes() {
		System.out.println("Notes " + notes);
        return notes;
	}

}
