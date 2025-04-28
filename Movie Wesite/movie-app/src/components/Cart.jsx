import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Cart({ item }) {
  const theme = useTheme();
  const { title, overview, poster_path } = item;

  return (
    <Card sx={{ display: "flex", height: 100 }}>
      <Box>
        <CardContent sx={{ flex: "1 0 auto", padding: "8px 12px" }}>
          <Typography component="div" variant="subtitle1">
            {overview}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {title}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {title}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100, height: "100%" }}
        image={`${IMAGE_BASE_URL}${poster_path}`}
        alt="Live from space album cover"
      />
    </Card>
  );
}
