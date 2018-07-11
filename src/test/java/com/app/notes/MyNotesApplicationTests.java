package com.app.notes;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.UriComponentsBuilder;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {MyNotesApplication.class}, webEnvironment = WebEnvironment.RANDOM_PORT)
@ContextConfiguration
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class MyNotesApplicationTests {
	@LocalServerPort
	private int port;
    
    @Autowired
    private MockMvc mvc;

	@Test
	public void contextLoads() {
	}
	
    @Test
    public void testPostAndGet() throws Exception {
        String note1 = "{\"title\": \"my first note\", \"content\": \"This is my first note ever written. Please read it.\"}";
        String note2 = "{\"title\": \"my second note\", \"content\": \"This is my second note ever written. Please ignore it.\"}";

        String queryUrl = UriComponentsBuilder.fromUriString("http://localhost:"+port)
                .path("/notes")
                .toUriString().trim();

        mvc.perform(post(queryUrl).accept("application/json").content(note1).contentType(MediaType.APPLICATION_JSON_VALUE))                   
                .andDo(print())
                .andExpect(status().is(201));
        mvc.perform(post(queryUrl).accept("application/json").content(note2).contentType(MediaType.APPLICATION_JSON_VALUE))                   
		        .andDo(print())
		        .andExpect(status().is(201));

        mvc.perform(get(queryUrl).accept("application/json"))                   
                  .andDo(print())
        	      .andExpect(status().isOk())
        	      .andExpect(jsonPath("$[0].title", is("my first note")))
        	      .andExpect(jsonPath("$[1].content", is("This is my second note ever written. Please ignore it.")));
    }


}
