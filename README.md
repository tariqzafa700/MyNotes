# MyNotes

Download maven
https://maven.apache.org/download.cgi

To build JAVA_HOME and MVN_HOME should be set in environment variables for operating system. Otherwise it will fail for not finding JDK folder to build. In Linux its in ~/.profile file and windows system -> advanced settings -> environment variables -> system variables.
Also if any libraries don't get downloaded because of network connection reset and build fails, please run the build again or if npm.tar.gz is not downloaded correctly and build fails, please delete it from the given path provided in build logs and build again.

Build steps:

To run the app simply

mvn spring-boot:run

After running the server, check on 

http://localhost:8080


If need to check with test cases then

mvn clean install test

 
Backend has been developed in Spring boot and frontend in ReactJS/Material ui and served by Spring backend and Jest/Enzyme for ui testcases.
Since there is no database we save the notes just in a List and since there is no user session here by spring security, there is just one set of notes that can be accessed and created by anyone. Below the create textboxes we can see all the notes previously saved.
The front end has two text boxes one for title and other for content with a button to submit those. Then saved messages appear below.
For testing there is integration test for testing REST api code and junits for frontend to test using snapshot testing and functionality testing.

Modifications:
We can modify to have login sessions to maintain per user based notes. Then we can maintain a list of notes fordifferent users by saving them in db or having a map instead of list with user id as key and their notes list as values.

![alt tag](https://user-images.githubusercontent.com/23030368/42622114-3b55b2d8-85dd-11e8-922c-4cfd5ca04d1d.jpg)


