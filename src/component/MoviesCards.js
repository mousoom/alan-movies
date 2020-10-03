import React from 'react';
import Card from './card/card';
import {Grid, Grow} from '@material-ui/core';
import useStyles from './style.js';
import Tilt from 'react-tilt';


const MoviesCards = ({list}) => {

    const classes = useStyles();

    if(!list.length){
        return(
            <div className={classes.main}> 
                <Tilt className={classes.tilt} options={{ max : 25 }} style={{ height: 350, width: 300}} >
                <div className={classes.Inner}>
                    <h1 className={classes.title}>ALAN-MOVIE</h1>
                    <h2>Try a Command:</h2>
                    <h3>"What are the best movies today?"</h3>
                    <h2>Or</h2>
                    <h3>"What are the top movies now?"</h3>
                </div>
             </Tilt>
            </div>  
        )
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>         
                {list.map((list, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{display:'flex'}}>
                        <Card list={list} i={i}/>
                    </Grid>
                ))}
            </Grid>
        </Grow>
    )
}

export default MoviesCards;
