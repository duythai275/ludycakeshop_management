import React , { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './login.styles';
import logo from '../../assets/logo.jpg';

import AccessContext from '../../contexts/access.context';

const Login = () => {
  const classes = useStyles();
  const { handleLogIn } = useContext(AccessContext);

  const [serverAddress, setServerAddress] = useState("https://hha-capstone.herokuapp.com/api");
  const [email, setEmail] = useState("boss@hha.com");
  const [password, setPassword] = useState("password");
  
  const [backdrop, setBackdrop] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const login = () => {
    setBackdrop(true);
    fetch(`${serverAddress}/admin/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'password': password
        })
    })
    .then( res => res.json() )
    .then( json => {
        if ( json.status === "ok" ) {
            handleLogIn(serverAddress, json.message);
            setBackdrop(false);
        } else {
            setBackdrop(false);
            setErrMsg(json.message);
        }
        
    });
  }

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar alt="Hiephoa" src={logo} className={classes.avatar} />
            <Typography component="h1" variant="h5">
                Hiephoa Site's Management
            </Typography>
            <div className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="server"
                    label="Server Address"
                    name="server"
                    autoFocus
                    value={serverAddress}
                    onChange={event => setServerAddress(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => login()}
                >
                    Login
                </Button>
            </div>
        </div>
        { 
        ( errMsg !== null ) ? 
            <Alert severity="error">
                Error - {errMsg}
            </Alert> 
            : null 
        }
        <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </Container>
  );
}

export default Login;