import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Philos from 'src/assets/images/philoslib.jpeg';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SmallerCardPage({title,author,price,lessons,time,image}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 190 }}>
      {/*<CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title} 
        subheader={author}
      />*/}
      <CardMedia
      sx={{ padding: "10px",borderRadius:"1rem",marginBottom:"-15px !important" }}
        component="img"
        height="100"
        image={image}
        onClick={()=>{navigate('/dashboard/selected-course')}}
        alt="Paella dish"
      />


      <CardContent>
   
      <Typography sx={{fontSize:"11px",display:"flex",flexDirection:"column" ,gap:"5px"}} >
         <p style={{color:"black"}}>{title}</p>
        
         <p style={{color:"black"}}>{author} </p>
        </Typography>


      <Divider/>
       <br/>

        <Typography sx={{fontSize:"11px",marginTop:"-10px",marginBottom:"-20px"}} variant="body2" color="text.secondary">
         <b style={{color:"black"}}>{price} GNF</b>&nbsp;  <s>50,000 GNF</s>
        </Typography>
      </CardContent>
      
      
      

      <CardActions >
        <IconButton sx={{fontSize:"8px",fontWeight:"bold",position:"relative",left:"-5%"}} >
          <MenuBookIcon sx={{height:"15px"}} /> {lessons} Lecons
        </IconButton>
        <IconButton sx={{fontSize:"8px",fontWeight:"bold",position:"relative",left:"-15%"}} >
          <AccessTimeIcon sx={{height:"15px"}} /> {time}
        </IconButton>
        <ExpandMore //the icon is off screen for each card
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
