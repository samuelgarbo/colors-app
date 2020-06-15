import sizes from './sizes';
import bg from './Diamond-Sunset.svg';
import { blue, red } from '@material-ui/core/colors';

export default {
    '@global':{
        '.item-enter': {
            opacity: 0,
        },
        '.item-enter-active': {
            opacity: 1,
            transition: 'opacity 500ms ease-in',
        },
        '.item-exit': {
            opacity: 1,
        },
        '.item-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-in'
        },
    },
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#ffedcf',
        /* background by SVGBackgrounds.com */
        backgroundImage: `url(${bg})`,
        overflow: 'scroll'

    },
    title: {
        fontSize: '2rem'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('xxl')]:{
            width: '65%'
        },
        [sizes.down('xl')]:{
            width: '80%'
        },
        [sizes.down('lg')]:{
            width: '60%'
        },
        [sizes.down('md')]:{
            width: '80%'
        },
        [sizes.down('sm')]:{
            width: '60%'
        },
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        '& a': {
            color: 'white',
        }
    },
    palettes: {
        boxsizing: 'border-box',
        display: 'grid',
        width: '100%',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '2.5rem',
        [sizes.down('xxl')]: {
            gridTemplateColumns: 'repeat(3, 30%)'
        },
        [sizes.down('xl')]: {
            gridTemplateColumns: 'repeat(3, 30%)'
        },
        [sizes.down('lg')]:{
            gridTemplateColumns: 'repeat(2, 50%)'
        },
        [sizes.down('md')]:{
            gridTemplateColumns: 'repeat(2, 50%)'
        },
        [sizes.down('sm')]: {
            gridTemplateColumns: '1fr',
            gridGap: '1rem'
        },
    },
    checkIcon: {
        backgroundColor: blue[100],
        color: blue[600]
    },
    closeIcon: {
        backgroundColor: red[100],
        color: red[600]
    }
   
}