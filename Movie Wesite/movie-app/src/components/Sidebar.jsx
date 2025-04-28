import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { CardGiftcard, HomeMax, MovieCreationSharp } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import MovieSection from "./MovieSection";
import Cart from "./Cart";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "home",
    title: "Home",
    icon: <HomeMax />,
  },
  {
    segment: "my-list",
    title: "My List",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "cart",
    title: "My Cart",
    icon: <CardGiftcard />,
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);
  return router;
}

export default function SideBar(props) {
  const { window } = props;
  const router = useDemoRouter("/home");
  const demoWindow = window ? window() : undefined;
  const [allMoviesSections, setAllMoviesSections] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const getMovie = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=78b56476922d6f5efc556b0938cc3525"
      )
      .then((res) => {
        setAllMoviesSections(res.data.results);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  };

  const handleAddToCart = (movieId) => {
    setCartItems((prevItems) => [...prevItems, movieId]);
  };
  console.log(cartItems);

  useEffect(() => {
    if (router.pathname === "/home") {
      getMovie();
    }
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MovieCreationSharp />
            <span style={{ fontWeight: 600 }}>Movie App</span>
          </div>
        }
      >
        <PageContainer>
          {router.pathname === "/home" && (
            <Grid container spacing={2}>
              {/* Left side - Movies */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  {allMoviesSections.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                      <MovieSection
                        section={movie}
                        addMovieToCart={() => handleAddToCart(movie.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {router.pathname === "/my-list" && <p>Comig Soon!</p>}
          {router.pathname === "/cart" && (
            <div
              style={{
                margin: "12px",
                padding: "16px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              {allMoviesSections
                .filter((movie) => cartItems.includes(movie.id))
                .map((movie) => (
                  <Cart key={movie.id} item={movie} />
                ))}
            </div>
          )}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
