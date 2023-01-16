import {Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { Google } from "@mui/icons-material";
import { Grid, TextField, Typography, Button, Link, Alert } from "@mui/material"; 
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks'
import { chekingAuthentication, startGoogleSignIn, startLogin } from '../../store/auth';
import { useMemo } from 'react';

 const formData = {
    email: 'jpereirap@google.com',
    password: '123456'
  }

export const LoginPage = () => {


  const { status, errorMessage } = useSelector ( state => state.auth ); 
  const dispatch = useDispatch(); 
  const { email, password, onInputChange} = useForm(formData )
 


  const isAuthenticating = useMemo(() => status === 'checking', [status])
  const onSubmit = ( event ) =>{
    event.preventDefault(); 
    console.log("conventional login ");
    dispatch(startLogin({email, password}));

  }

  const onGoogleSignIn = () =>{ 
    console.log('On Google Sign In '); 
    dispatch( startGoogleSignIn( ));  
  }

  const onLogin = () =>{
    
  }

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
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
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                onClick={onLogin}
                type="submit"
                variant="contained"
                fullWidth
              >
                <Typography sx={{ ml: 1 }}> Login </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}
