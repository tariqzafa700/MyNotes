import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import fetchMock from 'fetch-mock';
import { createShallow } from '@material-ui/core/test-utils';
import toJson from 'enzyme-to-json';
import Notes from "../../layout/Notes";

describe('Notes Component', () => {
	it('renders correctly', () => {
	  const tree = renderer.create(
	    <Notes />
	  ).toJSON();
	 
	  expect(tree).toMatchSnapshot();
	});
	/*There is some issue with enzyme 3.0 because of which shallow renderer is not working properly.
	 * But below is the test that checks the button element in the renderer and simulates a submit event.
	 * It is expected that fetch mock call is triggered*/
	/*
	it('submits data on create button', () => {
		Enzyme.configure({ adapter: new Adapter() })
		  const tree = shallow(
				  <Notes />
				  );
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
          tree.find("button").simulate("submit");
          expect(fetchMoc.called("/notes")).toEqual(true);
	});*/
});