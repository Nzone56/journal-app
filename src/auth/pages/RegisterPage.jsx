import { Link as RouterLink } from "react-router-dom";
import { Grid, TextField, Typography, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUser } from "../../store/auth";


const formData = {
  email: "",
  password: "",
  displayName: ''
};

const formValidations = {
  email: [(value => value.includes('@')),'Must provide and email'],
  password: [ (value) => value.length >= 6, 'Passwords must have at least 6 characters'],
  displayName: [ (value) => value.length >= 1, 'Name is required' ]
}
export const RegisterPage = () => {


  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {status, errorMessage } = useSelector(state => state.auth); 
  const isCheckingAuthentication = useMemo( ( ) => status === 'checking' [status]);

  const { displayName, email, password, onInputChange, formState, isFormValid, 
    displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations);

   const onSubmit = ( event ) => {
    event.preventDefault(); 
    setFormSubmitted(true)

    
    if (!isFormValid) return; 
    dispatch( startCreatingUser(formState) ); 

    
   }

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Julian Pereira"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={
                !!displayNameValid && formSubmitted ? displayNameValid : ""
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={!!emailValid && formSubmitted ? emailValid : ""}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="******"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={!!passwordValid && formSubmitted ? passwordValid : ""}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                <Typography sx={{ ml: 1 }}> Create Account </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> Alredy have an account ? </Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              {" "}
              Log in{" "}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
