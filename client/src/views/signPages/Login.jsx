import { useState, useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/AuthForms";
import { NavLink, useNavigate } from "react-router-dom";
import liv from "../../assets/images/help.jpg";

const Login = () => {
  const { user, setUser, login } = useUser();
  const [logItIn, setLogItIn] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    setUser({
      email: values.email,
      password: values.password,
      full_name: "Ossama",
    });
    setLogItIn(true);
  };

  useEffect(() => {
    if (logItIn) handleLogin();
  }, [logItIn]);

  const handleLogin = async () => {
    let response = await login();

    console.log(response.data, "hello");
    console.log(response.status, "hello");
    if (response.status != 200) {
      setMessage(response.data.message);
    } else {
      navigate("/me");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="relative w-full h-full flex flex-col gap-2  justify-center items-center">
      <img src={liv} className="absolute top-0 left-0 w-full h-full z-[-1]" />
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className=" W-full p-16 rounded-2xl flex flex-col gap-6  bg-orange-600 bg-opacity-30 shadow-2xl shadow-[#a3a3a3]"
      >
        <h3 className="text-white font-bold text-4xl">Login</h3>
        {message && (
          <div className=" text-red-700 bg-red-200 p-2 border border-red text-center text-bold  w-full leading-3">
            {message}
          </div>
        )}
        {formik.errors.message && (
          <div className="text-red-400 p-2 border border-red text-center text-bold  w-full leading-3">
            {formik.errors.message}
          </div>
        )}
        {formik.errors.email && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.email}
          </div>
        )}
        <input
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          className={
            formik.errors.email
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          placeholder="Email"
        />
        {formik.errors.password && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.password}
          </div>
        )}
        <input
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          className={
            formik.errors.password
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          placeholder="Password"
        />

        <button type="submit" className="w-full text-white bg-orange-700">
          Login
        </button>
        <NavLink to={"/forgetPassword"}>
          <span className="text-white font-bold">Forget Password ?</span>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
