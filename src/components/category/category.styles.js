import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => (
    {
        header: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        title: {
            width: '200px'
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column'
        },
        pager: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(3),
            right: theme.spacing(5)
        },
        tableHead: {
            fontWeight: 'bold'
        }
    }
));