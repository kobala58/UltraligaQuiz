import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Popup from 'reactjs-popup';



function hide_nickname(to_hide) {
  var hide = '';
  for (let i = 0; i < to_hide.length; i++){
    hide += '_';
  }
  return(hide);
}


export default function BasicCard(props) {

  const [letter_rev, setLetterRev] = useState(0);
  const [nick, setNick] = useState(hide_nickname(props.name));
  
  function letter_reveal() {
    if (props.guessed == true){
      return 0;
    }
    console.log(props.name[letter_rev]);
    let copy = nick.split('');
    copy[letter_rev] = props.name[letter_rev];
    setNick(copy.join(''));
    setLetterRev(letter_rev+1);

  } 

  return (
    <Card sx={3} style={{backgroundColor: props.guessed ? "lightgreen":"gray"}}>
      
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.country}
        </Typography>
        <Typography variant="h5" component="div">
          {props.guessed ? props.name : nick}
        </Typography>
        <Typography sx={{ mb: 3 }} color="text.secondary">
          {props.position}
        </Typography>
        <Typography variant="body2">
          {props.team}
          <br />
          {props.year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={letter_reveal}>Odkryj literę</Button>
      </CardActions>
    </Card>
  );
}
