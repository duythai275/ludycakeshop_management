// import styles from material
import { makeStyles } from '@material-ui/core/styles';

// define styles
export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    listPaper: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 200
    },
    listPaper1: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 186
    },
    formControl: {
        margin: theme.spacing(1),
        width: '95%',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        height: 108
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));