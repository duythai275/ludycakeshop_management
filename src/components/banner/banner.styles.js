import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    content: {
        height: 90,
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