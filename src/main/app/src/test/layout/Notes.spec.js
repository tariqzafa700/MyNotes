import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import fetchMock from 'fetch-mock';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import toJson from 'enzyme-to-json';
import Notes from "../../layout/Notes";

describe('Notes Component', () => {
	afterEach(() => {
	    fetchMock.restore();
	  });

	it('renders correctly', () => {
/*	  const tree = renderer.create(
	    <Notes />
	  ).toJSON();*/
	  Enzyme.configure({ adapter: new Adapter() });
	  const tree = mount(
			  <Notes />
			  );
	  expect(tree).toMatchSnapshot();
	});
	
	it('submits data on create button', () => {
		  Enzyme.configure({ adapter: new Adapter() })
		  const tree = shallow(
				  <Notes />
				  ).first().shallow();
		  const headers = {
			        "Content-Type": "application/json"
			      };
		  const message = JSON.stringify({
		        title: "title",
		        content: "content"
		      });
		  fetchMock
	        .post("/notes", {
	          status: 201,
	          headers,
	          body: { message }
	        })
	        .catch(unmatchedUrl => {
	          return realFetch(unmatchedUrl);
	        });
		  tree.setState({title:"title", content:"content"});
          tree.find("form").simulate("submit", {preventDefault : () => {}});
          expect(fetchMock.called("/notes")).toEqual(true);
	});
	
	it('checks if data is empty', () => {
		  Enzyme.configure({ adapter: new Adapter() })
		  const tree = shallow(
				  <Notes />
				  ).first().shallow();
		  
        tree.find("form").simulate("submit", {preventDefault : () => {}});
        expect(fetchMock.called("/notes")).toEqual(false);
	});
	
	it('changes value of content', () => {
		Enzyme.configure({ adapter: new Adapter() })
		  const tree = shallow(
				  <Notes />
				  ).first().shallow();
        tree.find("TextField").last().simulate("change", {target: {value: "contentNew"}});
        expect(tree.state("content")).toBe("contentNew");
	})
});