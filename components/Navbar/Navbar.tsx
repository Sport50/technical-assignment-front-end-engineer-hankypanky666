import { AppBar, Box, Toolbar } from "@material-ui/core";
import AdbIcon from "@mui/icons-material/Adb";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import { routes } from "../../src/routes";

export default function Navbar() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 4,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <div className={styles.links}>
            <div className={styles.link}>
              <Link href="/">
                <a
                  className={
                    router.pathname === routes.articles.path
                      ? styles.active
                      : ""
                  }
                >
                  {routes.articles.label}
                </a>
              </Link>
            </div>
          </div>

          <AddArticleLink
            isActive={router.pathname === routes.addArticle.path}
          ></AddArticleLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function AddArticleLink(props: { isActive: boolean }) {
  let link = routes.addArticle.path;
  let label = "Add Article";
  let icon = <AddIcon />;

  if (props.isActive) {
    link = routes.articles.path;
    label = "Back";
    icon = <ArrowBackIcon />;
  }

  return (
    <Link href={link}>
      <Button color="inherit" variant="outlined" startIcon={icon}>
        {label}
      </Button>
    </Link>
  );
}
