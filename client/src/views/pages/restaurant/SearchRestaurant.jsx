import { Formik, Form, Field, ErrorMessage } from "formik";
import liv3 from "../../../assets/images/help.jpg"
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import PopupsController from "../../common/PopupsController";
import RestaurantsMap from "./RestaurantsMap";
import ResultsPage from "./ResultsPage";
// import ErrorAlert from '../../components/alerts/errorAlert';

export default function SearchRestaurant() {
  // const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isSubmitted, setSubmitted] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const validationSchema = Yup.object({
    searchKeyword: Yup.string().required("search keyword is required!"),
  });

  function search(values) {
    axios
      .post("http://localhost:3000/api/searchRestaurants", {
        searchKeyword: values.searchKeyword,
      })
      .then(function (response) {
        setResults(response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <style>
        {`
        body {
          background: url("./src/assets/images/help.jpg") no-repeat center center fixed;
          background-size: cover;
        }
      `}
      </style>

      {!isSubmitted ? (
        <Formik
          initialValues={{
            searchKeyword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={search}
        >
          {() => (
            <Form className="flex flex-col lg:flex-row w-auto m-auto px-10 bg-red-100">
              {/* {errorMessage && <ErrorAlert message={errorMessage} />} */}
              <div className="flex flex-col">
                <Field
                  id="searchKeyword"
                  name="searchKeyword"
                  type="text"
                  placeholder="restaurant name or cuisine type"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <ErrorMessage name="searchKeyword" component="div" />
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={openModal}
                  className="text-white transform-none bg-orange-600"
                >
                  Search by Map
                </button>
                <PopupsController
                  showModal={isModalOpen}
                  closeModal={closeModal}
                  bodyContent={<RestaurantsMap />}
                  headerContent={"Choose a Restaurant on Map"}
                  footerContent={""}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className=" text-white bg-orange-800 transform-none"
                >
                  Search
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <ResultsPage results={results} />
      )}
    </>
  );
}
