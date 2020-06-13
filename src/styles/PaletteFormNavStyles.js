import { makeStyles } from '@material-ui/core/styles';
import {DRAWER_WIDTH} from '../constants';
import sizes from './sizes';

const drawerWidth = DRAWER_WIDTH;

export default makeStyles((theme) => ({
    hide: {
        display: 'none',
      },
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBarBtns: {
        marginRight: '1rem',
        '& a': {
            textDecoration: 'none'
        },
        [sizes.down('sm')]:{
            marginRight: '0.5rem'
        }
    },
    navBarButton: {
        margin: '0 0.5rem',
        [sizes.down('sm')]:{
            margin: '0 0.2rem',
            padding: '0.3rem'
        }    
    }
}))

