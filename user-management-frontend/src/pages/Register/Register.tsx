import { useForm } from "react-hook-form";
import styles from "./register.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormDataType } from "../../schemas/authSchemas";
import Button from "../../components/Button/Button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import useRegister from "../../hooks/reactQueryHooks/useRegister";
import { useNavigate } from "react-router-dom";
import ReusableSnackbar from "../../components/ReusableSnackbar/ReusableSnackbar";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<RegisterFormDataType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  // React Query mutations
  const { mutate: registerUser } = useRegister();
  const [popOverOpen, setPopOverOpen] = useState(false);
  const navigate = useNavigate();
    // Snackbar functions
  const popOverOpenFn = () => setPopOverOpen(true);
  const popOverCloseFn = () => setPopOverOpen(false);


  // Common success callback
  const handleSuccess = () => {
    popOverOpenFn();

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const onSubmitFn = (data: RegisterFormDataType) => {
    // console.log(data);
    registerUser(data, {
      onSuccess: handleSuccess,
      onError: (error) => {
        console.error("Failed to register user", error);
      }
    });
    //    try {
    //   const response = await registerUser(data);

    //   console.log(response.message);

    //   reset();

    // } catch (error) {
    //   console.error("Registration failed", error);
    // }
  }
  const handleResetFn = () => {
    watch();
    reset();
  };
  const [passwordTypes, setPasswordTypes] = useState({
    passwordType: "password",
    confirmPasswordType: "password"
  });
  console.log("passwordTypes", passwordTypes);
  const handlePasswordType = (type: string, value: string) => {
    setPasswordTypes((prev) => ({ ...prev, [type]: value }))
  }
  return (
    <div className={styles.register}>
      <div className="c">
        <div className={styles.register_in}>


          <div className={styles.register_rgt}>
            <h2 className={styles.text_center}>CREATE ACCOUNT</h2>
            <p className={styles.text_center}>How do i get started at?</p>
            <form onSubmit={handleSubmit(onSubmitFn)}>

              {/* Name */}
              <div className={styles.form_wrap}>
                <div className={styles.input_wrap}>
                  <input {...register("name")} placeholder="Username" autoComplete="on" />
                  <User className={styles.input_left_icon} size={20} />
                </div>
                <p className={styles.error_class}>{errors.name?.message}</p>
              </div>

              {/* Email */}
              <div className={styles.form_wrap}>
                <div className={styles.input_wrap}>
                  <input {...register("email")} placeholder="Email" autoComplete="on" />
                  <Mail className={styles.input_left_icon} size={20} />
                </div>
                <p className={styles.error_class}>{errors.email?.message}</p>
              </div>

              {/* Password */}
              <div className={styles.form_wrap}>
                <div className={`${styles.input_wrap} ${styles.password_input_wrap}`}>
                  <input {...register("password")} placeholder="Password" autoComplete="on" type={passwordTypes.passwordType} />
                  <Lock className={styles.input_left_icon} size={20} />
                  <div className={styles.eye_wrap}>
                    <button className={`${styles.eye_open} ${passwordTypes.passwordType === "password" ? styles.eye_active : ""}`} onClick={() => handlePasswordType("passwordType", "password")} type="button">
                      <Eye />
                    </button>
                    <button className={`${styles.eye_close}  ${passwordTypes.passwordType === "text" ? styles.eye_active : ""}`} onClick={() => handlePasswordType("passwordType", "text")} type="button">
                      <EyeOff />
                    </button>
                  </div>
                </div>
                <p className={styles.error_class}>{errors.password?.message}</p>
              </div>

              {/* Confirm Password */}
              <div className={styles.form_wrap}>
                <div className={`${styles.input_wrap}  ${styles.password_input_wrap}`}>
                  <input {...register("confirmPassword")} placeholder="Confirm Password" autoComplete="on" type={passwordTypes.confirmPasswordType} />
                  <Lock className={styles.input_left_icon} size={20} />
                  <div className={styles.eye_wrap}>
                    <button className={`${styles.eye_open} ${passwordTypes.confirmPasswordType === "password" ? styles.eye_active : ""}`} onClick={() => handlePasswordType("confirmPasswordType", "password")} type="button">
                      <Eye />
                    </button>
                    <button className={`${styles.eye_close}  ${passwordTypes.confirmPasswordType === "text" ? styles.eye_active : ""}`} onClick={() => handlePasswordType("confirmPasswordType", "text")} type="button">
                      <EyeOff />
                    </button>
                  </div>
                </div>
                <p className={styles.error_class}>{errors.confirmPassword?.message}</p>
              </div>

              <div className={styles.register_btn_gps}>
                <Button text="Submit" />
                <Button text="Reset" type="button" onClick={handleResetFn} bgColor="red" />
              </div>


            </form>

          </div>
        </div>
      </div>

              <ReusableSnackbar
          isOpen={popOverOpen}
          onClose={popOverCloseFn}
        >
         <span>User Registered Successfully</span>
        </ReusableSnackbar>

    </div>
  )
}

export default Register