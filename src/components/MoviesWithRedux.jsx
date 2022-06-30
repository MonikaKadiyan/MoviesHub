import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography, Card } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCharacters, setCharacterMovies } from "../redux/starWarsSlice";
import MovieGrid from "./MovieGrid";
import CircularIndeterminate from "./CircularProgress";

export default function Movies() {
  const [character, setCharacter] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const characters = useSelector((state) => state.character);
  const charactersMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCharacters(data));
      });
  }, [dispatch]);

  React.useEffect(() => {
    if (!character) return;
    var productsToReturn = [];
    setIsLoading(true);
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
        dispatch(setCharacterMovies(productsToReturn));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [character,dispatch]);

  const handleChange = (event) => {
    setCharacter(event.target.value);
  };

  const renderMovies = () => {
    if (isLoading) return <CircularIndeterminate open={isLoading} />;
    if (!charactersMovies) return null;
    return (
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6">Movies List</Typography>
        {charactersMovies && <MovieGrid charactersMovies={charactersMovies} />}
      </div>
    );
  };

  const renderLastMovie = () => {
    if (!charactersMovies) return null;
    if (isLoading) return null;
    return (
      <Card style={{padding:20, marginTop:20}}>
        <Typography variant="h6">Name/Year last movie</Typography>
        <Typography>
          {charactersMovies[charactersMovies.length - 1].release_date}
        </Typography>
      </Card>
    );
  };

  return (
    <div>
      <Typography variant="h4">Select your Character</Typography>
      <Box width={300}>
        <FormControl fullWidth>
          <Select
            labelId="movie-select"
            id="movie-character-select"
            value={character}
            onChange={handleChange}
            data-testid="select"
          >
            {characters &&
              characters.map((character) => (
                <MenuItem data-testid="select-option" value={character.films}>{character.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      {renderMovies()}
      {renderLastMovie()}
    </div>
  );
}
