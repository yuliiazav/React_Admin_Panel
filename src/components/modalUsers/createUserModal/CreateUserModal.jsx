import React from "react";
import { Button, Input } from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/slices/usersSlice";

const CreateUserModal = ({ onDestroy, onCreateSuccess, onCreateError }) => {
  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    try {
      dispatch(addUser(data));
      onCreateSuccess();
      onDestroy();
    } catch (err) {
      onCreateError(err.message || "Error creating new user");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <i className="close" onClick={onDestroy}>
          X
        </i>
        <h2>Create a new user</h2>
        <form className="inputs" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Zа-яА-ЯіІїЇєЄ0-9_-]{3,20}$/,
                message:
                  "Latin and Cyrillic letters, numbers, hyphens and underscores are allowed. From 3 to 20 characters",
              },
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="Username"
                  variant="soft"
                  className="modal-input"
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="pass"
            control={control}
            rules={{
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "The password must contain at least 6 characters, including an uppercase letter and a number.",
              },
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  type="password"
                  placeholder="Password"
                  variant="soft"
                  className="modal-input"
                />
                {errors.pass && (
                  <p className="error-message">{errors.pass.message}</p>
                )}
              </div>
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
              <div>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  variant="soft"
                  className="modal-input"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>
            )}
          />

          <Button type="submit" variant="solid">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
