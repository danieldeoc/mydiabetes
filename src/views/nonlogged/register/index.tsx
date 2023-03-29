import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreateUser } from '../../../models/firebase/auth';

import { returningAlerts } from "../../../tools/alerts";

const theme = createTheme();

interface RegisterData_Interface {
    Name: undefined | string,
    Email: undefined | string,
    Pass: undefined | string
}
interface alert_Interface {
    Severity: "error" | "warning" | "info" | "success",
    Message: string
}

/// form data
const RegisterData:RegisterData_Interface = {
    Name: undefined,
    Email: undefined,
    Pass: undefined
}

function RegisterPage <FC>():JSX.Element{

    const [pageAlerts, setPagesAlert] = useState<JSX.Element | undefined>(undefined)

    //// form states
    const [error_NameField, setError_NameField] = useState<boolean>(false)
    const [error_EmailField, setError_EmailField] = useState<boolean>(false)
    const [error_PassField, setError_PassField] = useState<boolean>(false)
    const [aggred, setAggred] = useState<boolean>(false)

    /// helpers
    const [helper_password, setHelper_password] = useState<JSX.Element | undefined>(undefined);

    // alert function
    function displayAlert(severity:"error" | "warning" | "info" | "success", message:string, time:number):void{
        if(!time){
            time = 4000;
        }

        let alert:alert_Interface = {
            Severity: severity,
            Message: message
        }

        const alertMessage = returningAlerts(alert)
        setPagesAlert( alertMessage )
        setTimeout( () => {
            setPagesAlert(undefined)
        }, time)

    }
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        let terms = data.get('agreedWithTerms')
        
        console.log("Data: ", RegisterData)
        if(terms) {
            if(
                RegisterData.Name != undefined && !error_NameField &&
                RegisterData.Email != undefined && !error_EmailField &&
                RegisterData.Pass != undefined && !error_PassField
            ){
                console.log("data accepeted")

                await CreateUser(RegisterData).then( (response) => {
                    displayAlert(response.Status, response.Message, 4000);
                    setTimeout( ():void => {
                        window.location.href = "dashboard";
                    }, 4000)
                })

            } else {
                displayAlert("error", "Please, check all form fields", 4000)
            }
        } else {
            displayAlert("error", "You need to accept or terms in order to procede.", 4000)
        }
    }


    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    error={error_NameField}
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        let value:string = event.target.value;
                                        var regex:any = /\d/g;
                                        const hasNumbers:boolean = regex.test(value);
                                        if(value.length < 3 || hasNumbers){
                                            setError_NameField(true)
                                        } else {
                                            setError_NameField(false)
                                        }
                                        RegisterData.Name = value;
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={error_EmailField}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        let value:string = event.target.value;

                                        const regEx:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                        const validMail:boolean = regEx.test(String(value).toLowerCase());

                                        if(value.length < 3 || !validMail){
                                            setError_EmailField(true)
                                        } else {
                                            setError_EmailField(false)
                                        }
                                        RegisterData.Email = value;
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={error_PassField}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        let value:string = event.target.value;
                                        if(value.length < 4 || value.length > 8){
                                            setError_PassField(true)
                                            setHelper_password(<FormHelperText id="component-error-text">Password must have 4 to 8 characteres</FormHelperText>)
                                        } else {
                                            setError_PassField(false)
                                            setHelper_password(undefined)
                                        }
                                        RegisterData.Pass = value;
                                    }}
                                />
                                {helper_password}
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox name='agreedWithTerms' value="true" color="primary" onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {

                                        if(event.target.checked){
                                            setAggred(true) 
                                        } else {
                                            setAggred(false) 
                                        }
                                     }} />}
                                    label="I agrre with terms and conditions to use this app."
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={!aggred}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {pageAlerts}
        </ThemeProvider>
    )
}

export default RegisterPage;




