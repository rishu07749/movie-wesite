import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieSection({ section, addMovieToCart }) {
  const {
    title,
    overview,
    poster_path,
    release_date,
    popularity,
    backdrop_path,
  } = section;

  return (
    <Card sx={{ maxWidth: 345 }} onClick={addMovieToCart}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${IMAGE_BASE_URL}${poster_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
