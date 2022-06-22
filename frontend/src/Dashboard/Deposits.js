import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import FormControl from "@material-ui/core/FormControl";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const [tickers, setTickers] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    props.setTicker(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/tickers`
        );
        const tickersArray = await response.json();
        setTickers(tickersArray);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  const classes = useStyles();

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const currentDate = mm + "." + dd + "." + yyyy;

  return (
    <React.Fragment>
      <Title>Total earnings</Title>
      <Typography component="p" variant="h4">
        ${props.amount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {currentDate}
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Coin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.ticker}
          defaultValue={props.ticker}
          label="Coin"
          onChange={handleChange}
        >
          {tickers.map((item, index) => {
            return (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
