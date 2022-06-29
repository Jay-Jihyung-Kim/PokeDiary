import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {},
  bar: {
    backgroundColor: "#b11226",
  },
  icon: {
    margin: "0 1rem",
  },

  cardGrid: {
    paddingTop: "20px",
  },

  card: {
    // height: "100%",
    // display: "inline-flex",
    // flexDirection: "column",
  },

  cardMedia: {
    //paddingTop: "56.25%", //16:9 Ratio
  },

  cardContent: {
    flexGrow: 1,
  },
}));

export default useStyles;
