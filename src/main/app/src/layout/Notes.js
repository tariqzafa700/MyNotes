import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
	  container: {
	    display: 'flex',
	    flexWrap: 'wrap',
	    flexDirection: 'column',
	    justifyContent: "center",
	    alignItems: 'center'
	  },
	  title: {
	    marginLeft: theme.spacing.unit,
	    marginRight: theme.spacing.unit,
	    width: 300,
	    borderStyle: 'outset',
	    borderWidth: '2px',
	    borderRadius: '2px'
	  },
	  content: {
		marginLeft: theme.spacing.unit,
	    marginRight: theme.spacing.unit,
	    width: 300,
	    borderStyle: 'outset',
	    borderWidth: '2px',
	    borderRadius: '2px'
	  },
	  button: {
	    marginTop: 20,
	    borderRadius: '4px'
	  }
});

export class Notes extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    		title: "",
	    		content: "",
	    		savedEntries: []
	    }
	}
	
	componentDidMount = () => {
		fetch("/notes", {
	        method: "GET",
	        headers: {
	          'Accept': 'application/json',
	        },
	        credentials: "same-origin"
    	}).then(function(response) {
	        return response.json();
	    }).then(text => {
	        this.setState({savedEntries: text})
	    }).catch(error => {});
	}
	
	handleSubmit = evt => {
		evt.preventDefault();
		const { title, content } = this.state;
        if(title.trim() === "" || content.trim() === "")
        	return;
		fetch("/notes", {
	        method: "POST",
	        headers: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        },
	        credentials: "same-origin",
	        body: JSON.stringify({title: title, content: content})
	    }).then(function(response) {
	        return response.json();
	    }).then((text) => {
	        return fetch("/notes", {
		        method: "GET",
		        headers: {
		          'Accept': 'application/json',
		        },
		        credentials: "same-origin"
	    	});
	    }).then(function(response) {
	        return response.json();
	    }).then(text => {
	        this.setState({title: "", content: "", savedEntries: text})
	    }).catch(error => {});
	}
	
	handleChange = name => event => {
		this.setState({
			[name] : event.target.value
		});
	}
	
	notesList = () => {
		var notes = [];
		
		this.state.savedEntries.length > 0? this.state.savedEntries.slice().reverse().forEach(entry => notes.push(<ListItem>
	        <ListItemText primary={entry.title} secondary = {entry.content}></ListItemText>
	    </ListItem>)) : <div/>
		return (
				<List>
				    {notes}
				</List>
		);
	}
	
	render() {
		const { classes } = this.props;
		const { title, content } = this.state;
		return (
				<div>
					<form className={classes.container} onSubmit={this.handleSubmit}>
					  <TextField
				        label="Title"
				        id="margin-title"
				        className={classes.title}
				        margin="normal"
				        value={title}
					    onChange={this.handleChange("title")}
					    inputProps={{ maxLength: 255 }}
				      />
				      <TextField
				        label="Content"
				        id="margin-normal"
				        className={classes.content}
				        multiline
				        rows = {10}
					    value={content}
					    onChange={this.handleChange("content")}
					    inputProps={{ maxLength: 1024 }}
				      />
					  <Button type="submit" variant="raised" color="primary" className={classes.button}>
			            Create
			          </Button>
				    </form>
				    {this.notesList()}
				</div>
		);
	}
}

export default withStyles(styles)(Notes);

