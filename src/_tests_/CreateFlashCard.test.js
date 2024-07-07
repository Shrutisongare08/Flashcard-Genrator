// Import the necessary libraries and components
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateFlashCard from "../pages/CreateFlashCard";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

//Moack Redux Store setUp
// Create a mock Redux store
const mockStore = configureStore([]);

const initialState = {
  flashcard: {
    formData: {
      groupName: "Test Group",
      groupImage: null,
      groupDescription: "Test Description",
      term: [
        {
          termName: "Term 1",
          TermDefinition: "Definition 1",
          termImage: null,
        },
      ],
    },
    flashcards: [],
  },
};
// Initialize the mock store with initial state
const store = mockStore(initialState);

test("Render input field", () => {
  render(
    <Provider store={store}> {/* Provide the mock Redux store to the component */}
      <CreateFlashCard /> {/* Render the CreateFlashCard component */}
    </Provider>
  );

  //  Test if the "Create Group*" input field is rendered
  const groupNameInput = screen.getByLabelText("Create Group*");
  expect(groupNameInput).toBeInTheDocument();

  //  Test if the "Add description" input field is rendered
  const descriptionInput = screen.getByLabelText("Add description");
  expect(descriptionInput).toBeInTheDocument();

  // for  adding more tests for other input fields and components as needed.
});
