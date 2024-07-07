import React from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import validationSchema from "../validation/ValidationSchema";
import validateImage from "../validation/ValidateImage";
import { addFlashCard } from "../redux/flashcardSlice";
import 'react-toastify/dist/ReactToastify.css';

function CreateFlashCard() {
  const dispatch = useDispatch();

  //Access Form Data from Redux Store
  const formData = useSelector((state) => state.flashcard.formData);

  const addMoreTermS = (values, moreTerm) => {
    moreTerm.insert(values.term.length, {
      termName: "",
      termDefinition: "",
      termImage: "",
    });
    toast.info("Term Card Added !", {
      position: "top-right",
      pauseOnFocusLoss: false,
    });
  };

  const submitForm = (values) => {
    dispatch(addFlashCard(values));
    toast.success("FlashCard Created Successfully", {
      theme: "colored",
      position: "top-center",
      pauseOnFocusLoss: false,
    });
  };

  return (
    <div
      className="w-[78%] m-auto flex flex-col md:mt-4 "
      name="createFlashcardDiv"
    >
      <ToastContainer />
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm({ values: "" });
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div
              className="bg-white w-[100%] h-[30%] p-[15px] flex flex-col text-left pl-[25px] commonBorder"
              name="createGroupDiv"
            >
              {/* Its Input Field for Create a Group Name */}
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col">
                  <label htmlFor="groupName" className="mb-3">
                    Create Group
                  </label>
                  <Field
                    name="groupName"
                    id="groupName"
                    type="text"
                    placeholder="Group Name"
                    className="w-full md:w-96"
                  ></Field>

                  {/* Its a component to show error message for validation */}
                  <ErrorMessage name="groupName">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  {values.groupImage ? (
                    <div className="flex">
                      <img
                        className="text-center rounded-full h-28 w-28 mx-7 "
                        src={values.groupImage}
                        alt="groupImage"
                      />

                      {/* Its an image upload button */}
                      <ImCross
                        name="groupImgDelIcon"
                        className="mt-[10px] -ml-[20px] text-gray-400 hover:text-red-600 hover:text-xl hover:cursor-pointer "
                        onClick={() => setFieldValue("groupImage", null)} //selecting same image
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="groupImage"
                      className="groupImage order w-40 h-[3px] cursor-pointer px-2  ml-5 my-3 mt-[30px] p-4  border border-gray-300 flex  items-center justify-center rounded text-sm "
                    >
                      <MdOutlineUploadFile className=" text-[1.5em] text-blue-700" />
                      <span className="font-bold text-blue-700 text-[0.85em]">
                        Upload Image
                      </span>
                    </label>
                  )}

                  {/* It is input field for image upload */}
                  <input
                    className="hidden"
                    name="groupImage"
                    id="groupImage"
                    type="file"
                    onClick={(event) => (event.target.value = null)} //Selecting some image
                    onChange={(event) => {
                      event.preventDefault();
                      //Validation on image
                      if (
                        event.target.files[0] &&
                        !validateImage.includes(event.target.files[0].type)
                      ) {
                        toast.warning("please Upload in Imagr Format!", {
                          pauseOnFocusLoss: false,
                        });
                      } else if (event.target.files[0].size > 304800) {
                        toast.warning(
                          "Please Select Image size less than 300kb",
                          {
                            pauseOnFocusLoss: false,
                          }
                        );
                      } else {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("groupImage", reader.result);
                        };
                      }
                    }}
                  />
                </div>
              </div>
              {/* Group Descripttion */}
              <div className="flex flex-col" name="groupDescription">
                {/* It is an input field for Group Description */}
                <label htmlFor="groupDescription" className="mb-3">
                  Add Description
                </label>
                <Field
                  as="textarea"
                  name="groupDescription"
                  id="groupDescription"
                  placeholder="Group Description..."
                  className="w-full md:w-[70%]  h-28 resize-none scrollbar-hide"
                ></Field>

                {/* it is a component to show error message for validation */}
                <ErrorMessage name="groupDescription">
                  {(emsg) => <div className="error">{emsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            {/* Termcard start from here */}
            <div
              className=" w-[100%] mt-3 pt-1 bg-white commonBorder flex flex-col text-left pl-[25px] "
              name="createTermCardDiv"
            >
              <FieldArray
                name="term"
                render={(moreterm) => (
                  <div className="flex-col overflow-hidden bg-white rounded-md">
                    {values.term &&
                      values.term.map((term, index) => (
                        <div
                          name="termsDiv"
                          className="relative flex-row flex-wrap w-full mt-2 border-gray-400 md:flex md:space-x-4 md:items-center"
                          key={index}
                        >
                          <div className="w-8 h-8 px-2 text-xl text-center text-white bg-red-500 rounded-full">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            {/* It is input component for Termcard Name */}
                            <label
                              htmlFor={`term.${index}.termName`}
                              className="mb-3"
                            >
                              Enter Term
                            </label>
                            <Field
                              className="p-2 text-sm text-gray-900 rounded-md w-50 md:w-72 inField bg-gray-50"
                              name={`term.${index}.termName`}
                              id={`term.${index}.termName`}
                              value={term.termName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Name"
                            ></Field>

                            {/* It is component to show error message for validation */}
                            <ErrorMessage name={`term.${index}.termName`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          {/* It is input component for term card definition */}
                          <div className="flex flex-col">
                            <label
                              htmlFor={`term.${index}.termDefinition`}
                              className="mb-3"
                            >
                              Enter Definition*
                            </label>
                            <Field
                              as="textarea"
                              className="w-full h-10 p-2 text-sm text-gray-700 transition-all duration-500 rounded-md resize-none inField focus:h-24 md:w-72 bg-gray-50"
                              name={`term.${index}.termDefinition`}
                              id={`term.${index}.termDefinition`}
                              value={term.termDefinition}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Definition..."
                            ></Field>

                            {/* Its a component to show error message for validation */}
                            <ErrorMessage name={`term.${index}.termDefinition`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          {/* input component for Termcard Image */}
                          <div className="flex">
                            {term.termImage ? (
                              <div className="flex">
                                <img
                                  className="w-20 h-20 p-1 rounded-lg"
                                  src={term.termImage}
                                  alt=""
                                />
                                <ImCross
                                  className="mr-5 text-lg cursor-pointer hover:text-red-600"
                                  onClick={() =>
                                    setFieldValue(`term.${index}.termImage`, "")
                                  }
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.termImage`}
                                className="selectImage w-44 h-[44px] cursor-pointer px-3 ml-3  mt-7 py-1  flex  items-center justify-center rounded"
                              >
                                <span className="flex w-32 p-2 mx-auto font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white">
                                  Select Image
                                </span>
                              </label>
                            )}

                            {/* Input field for image upload */}
                            <input
                              onClick={(event) => (event.target.value = null)} //selecting some image
                              onChange={(event) => {
                                event.preventDefault();

                                //Validation on image
                                if (
                                  event.target.files[0] &&
                                  !validateImage.includes(
                                    event.target.files[0].type
                                  )
                                ) {
                                  toast.warning(
                                    "Please upload in Image Formate",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else if (
                                  event.target.files[0].size > 304800
                                ) {
                                  toast.warning(
                                    "Image size is very Large ! Please Select Image size less than 300kb",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else {
                                  const file = event.target.files[0];
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () => {
                                    setFieldValue(
                                      `term.${index}.termImage`,
                                      reader.result
                                    );
                                  };
                                }
                              }}
                              className="hidden"
                              id={`term.${index}.termImage`}
                              name={`term.${index}.termImage`}
                              type="file"
                            />

                            {/* Visible Delete btn in term if more than one */}
                            <div>
                              {values.term.length <= 1 ? null : (
                                <RiDeleteBin6Line
                                  className="text-[1.2em]  text-gray-400 m-3 cursor-pointer hover:text-red-600"
                                  onClick={() => {
                                    moreterm.remove(index);
                                    toast.warn("Term Card Deleted !", {
                                      position: "top-right",
                                      pauseOnFocusLoss: false,
                                    });
                                  }}
                                />
                              )}
                              {/* its an Edit button for edit a term  */}
                              {values.term.length <= 1 ? null : (
                                <label htmlFor={`term.${index}.termName`}>
                                  <BiEdit className="text-[1.3em] text-gray-400 m-2 cursor-pointer hover:text-yellow-500" />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* It's an Add More button for adding a new term */}
                    <div
                      className="inline-block mt-4 mb-6 font-bold text-blue-700 cursor-pointer mx-7"
                      onClick={() => addMoreTermS(values, moreterm)}
                    >
                      + Add More
                    </div>
                  </div>
                )}
              ></FieldArray>
            </div>

            {/* Its an Create button for Creating a flashcard */}
            <div className="relative pt-20">
              <button
                type="submit"
                className="absolute left-0 right-0 w-40 px-6 py-2 mx-auto mt-10 text-lg font-bold text-white transition-all ease-in-out bg-red-600 border-red-500 rounded-lg shadow-lg bottom-1 hover:bg-red-600 hover:text-white hover:-translate-y-1 "
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;
