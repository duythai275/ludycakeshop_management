import React , { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useStyles } from './login.styles';
import logo from '../../assets/logo.jpg';

import AccessContext from '../../contexts/access.context';

const Login = () => {
  const classes = useStyles();
  const { handleLogIn } = useContext(AccessContext);

  const [serverAddress, setServerAddress] = useState("http://localhost:4000");
  const [email, setEmail] = useState("duythai275@gmail.com");
  const [password, setPassword] = useState("admin12345");

  const login = () => {
    // fetch(`${serverAddress}/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         'email': email,
    //         'password': password
    //     })
    // })
    // .then( res => res.json() )
    // .then( json => {
    //     if ( json.hasOwnProperty("token") ) handleLogIn(serverAddress, json.token);
    //     else console.log("TEST: " + json.message);
    // });
    handleLogIn("localhost", "TESTING");
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
                        // onChange={() => console.log(this)}
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
    </Container>
  );
}

export default Login;