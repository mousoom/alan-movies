import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    container:{
        padding: '0 5%',
        width: '100%',
        margin: 0,
    },
    main:{
        height:'70vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
    },
    tilt:{
        backgroundImage: 'linear-gradient(89deg,#ff22ed, #00f9ff)',
        borderRadius: '10px',
    },
    Inner:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    title:{
        fontWeight:'bold'
    }
});