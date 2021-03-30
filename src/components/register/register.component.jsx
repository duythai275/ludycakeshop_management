import { useStyles } from './login.styles';
import logo from '../../assets/logo.jpg';

import AccessContext from '../../contexts/access.context';

const Register = () => {

    const register = () => {
        // code to register an account goes here
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
                            onClick={() => register()}
                        >
                            Register Account
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