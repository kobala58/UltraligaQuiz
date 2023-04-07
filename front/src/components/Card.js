import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function hide_nickname(nick) {
  var hide = '';
  console.log(nick)
  console.log(nick.length)
  for (let i = 0; i < nick.length; i++){
    hide += '_';
  }
  console.log(hide)
  return(hide);
}

export default function BasicCard(props) {
  return (
    <Card sx={3}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.country}
        </Typography>
        <Typography variant="h5" component="div">
          {hide_nickname(props.name)}
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
        <Button size="small">Odkryj literę</Button>
      </CardActions>
    </Card>
  );
}
