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
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        width: '200px'
    },
    pager: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    tableHead: {
        fontWeight: 'bold'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(5)
    }
}));