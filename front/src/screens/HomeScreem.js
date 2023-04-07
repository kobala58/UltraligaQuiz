import Grid from '@mui/material/Grid';
import OutlinedCard from '../components/Card';
import GuessingField from '../components/GuessConsole';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import TitleRender from '../components/Title';

export default function HomeScreen() {
  const data = {"Name":"Ultraliga Season 1","Team":"Illuminar Gaming","Year":2019,
    "Player":["Raven ","CrAzY ","Kashtelan","Puki Style","delord"],
    "Role":["Top","Jungle","Mid","Bot","Support"],
    "Flag":["Poland","Poland","Poland","Poland","Poland"]};
  
  

  return (
  <div>
      <TitleRender />
    <div>
        <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 2, md: 12 }}
        justifyContent="space-evenly" alignItems="center">
          {
          data.Player.map((value, i) => (
          <Grid item key = {value} sm={5} md={2.2} lg={5} xl={4}>
              <OutlinedCard
              name = {value}
              position = {data.Role[i]}
              country = {data.Flag[i]}
              year = {data.Year}
              team = {data.Team}
              />
          </Grid>
          ))}
        </Grid>
        <Box display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="30vh">
          {/* {"Podaj nick gracza"}  */}
          <form onSubmit={e => {
            e.preventDefault();
        alert('Nick:');
        }}>
        <input />
        <button>Send</button>
        </form>
          
        </Box>
</div>
  </div>
      
  )
}
