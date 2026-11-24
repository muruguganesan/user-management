import { useForm } from 'react-hook-form';
import styles from './Register/register.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormDataType } from '../schemas/authSchemas';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button/Button';
import LoginSocial from '../components/LoginSocial/LoginSocial';
import google from "/public/google.png";
import facebook from "/public/facebook.png";
import loginBg from "/public/login_bg.png";
import women from "/public/women.png";
import useLoginUser from '../hooks/reactQueryHooks/useLoginUser';
import { useNavigate } from 'react-router-dom';
import ReusableSnackbar from '../components/ReusableSnackbar/ReusableSnackbar';



const Login = () => {
  const { mutate: LoginUser } = useLoginUser();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<LoginFormDataType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(loginSchema)
  });
  const [passwordTypes, setPasswordTypes] = useState({
    passwordType: "password"
  });
  console.log("passwordTypes", passwordTypes);
  const handlePasswordType = (type: string, value: string) => {
    setPasswordTypes((prev) => ({ ...prev, [type]: value }))
  }
  const [popOverOpen, setPopOverOpen] = useState(false);
  const navigate = useNavigate();
  // Snackbar functions
  const popOverOpenFn = () => setPopOverOpen(true);
  const popOverCloseFn = () => setPopOverOpen(false);


  // Common success callback
  const handleSuccess = () => {
    popOverOpenFn();
    watch();
    reset();
    setTimeout(() => {
      navigate("/profile", {replace: true});
    }, 2000);
  };
  const onSubmitFn = (data: LoginFormDataType) => {
    console.log("data", data);
    LoginUser(data, {
      onSuccess: handleSuccess,
      onError: (error) => {
        console.error("Failed to Login user", error);
      }

    });
  }

  const handleResetFn = () => {
    watch();
    reset();
  };
  return (
    <div className="login">
      <div className="row">
        <div className="col_2">
          <div className={styles.login_form_cont}>
            <h2 className={styles.text_center}>Login</h2>
            <p className={styles.text_center}>Login to explore?</p>
            <form onSubmit={handleSubmit(onSubmitFn)}>

              {/* Email */}
              <div className={`${styles.form_wrap} ${styles.login_form_wrap}`}>
                <div className={styles.input_wrap}>
                  <input {...register("email")} placeholder="Email" autoComplete="on" />
                  <Mail className={styles.input_left_icon} size={20} />
                </div>
                <p className={styles.error_class}>{errors.email?.message}</p>
              </div>

              {/* Password */}
              <div className={`${styles.form_wrap} ${styles.login_form_wrap}`}>
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

              <div className={styles.register_btn_gps}>
                <Button text="Submit" />
                <Button text="Reset" type="button" onClick={handleResetFn} bgColor="red" />
              </div>

            </form>

            <div className={styles.login_others}><div className={styles.login_others_in}><strong>Login</strong> with Others</div></div>
            <div className={styles.social_login_btn}>
              <LoginSocial img={google} />
            </div>
            <div className={styles.social_login_btn}>
              <LoginSocial img={facebook} />
            </div>


          </div>

        </div>
        <div className="col_2">
          <div style={{ backgroundImage: `url(${loginBg})` }} className={styles.login_bg_cont}>
            <div className={styles.women_img_wrap}>
              <div className={styles.login_text}>Login to see exciting works !!!</div>
              <img src={women} alt="" className={styles.women_img} />

            </div>

          </div>

        </div>
      </div>
      <ReusableSnackbar
        isOpen={popOverOpen}
        onClose={popOverCloseFn}
      >
        <span>User Login Successfully</span>
      </ReusableSnackbar>
    </div>
  )
}

export default Login