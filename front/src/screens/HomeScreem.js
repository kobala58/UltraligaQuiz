import Grid from '@mui/material/Grid';
import OutlinedCard from '../components/Card';
import Box from "@mui/material/Box";
import TitleRender from '../components/Title';
import { useState } from 'react';
import AlertDialogSlide from '../components/Popup';
import ResponsiveAppBar from '../components/Header';
import allPlayerData from './../final.json'
function generateRandomTeam(){
  var item = allPlayerData[Math.floor(Math.random()*allPlayerData.length)];
  return(item);
}

function createFalseArray(size){
  var arr = [];
  for (let i=0; i<size; i++){
    arr.push(false)
  }
  return arr
}

export default function HomeScreen() {
  const [data, setData] = useState(generateRandomTeam());
  const lil_players = data.Player.map(x => x.toLowerCase());
  const playerSize = data.Player.length; 
  const [guesed, changeGuessed] = useState(createFalseArray(data.Player.length)); // check_hits
  const [answer, setAnswer] = useState(''); // save ansver
  const [guesed_count, setGuessedCount] = useState(0); // count guessed players
  
  function handleChange (e) {
    setAnswer(e.target.value);
    var idx = lil_players.indexOf(e.target.value.toLowerCase().trim());
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
      <ResponsiveAppBar/>
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
              />
          </Grid>
          ))}
        </Grid>
          {guesed_count == playerSize && <AlertDialogSlide/>}
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
