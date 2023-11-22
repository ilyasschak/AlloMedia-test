import { createContext, useState, useContext } from "react";
import api from "../api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [newPasswords, setNewPasswords] = useState({});
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");

  const register = async () => {
    let response;
    try {
      console.log(user, "from register");
      response = await api.post("/auth/register", user);
      console.log(response);
    } catch (error) {
      response = error.response
    }
    return response;
  };

  const getUser = async () => {
    let response;

    try {
      response = await api.get("/auth/me");
      if (response.data.user) {
        console.log(response.data);
        setUser(response.data.user);
      } else {
        setUser({});
      }
    } catch (error) {
      if (error.response.status == 401) {
        setUser({});
        console.log(error.response.data);
        console.log("should login");
      }
    }
  };

  const login = async () => {
    let response;
    try {
      response = await api.post("/auth/login", user);
      if (response.status == 200) getUser();
    } catch (error) {
      response = error.response;
    }
    return response;
  };

  const logout = async () => {
    let response;
    try {
      response = await api.post("/auth/logout");
      if (response.data.status == 200) setUser({});
    } catch (error) {
      console.log(error.response.data);
    }
    return response;
  };

  const forgetPassword = async () => {
    let response;
    try {
      console.log(user.email);
      response = await api.post("/auth/forgetPassword", { email: user.email });
      console.log(response);
      if (response.status == 200) setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  const resetPassword = async () => {
    let response;
    try {
      console.log(newPasswords);
      response = await api.post(`/auth/resetPassword?token=${token}`, newPasswords);
      console.log(response);
      if (response.status == 200) setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  const sendVerification = async () => {
    let response;
    try {
      response = await api.post("/auth/sendVerification", {
        email: user.email,
      });

      if (response.status == 200) setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
    return response;
  };

  const verifyEmail = async (value) => {
    let response;
    try {
      response = await api.post(`/auth/verifyEmail?token=${value}` );

      if (response.status == 200) setMessage(response.data.message);
    } catch (error) {
      response = error.response
      console.log(error);
    }
    return response;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        message,
        setUser,
        register,
        getUser,
        login,
        logout,
        sendVerification,
        forgetPassword,
        setNewPasswords,
        setToken,
        resetPassword,
        verifyEmail
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
