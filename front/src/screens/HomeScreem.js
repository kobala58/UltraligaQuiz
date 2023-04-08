import Grid from '@mui/material/Grid';
import OutlinedCard from '../components/Card';
import Box from "@mui/material/Box";
import TitleRender from '../components/Title';
import { useState } from 'react';
import AlertDialogSlide from '../components/Popup';

function hide_nickname(to_hide) {
  var hide = '';
  for (let i = 0; i < to_hide.length; i++){
    hide += '_';
  }
  return(hide);
}
export default function HomeScreen() {
  const data = {"Name":"Ultraliga Season 1","Team":"Illuminar Gaming","Year":2019,
    "Player":["Raven","CrAzY","Kashtelan","Puki Style","delord"],
    "Role":["Top","Jungle","Mid","Bot","Support"],
    "Flag":["Poland","Poland","Poland","Poland","Poland"]};
  
  const [guesed, changeGuessed] = useState([false, false, false, false, false]); // check_hits
  const [answer, setAnswer] = useState(''); // save ansver
  const [guesed_count, setGuessedCount] = useState(0); // count guessed players
  
  function handleChange (e) {
    console.log(e.target.value.trim());
    setAnswer(e.target.value);
    let idx = data.Player.indexOf(e.target.value.trim());
    if (idx != -1 && guesed[idx] == false) {
      let copy = guesed;
      copy[idx] = !copy[idx];
      changeGuessed(copy);
      setAnswer('');
      setGuessedCount(guesed_count + 1);
      
      if (guesed_count == data.Player.length){
        <AlertDialogSlide/>
      }
    }
  }

  return (
  <div>
      <Header/>
      <TitleRender />
    <div>
        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 2, md: 12 }}
        justifyContent="space-evenly" alignItems="center">
          {
          data.Player.map((value, i) => (
          <Grid item key = {i} sm={5} md={2.2} lg={5} xl={4}>
              <OutlinedCard
              name = {value}
              position = {data.Role[i]}
              country = {data.Flag[i]}
              year = {data.Year}
              team = {data.Team}
              guessed = {guesed[i]}
              hided = {hide_nickname(value)}
              />
          </Grid>
          ))}
        </Grid>
          {guesed_count == 5 && <AlertDialogSlide/>}
        <Box display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="30vh">

          <form onSubmit={e => { e.preventDefault()}}>
            <input 
              value = {answer}
              onChange = {handleChange}
            />
          </form>        
        </Box>
    </div>
  </div>    
  )
}
