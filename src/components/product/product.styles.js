// import styles from material
import { makeStyles } from '@material-ui/core/styles';

// define styles
export const useStyles = makeStyles((theme) => ({
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
    table: {
    },
    fab1: {
        position: 'absolute',
        bottom: theme.spacing(12),
        right: theme.spacing(5),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(5),
    },
    chip: {
        '& > *': {
            margin: theme.spacing(0.5),
        }
    },
    smallAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    tableHead: {
        fontWeight: 'bold'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));