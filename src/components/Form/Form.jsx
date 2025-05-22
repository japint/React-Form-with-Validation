import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./Form.module.css";

export const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is required!"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required!"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .min(18, "You must be at least 18")
      .required("Age is required!"),
    password: yup
      .string()
      .min(4, "Must be at least 4 characters")
      .max(8, "Must be at most 8 characters")
      .required("Password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Hello World", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.inputContainer}>
        {errors.fullName && (
          <div className={classes.errorBox}>{errors.fullName.message}</div>
        )}
        <input
          type="text"
          placeholder="Full Name..."
          {...register("fullName")}
          className={classes.input}
        />
      </div>

      <div className={classes.inputContainer}>
        {errors.email && (
          <div className={classes.errorBox}>{errors.email.message}</div>
        )}
        <input
          type="text"
          placeholder="Email..."
          {...register("email")}
          className={classes.input}
        />
      </div>

      <div className={classes.inputContainer}>
        {errors.age && (
          <div className={classes.errorBox}>{errors.age.message}</div>
        )}
        <input
          type="text"
          placeholder="Age..."
          {...register("age")}
          className={classes.input}
        />
      </div>

      <div className={classes.inputContainer}>
        {errors.password && (
          <div className={classes.errorBox}>{errors.password.message}</div>
        )}
        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
          className={classes.input}
        />
      </div>

      <div className={classes.inputContainer}>
        {errors.confirmPassword && (
          <div className={classes.errorBox}>
            {errors.confirmPassword.message}
          </div>
        )}
        <input
          type="password"
          placeholder="Confirm Password..."
          {...register("confirmPassword")}
          className={classes.input}
        />
      </div>

      <input type="submit" className={classes.submit} />
    </form>
  );
};

export default Form;
