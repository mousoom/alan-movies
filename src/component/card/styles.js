import {makeStyles} from '@material-ui/core/styles';

export default makeStyles({
    media:{
        height:'450px',
        width: '100%',
        objectFit: 'contain',
        
    },
    border:{
        border: 'solid',
    },
    fullHeightCard:{
        height:'100%',
    },
    card:{
        width:'100%',
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        borderBottom: '10px solid white',
        margin:'10px',
    },
    activeCard:{
        borderBottom:'10px solid #22289a',
    },
    grid: {
        display:'flex',
    },
    details:{
        margin:'20px',
    },
    title:{
        padding:'0 16px',
    },
    cardActions:{
        padding: '0 16px 8px 16px',
        display:'flex',
        justifyContent:'space-between',
    }

});