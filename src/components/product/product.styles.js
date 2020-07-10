import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    // root: {
    //     '& > *': {
    //       margin: theme.spacing(1),
    //     }
    // },
    // margin: {
    //     margin: theme.spacing(1),
    // }
    // menu: {
    //     width: '100%',
    //     maxWidth: 360,
    //     backgroundColor: theme.palette.background.paper,
    // }
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        width: '200px'
    },
    pager: {
        // backgroundColor: theme.palette.background.paper,
        // width: 500,
        // position: 'relative',
        // minHeight: 200,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    table: {
    //   background: '#F3F3F3'
    },
    fab: {
        // position: 'absolute',
        position: 'absolute',
        // top: theme.spacing(1),
        bottom: theme.spacing(3),
        right: theme.spacing(5),
        // float: "right"
        // display: 'flex',
        // justifyContent: 'flex-end',
    },
    chip: {
        // display: 'flex',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        }
    },
    smallAvatar: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    }
}));