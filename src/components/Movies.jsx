import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Card } from "@mui/material";

export default function Movies() {
  const [people, setPeople] = React.useState();
  const [character, setCharacter] = React.useState();
  const [movies, setMovies] = React.useState();

  React.useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((data) => setPeople(data));
  }, []);

  React.useEffect(() => {
    if (!character) return;
    var productsToReturn = [];
    let requests = character.map((movieUri) => {
      return new Promise((resolve, reject) => {
        fetch(movieUri).then((response) => resolve(response.json()));
      });
    });
    Promise.all(requests)
      .then((body) => {
        body.forEach((res) => {
          if (res) productsToReturn.push(res);
        });
        setMovies(productsToReturn);
      })
      .catch((err) => console.log(err));
  }, [character]);

  const handleChange = (event) => {
    setCharacter(event.target.value);
  };

  const renderMovies = () => <div>
      {
          movies && movies.map(movie=><Card>
              {movie.title}
          </Card>)
      }
  </div>
  return (
    <div>
      Movies
      <Box sx={{ width: 240 }}>
        <FormControl fullWidth>
          <InputLabel id="character-select-label">Characters</InputLabel>
          <Select
            labelId="movie-select"
            id="movie-character-select"
            value={character}
            label="Character"
            onChange={handleChange}
          >
            {people &&
              people.results.map((character) => (
                <MenuItem value={character.films}>{character.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        {renderMovies()}
      </Box>
    </div>
  );
}
