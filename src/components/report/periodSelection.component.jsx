import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { useStyles } from './report.styles.js';

const PeriodSelection = props => {
    const classes = useStyles();

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const weeks = ['W01','W02','W03','W04','W05','W06','W07','W08','W09','W10','W11','W12','W13','W14','W15','W16','W17','W18','W19','W20','W21','W22','W23','W24','W25','W26','W27','W28','W29','W30','W31','W32','W33','W34','W35','W36','W37','W38','W39','W40','W41','W42','W43','W44','W45','W46','W47','W48','W49','W50','W51','W52'];
    
    const checkPeriod = p => {
        (!props.period.includes(p)) ? props.changePeriod([...props.period,...[p]]) : props.changePeriod(props.period.filter(d => d !== p));
    }

    const handlePeriodType = val => {
        props.changePeriodType(val);
        props.changePeriod([]);
    }

    const handleYear = val => {
        props.changeYear(val);
        props.changePeriod([]);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Period Type"
                                value={props.periodType}
                                onChange={e => handlePeriodType(e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                            >
                                <MenuItem value={"weekly"}>Weekly</MenuItem>
                                <MenuItem value={"monthly"}>Monthly</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardActions>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button fullWidth size="small" onClick={() => handleYear(props.year - 1)}>
                                            PREV YEAR
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button fullWidth size="small" onClick={() => handleYear(props.year + 1)}>
                                            NEXT YEAR
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <Divider />
                            <List disablePadding className={classes.listPaper} dense>
                            {
                                ( props.periodType === "monthly" ) ? months.map( month => 
                                    <ListItem button onClick={() => checkPeriod(`${month} ${props.year}`)}>
                                        <ListItemIcon><Checkbox checked={(props.period.includes(`${month} ${props.year}`))} /></ListItemIcon>
                                        <ListItemText primary={`${month} ${props.year}`} />
                                    </ListItem>
                                ) : weeks.map( week => 
                                    <ListItem button onClick={() => checkPeriod(`${week} ${props.year}`)}>
                                        <ListItemIcon><Checkbox checked={(props.period.includes(`${week} ${props.year}`))} /></ListItemIcon>
                                        <ListItemText primary={`${week} ${props.year}`} />
                                    </ListItem>
                                )
                            }
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default PeriodSelection;