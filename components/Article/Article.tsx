import { Article } from "../../@types";
import { Divider, Paper, Typography } from "@mui/material";
import styles from "./Article.module.css";
import { format, fromUnixTime } from "date-fns";
import { Box } from "@mui/system";

export default function ArticleComponent(props: Article) {
  const { email, title, dateCreated, bodyText } = props;
  const { _seconds } = dateCreated;
  const date = fromUnixTime(_seconds);
  const formattedDate = format(fromUnixTime(_seconds), "dd MMM yyyy hh:mm");

  return (
    <Paper elevation={2}>
      <article className={styles.article}>
        <Typography paddingBottom="16px" variant="h4">
          {title}
        </Typography>

        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: bodyText }}
        ></Typography>

        <Divider />

        <footer>
          <Box
            display="flex"
            flexDirection="row"
            gap="12px"
            alignItems="baseline"
            paddingTop="12px"
          >
            <Typography variant="overline">Posted on</Typography>

            <Typography variant="subtitle2">
              <time dateTime={date.toDateString()}>{formattedDate}</time>
            </Typography>

            <Typography variant="overline">by {email}</Typography>
          </Box>
        </footer>
      </article>
    </Paper>
  );
}
