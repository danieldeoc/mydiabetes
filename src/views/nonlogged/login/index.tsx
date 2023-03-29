import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from '../../../models/firebase/auth';

import { returningAlerts } from "../../../tools/alerts";

const theme = createTheme();

interface loginData_Interface {
    UserName?: string,
    UserPass?: string
}

const loginData:loginData_Interface = {
    UserName: undefined,
    UserPass: undefined
}

interface alert_Interface {
    Severity: "error" | "warning" | "info" | "success",
    Message: string,
    Time?: number
}

function LoginPage():JSX.Element {

    const [pageAlerts, setPagesAlert] = useState<JSX.Element | undefined>(undefined)
    //// form states
    const [error_EmailField, setError_EmailField] = useState<boolean>(false)
    const [error_PassField, setError_PassField] = useState<boolean>(false)

    // alert function
    function displayAlert(alertSettings:alert_Interface):void{
        const alertMessage = returningAlerts(alertSettings)
        setPagesAlert( alertMessage )
        console.log(alertMessage)
        setTimeout( () => {
            setPagesAlert(undefined)
        }, alertSettings.Time)

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();

        if( loginData.UserName != undefined && loginData.UserPass != undefined){
            await signIn( loginData.UserName, loginData.UserPass).then(
                (response) => {
                    if(response.Status == "success"){
                        window.location.href = "/dashboard";
                    } else {
                        let responseAlert:alert_Interface = {
                            Severity: response.Status,
                            Message: response.Message,
                            Time: 4000
                        }
                        displayAlert(responseAlert);
                    }
                }
            );
        }

    };

  return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
            
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://images5.alphacoders.com/316/316307.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                error={error_EmailField}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    let value:string = event.target.value;

                                    const regEx:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    const validMail:boolean = regEx.test(String(value).toLowerCase());

                                    if(value.length < 3 || !validMail){
                                        setError_EmailField(true)
                                    } else {
                                        setError_EmailField(false)
                                    }
                                    loginData.UserName = value;
                                }}
                            />


                        <TextField
                            margin="normal"
                            error={error_PassField}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                let value:string = event.target.value;
                                if(value.length < 4 || value.length > 8){
                                    setError_PassField(true)
                                    
                                } else {
                                    setError_PassField(false)
                                    
                                }
                                loginData.UserPass = value;
                            }}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>


                    </Box>
                </Box>
                {pageAlerts}
            </Grid>
        </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;