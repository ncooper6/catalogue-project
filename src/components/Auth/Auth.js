import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {signin, signup} from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

const initialState = {firstName: '', lastName:'', email: '', password: '', confirmPassword: ''};//intial state
const Auth = () => {
    const [formData, setFormData] = useState(initialState);//state that uses form data
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    
    const [showPassword,setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);//toggle so users can hide and show their password
    
    const switchMode = () => {//switches between sign in and sign up 
        setFormData(initialState);
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();//prevents page reload

        if(isSignUp) {//checks whether a user is signing in or signing up
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});//sets the form data on change
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignUp ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth