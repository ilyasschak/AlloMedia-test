import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import { resetPasswordSchema } from "../../schemas/AuthForms";
import { useFormik } from "formik";

const ResetPassword = () => {
  const { setNewPasswords, setToken,resetPassword } = useUser();
  const [reseted, setResested] = useState(false);
  const [submitIt, setSubmitIt] = useState(false);

  useEffect(() => {
    let token = new URLSearchParams(location.search).get("token");
    if (token) {
      setToken(token);
    }
  }, []);
  const onSubmit = (values, actions) => {
    setNewPasswords({
      password: values.password,
      password_confirmation: values.password_confirmation,
    });
    setSubmitIt(true);
  };

  useEffect(() => {
    if (submitIt) handleSubmition();
  }, [submitIt]);

  const handleSubmition = async () => {
    console.log("something");
    let response = await resetPassword();

    if (response.status == 201) {
      setResested(true);
    } 
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation:"",
    },
    validationSchema: resetPasswordSchema,
    onSubmit,
  });
  return (
    <div className="h-full flex flex-col gap-2 max-w-screen-xl justify-center items-center">
      
        {!reseted && (<>
        <h3 className="text-white font-bold text-3xl">Forget Password</h3>
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="bg-white W-full p-16 rounded-2xl flex flex-col gap-6"
        >
          
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
            placeholder="password"
          />
          {formik.errors.password_confirmation && (
            <div className="text-red-400 w-full text-start leading-3">
              {formik.errors.password_confirmation}
            </div>
          )}
          <input
            type="password"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password_confirmation"
            className={formik.errors.password_confirmation ? "invalid bg-red-300" : ""}
            placeholder="password_confirmation"
          />

          <button type="submit" className="w-full text-white bg-brand">
            submit
          </button>
        </form>
        </>
      )}
      {reseted && <div className="py-12 px-28 text-brand bg-white rounded-sm ">password reseted successfully</div>}
  </div>
  )
};

export default ResetPassword;
