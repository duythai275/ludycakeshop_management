// import styles from material
import { withStyles } from '@material-ui/core/styles';

// import Material UI
import MenuItem from '@material-ui/core/MenuItem';

/**
 * Customized MenuItem
 */
const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
}))(MenuItem);

export default StyledMenuItem;