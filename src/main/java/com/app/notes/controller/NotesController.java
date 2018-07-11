package com.app.notes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.notes.model.NoteDetails;
import com.app.notes.service.NotesService;

@EnableAutoConfiguration
@RequestMapping("/notes")
@RestController
public class NotesController {
	
	@Autowired
	private NotesService notesService;
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public ResponseEntity<Integer> addNote(@RequestBody NoteDetails noteDetails) {
		return ResponseEntity.status(HttpStatus.CREATED).body(notesService.createNote(noteDetails));
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public ResponseEntity<List<NoteDetails>> getAllNotes() {
		return ResponseEntity.status(HttpStatus.OK).body(notesService.getNotes());
	}
}
