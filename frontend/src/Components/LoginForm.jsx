import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Typography, InputAdornment, Button, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { messages } from '../config/Message';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTxtFieldErr, setEmailTxtFieldErr] = useState('');
  const [passTxtFieldErr, setPassTxtFieldErr] = useState([]);

  const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegx = /^[a-zA-Z0-9_()@.!#]+$/;
  const hasCaptialRegex = /[A-Z]/;

  //useCallback memoizes the function so it doesn’t get recreated on every render
  //togglePasswordVisibility - to show and hide password
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevs) => !prevs);
  }, []);

  const isValidate = () => {
    let isValid = true;
    let passwordErr = [];

    if (email?.trim() === '') {
      setEmailTxtFieldErr(messages?.emailField);
      isValid = false;
    } else if (!emailRegx?.test(email)) {
      setEmailTxtFieldErr(messages?.emailRegxErr);
      isValid = false;
    }

    if (password?.trim() === '') {
      passwordErr.push(messages?.passwordFiled);
      setPassTxtFieldErr(passwordErr);
      isValid = false;
      return isValid;
    }

    if (!passwordRegx?.test(password.trim())) {
      passwordErr.push(messages?.passRegex1);
      isValid = false;
    }
    if (!hasCaptialRegex?.test(password)) {
      passwordErr.push(messages?.passRegex2);
      isValid = false;
    }
    if (password?.trim()?.length < 8) {
      passwordErr.push(messages?.passRegex3);
      isValid = false;
    }
    setPassTxtFieldErr(passwordErr);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isValidate()) return;
    setEmail('');
    setPassword('');
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <TextField
          placeholder="Enter EmailId"
          aria-label="Email Address"
          sx={{ width: '100%', mb: 2 }}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailTxtFieldErr('');
          }}
          error={!!emailTxtFieldErr}
          helperText={emailTxtFieldErr}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" sx={{ pr: 1 }}>
                <MailIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          placeholder="Enter Password"
          sx={{ width: '100%', mb: 2 }}
          aria-label="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPassTxtFieldErr([]);
          }}
          error={!!passTxtFieldErr?.length}
          helperText={
            passTxtFieldErr?.length > 0 &&
            passTxtFieldErr.map((err, index) => (
              <Typography variant="caption" color="error" display="block" key={index}>
                {err}
              </Typography>
            ))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pr: 1 }}>
                <PasswordIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Forgot Password? <Link to="/">Click here</Link>
        </Typography>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
