import React from "react";
import { useLocation, Link } from "react-router-dom";
import SelectedFlashCard from '../components/SelectedFlashCard'

function FlashCardDetails() {
  //It access the current loaction of Object
  const location = useLocation();
  const flashcardData = location.state;

  return (
    <>
      {flashcardData ? (
        <SelectedFlashCard location={location} flashcardData={flashcardData} />
      ) : (
        <div className=" w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
          <div className="text-5xl text-red-700 mt-32  backdrop-blur-sm w-[80%] m-auto">
            "You directly Jump to this Flashcard details page without selecting
            any Flashcard"
          </div>
          <br />
          <p className="text-xl mt-5 backdrop-blur-sm">
            Please go and select
            <i className=" text-amber-800 underline hover:text-green-700  ">
              <Link to="/myflashcard"> Your FlashCard</Link>
            </i>
          </p>
        </div>
      )}
    </>
  );
}

export default FlashCardDetails;
