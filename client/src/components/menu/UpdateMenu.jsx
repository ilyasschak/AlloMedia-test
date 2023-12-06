/*
- tasks : 
    + get the data
    + show the data 
    + update the data (check conditions)
*/

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useUser } from "../../contexts/userContext";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateMenu() {
  const menuId = useParams().id;
  const navigate = useNavigate();
  const { user, getUser } = useUser();
  const [restaurants, setRestaurants] = useState([]);
  const [menu, setMenu] = useState({});
  const [plats, setPlats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();

    (async () => {
      await axios
        .post("http://localhost:3000/api/menu/updatePage", {
          menuId: menuId,
        })
        .then((response) => {
          setMenu(response.data.menu);
          setPlats(response.data.plats);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    })();
  }, []);

  useEffect(() => {
    getRestaurants();
  }, [user]);

  function getRestaurants() {
    axios
      .post(`http://localhost:3000/api/ownerRestaurants`, {
        owner_id: user._id,
      })
      .then(function (response) {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const articleSchema = Yup.object().shape({
    Plat: Yup.string().required("Name is required"),
    prix: Yup.number().required("Price is required"),
    description: Yup.string(),
  });

  const validationSchema = Yup.object().shape({
    menuName: Yup.string().required("Menu Name is required"),
    articles: Yup.array().of(articleSchema),
  });

  function updateMenu(values) {
    const isUnchanged =
      values.menuName === menu.nom &&
      values.restaurant === menu?.restaurant?._id &&
      values.articles.length === plats.length &&
      values.articles.every(
        (article, index) =>
          plats[index] &&
          article.Plat === plats[index].Plat &&
          article.prix === plats[index].prix &&
          article.description === plats[index].description
      );

    if (isUnchanged) {
      navigate("/myMenu");
    } else {
      axios
        .post("http://localhost:3000/api/menu/updateMenu", {
          menu: {
            id: values.menuId,
            name: values.menuName,
            restaurant: values.restaurant,
          },
          articles: values.articles,
        })
        .then((response) => {
          if (response) {
            navigate("/myMenu");
            console.log("1");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  if (isLoading) return <h1>Loading...</h1>;

  return restaurants.length !== 0 ? (
    <Formik
      initialValues={{
        menuId: menu._id,
        menuName: menu.nom,
        articles: plats,
        restaurant: menu?.restaurant?._id,
      }}
      validationSchema={validationSchema}
      onSubmit={updateMenu}
    >
      {({ values }) => (
        <Form className="m-auto">
          {/* {errorMessage && <ErrorAlert message={errorMessage} />} */}
          <div className="flex flex-col">
            <label htmlFor="menuName">Menu Name:</label>
            <Field
              id="menuName"
              name="menuName"
              type="text"
              placeholder="menu name"
            />
            <ErrorMessage name="menuName" component="div" />
          </div>

          <label htmlFor="restaurant">Restaurants:</label>
          {restaurants.length !== 0 ? (
            <div className="flex flex-col">
              <Field as="select" id="restaurant" name="restaurant">
                {restaurants.map((restaurant) => (
                  <option key={restaurant._id} value={restaurant._id}>
                    {restaurant.nom}
                  </option>
                ))}
              </Field>
            </div>
          ) : (
            <div className="text-red-700">You don't have any restaurants!</div>
          )}

          <FieldArray name="articles">
            {({ push, remove }) => (
              <div className="flex flex-col">
                <h3>Articles</h3>
                {values.articles.map((article, index) => (
                  <div key={index} className="flex flex-col">
                    <label htmlFor={`articles.${index}.Plat`}>Plat:</label>
                    <Field
                      id={`articles.${index}.Plat`}
                      name={`articles.${index}.Plat`}
                      type="text"
                      placeholder="Plat"
                    />
                    <ErrorMessage
                      name={`articles.${index}.Plat`}
                      component="div"
                    />

                    <label htmlFor={`articles.${index}.prix`}>Prix:</label>
                    <Field
                      id={`articles.${index}.prix`}
                      name={`articles.${index}.prix`}
                      type="number"
                      placeholder="prix"
                    />
                    <ErrorMessage
                      name={`articles.${index}.prix`}
                      component="div"
                    />

                    <label htmlFor={`articles.${index}.description`}>
                      Description:
                    </label>
                    <Field
                      id={`articles.${index}.description`}
                      name={`articles.${index}.description`}
                      type="text"
                      placeholder="description"
                    />
                    <ErrorMessage
                      name={`articles.${index}.description`}
                      component="div"
                    />

                    <button type="button" onClick={() => remove(index)}>
                      Remove Article
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => push({ Plat: "", prix: "", description: "" })}
                >
                  Add Article
                </button>
              </div>
            )}
          </FieldArray>

          <button type="submit" className=" text-white bg-brand transform-none">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-red-700">You don't have any restaurants!</p>
        <p>Add some and come back.</p>
      </div>
    </div>
  );
}
