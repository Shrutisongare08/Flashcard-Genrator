import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cardImg from "../assets/flash-card.png";
import DeleteCard from "../components/DeleteCard";

function MyFlashcard() {
  const [showDeleteCard, setShowDeleteCard] = useState(false);

  const [flashCardData, setFlashCardData] = useState(
    localStorage.getItem("flashcards")
      ? JSON.parse(localStorage.getItem("flashcards"))
      : []
  );

  const [delClickedItem, setDelClickedItem] = useState(null);

  // import useNavigate for navigate the page
  const navigate = useNavigate();

  //use useState() for manage show more button
  const [showCard, setShowCard] = useState(6);

  const handleViewCardsClick = (ele) => {
    navigate("/flashCardDetails", { state: ele });
  };

  //for Deleting a flashcard
  const deleteFlashCard = (delClickedItem) => {
    setDelClickedItem(delClickedItem);
    setShowDeleteCard(true);
  };

  return (
    <>
      <div className="myFlashcardDiv w-[78%] m-auto mt-3 ">
        <DeleteCard
          showDeleteCard={showDeleteCard}
          setShowDeleteCard={setShowDeleteCard}
          flashCardData={flashCardData}
          setFlashCardData={setFlashCardData}
          delClickedItem={delClickedItem}
        />
        <ToastContainer />
        <div className="absolute pr-10 text-sm overflow-visible font-bold right-24 text-right text-gray-400 totalCards">
          {!flashCardData.length
            ? null
            : `Total FlashCards : ${flashCardData.length}`}
        </div>

        <div
          name="displayFlashcardDiv"
          className="flex flex-wrap m-auto overflow-hidden "
        >
          {flashCardData.length !== 0 ? (
            flashCardData.slice(0, showCard).map((ele, index) => (
              <div
                key={index}
                name="childCards"
                className="commonBorder childCards  flex flex-col m-auto bg-white w-[300px] h-[200px] p-[8px] rounded mt-[50px] relative mb-[10px]"
              >
                <button
                  className="absolute hidden text-2xl text-gray-500 del -right-2 -top-2 hover:text-4xl hover:text-red-600"
                  onClick={() => {
                    deleteFlashCard(ele,index);
                  }}
                >
                  <ImCross />
                </button>

                <img
                  className="border-2 bg-slate-400  w-   [70px] h-[70px] m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                  src={ele.groupImage ? ele.groupImage : cardImg}
                  alt=""
                />
                <h1 className="mt-4 font-bold">{ele.groupName}</h1>
                <h2 className="h-10 mt-1 text-gray-700">
                  {ele.groupDescription.length > 60
                    ? ele.groupDescription.slice(0, 60) + "..."
                    : ele.groupDescription}
                </h2>
                <h2 className="mt-8 font-bold text-gray-500">
                  {ele.term.length} Cards
                </h2>

                {/* This is view card component*/}
                <button
                  className="w-40 h-8 m-auto font-medium text-red-600 duration-300 border-2 border-red-600 rounded hover:bg-red-600 hover:text-white"
                  onClick={() => handleViewCardsClick(ele)}
                >
                  View Cards
                </button>
              </div>
            ))
          ) : (
            <div className=" w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
              <div className="mt-32 text-red-700 text-7xl">
                "No FlashCard available"
              </div>
              <br />
              <p className="mt-5 text-[20px]">
                Please go and
                <i className="underline text-amber-800 hover:text-green-700">
                  <Link to="/createFlashcard">Create New FlashCard</Link>
                </i>
              </p>
            </div>
          )}

          {/* See all and see less button if we have more than 6 flashcard */}
          {flashCardData && flashCardData.length > 6 ? (
            <div className="w-[100%]">
              <div className="mt-5 text-right">
                {flashCardData.length === showCard ? (
                  <button
                    onClick={() => {
                      setShowCard(6);
                    }}
                    className="w-24 mx-5 mb-24 font-bold text-red-500 hover:text-red-600"
                  >
                    See less
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowCard(flashCardData.length);
                    }}
                    className="w-24 mx-5 mb-24 font-bold text-red-500 hover:text-red-600"
                  >
                    See all
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MyFlashcard;
