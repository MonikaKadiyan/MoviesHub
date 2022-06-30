import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, Typography } from '@mui/material';

export default function ResponsiveGrid({charactersMovies}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {charactersMovies.map((movie, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card style={{padding:10, overflow:'auto'}}>
              <Typography variant="h6">Title :-
                <Typography variant="caption">{movie.title}</Typography>
              </Typography>
              <Typography variant="h6">Release Date :-
                <Typography variant="caption">{movie.release_date}</Typography>
              </Typography>
              <Typography variant="h6">Opening Crawl :-
                <Typography variant="caption">{movie.opening_crawl}</Typography>
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
