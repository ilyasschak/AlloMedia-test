import { useState, useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/AuthForms";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser, login } = useUser();
  const [logItIn, setLogItIn] = useState(false);
  const [ message,setMessage] = useState('');

  const navigate = useNavigate();
  
  const onSubmit = (values, actions) => {
    setUser({
      email: values.email,
      password: values.password,
      full_name: "Ossama",
    });
    setLogItIn(true)
  };

  useEffect(() => {
    if(logItIn) handleLogin();
  }, [logItIn]);

  const handleLogin = async ()=>{
    let response = await login();

    console.log(response.data,"hello");
    console.log(response.status,"hello");
    if(response.status != 200) {
      setMessage(response.data.message);
    }else{
      navigate('/me');
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-screen-xl justify-center items-center">
      <h3 className="text-white font-bold text-3xl">Login</h3>
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="bg-white W-full p-16 rounded-2xl flex flex-col gap-6"
      >
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
          className={formik.errors.email ? "invalid bg-red-300" : ""}
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
          className={formik.errors.password ? "invalid bg-red-300" : ""}
          placeholder="Password"
        />
        
        <button type="submit" className="w-full text-white bg-brand">
          Login
        </button>
        <NavLink to={'/forgetPassword'}><span>Forget Password ?</span></NavLink>
      </form>
    </div>
  );
};

export default Login;
