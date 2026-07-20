import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAmdin } from "../../features/admin/adminThunk";
import { useAppDispatch } from "../../hooks/reduckHook";
import "../../css/admin/login.css";
import robotImage from "../../assets/image.png"
import { FaEye,FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShoePassword] = useState(false);
  const [errors,setErrors] = useState({email:"",password:""})
  const [loginError,setLoginError] = useState("");

  const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;
  setEmail(value);
  setLoginError("");

  let emailError = "";

  if (!value.trim()) {
    emailError = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
  ) {
    emailError = "Enter a valid email";
  }

  setErrors((prev) => ({
    ...prev,
    email: emailError,
  }));
};

const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;
  setPassword(value);
  setLoginError("");

  let passwordError = "";

  if (!value.trim()) {
    passwordError = "Password is required";
  } else if (value.length < 6) {
    passwordError = "Password must be at least 6 characters";
  }

  setErrors((prev) => ({
    ...prev,
    password: passwordError,
  }));
};

const validate = () => {
  const newErrors = {
    email: "",
    password: "",
  };

  let isValid = true;

  if (!email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    newErrors.email = "Enter a valid email";
    isValid = false;
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    if(!validate())return;

    try{
        const result = await dispatch(loginAmdin({ email, password }));

    if (loginAmdin.fulfilled.match(result)) {
      navigate("/admin/dashboard", { replace: true });
    }else{
        setLoginError("Invalid email or password")
    }
    }catch{
        setLoginError("Invaild email or password")
    }
  };



  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="logo">
          <img src="/logo.jpeg" alt="logo" className="logo-img"/>
          <h4>MediConnect</h4>
        </div>

        <div className="robot-placeholder">
         <img src={robotImage} alt="AI Robot"/>
        </div>

        <h2>Welcome Back Admin 👋</h2>

        <p>
          Access your health records, appointments and AI assistance securely.
        </p>

        <hr />

        <h4>Your Health, Simplified.</h4>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">
          <h1>SIGN IN</h1>
          <p>Welcome back, Please enter your details</p>

          <form onSubmit={handleSubmit} noValidate>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email&& <p className="errorMessage">{errors.email}</p>}

            <div className="password-field">
                <label>Password</label>
            <input
              type={showPassword?"text":"password"}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="eye-icon" onClick={()=>setShoePassword(!showPassword)}>
                {showPassword?<FaEyeSlash/>:<FaEye/>}
            </span>
            {errors.password && <p className="errorMessage">{errors.password}</p>}
            </div>
            {loginError && (<p className="errorMessage">{loginError}</p>)}

            <button type="submit">SIGN IN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;