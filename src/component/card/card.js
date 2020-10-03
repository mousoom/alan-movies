import React,{useState, useEffect, createRef} from 'react';
import useStyles from './styles';
import classNames from 'classnames';
import {Card, CardActions, CardActionArea,CardContent,CardMedia,Button,Typography} from '@material-ui/core';


const MovieCard = ({list: {id, original_title,overview,popularity,poster_path,release_date,vote_average,vote_count}, i, activeMovies}) => {

    const classes = useStyles();
    const[elRefs,setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(()=>{
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    },[]);

    useEffect(() => {
        if(i === activeMovies && elRefs[activeMovies]){
            scrollToRef(elRefs[activeMovies])
        }
    },[i,activeMovies,elRefs])

    return (
       <Card ref={elRefs[i]} className={classNames(classes.card,activeMovies === i?classes.activeCard : null)}>
           <CardActionArea>   
               <CardMedia className= {classes.media} image={"http://image.tmdb.org/t/p/w500"+ poster_path}/>
               <Typography className={classes.title} gutterBottom variant="h6">{original_title}</Typography>
               <div className={classes.details}>
                <Typography variant="body2" color="textSecondary"component="h3"><b>Release Date:</b> {(new Date(release_date)).toDateString()}</Typography>
                <Typography variant="body2" color="textSecondary"component="h2"><b>Rating:</b> {vote_average}/10 ({vote_count} votes)</Typography>
               </div>       
           </CardActionArea>
           <CardActions className={classes.cardActions}>
               <Button size="small" color="primary" href={"https://www.themoviedb.org/movie/" + id} target="_blank">Know More</Button>
                <Typography variant="h5">{i + 1}</Typography>
           </CardActions>
       </Card>
    )
}

export default MovieCard;
