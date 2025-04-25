import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/joy/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../store/slices/usersSlice";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { logIn, logOut } from "../store/slices/authSlice";
import PageContainer from "../components/PageContainer";
import FormHeader from "../components/header/FormHeader";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import Footer from "../components/footer/Footer";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector((state) => state.auth.user);
  const [redirecting, setRedirecting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const redirectTimeout = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      pass: "",
      email: "",
    },
  });

  const handleLogout = () => {
    setIsLoggingOut(true);
    dispatch(logOut());
    localStorage.removeItem("currentUser");
    localStorage.removeItem("users");
    navigate("/");
    if (redirectTimeout.current) {
      clearTimeout(redirectTimeout.current);
      redirectTimeout.current = null;
    }
  };

  const onSubmit = (data) => {
    const { name, pass, email } = data;
    const foundUser = users.find(
      (u) => u.name === name && u.pass === pass && u.email === email
    );
    if (foundUser) {
      dispatch(logIn(foundUser));
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/users");
    } else {
      setLoginError("Invalid user name, password or email. Try again!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    if (currentUser && !isLoggingOut) {
      setRedirecting(true);
      redirectTimeout.current = setTimeout(() => navigate("/users"), 1500);
      return () => clearTimeout(redirectTimeout.current);
    } else {
      setRedirecting(false);
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
        redirectTimeout.current = null;
      }
    }
  }, [currentUser, navigate, isLoggingOut]);

  return (
    <PageContainer>
      <AnimatePresence>
        <motion.div
          className="auth-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          {redirecting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="redirect-message"
            >
              <h2>Redirecting to dashboard...</h2>
            </motion.div>
          ) : (
            <>
              <div className="form-header">
                <FormHeader currentUser={currentUser} onLogout={handleLogout} />
              </div>
              <div className="form-main">
                <div className="form-container">
                  <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Username is required",
                        pattern: {
                          value: /^[a-zA-Zа-яА-ЯіІїЇєЄ0-9_-]{1,20}$/,
                          message:
                            "Only Latin and Cyrillic letters, numbers, hyphens and underscores are allowed.",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Username"
                            variant="outlined"
                            color="primary"
                            onKeyDown={handleKeyPress}
                          />
                          {errors.name && (
                            <p className="error-message">
                              {errors.name.message}
                            </p>
                          )}
                        </>
                      )}
                    />

                    <Controller
                      name="pass"
                      control={control}
                      rules={{
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            "The password must contain at least 6 characters, including an uppercase letter and a number.",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Password"
                            variant="outlined"
                            color="primary"
                            type="password"
                            onKeyDown={handleKeyPress}
                          />
                          {errors.pass && (
                            <p className="error-message">
                              {errors.pass.message}
                            </p>
                          )}
                        </>
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          message: "Invalid email format",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Email"
                            variant="outlined"
                            color="primary"
                            type="email"
                            onKeyDown={handleKeyPress}
                          />

                          {errors.email && (
                            <span className="error-message">
                              {errors.email.message}
                            </span>
                          )}
                          <Button
                            className="btn-submit"
                            type="submit"
                            variant="solid"
                            size="lg"
                          >
                            Submit
                          </Button>
                        </>
                      )}
                    />

                    <AnimatePresence>
                      {loginError && (
                        <motion.p
                          className="error-message"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {loginError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
              <Footer />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  );
};

export default Form;
