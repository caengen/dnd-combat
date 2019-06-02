import React, { useContext} from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { AppMode, AppConfig } from "../types";
import { StoreContext } from "../StoreContext";
import { updateConfig } from "../actions";

export function ModeControl() {
  const { state, dispatch } = useContext(StoreContext);
  const { mode } = state.config;

  const handleChange = (event: React.ChangeEvent<any>) => {
    const newConfig: AppConfig = {
      ...state.config,
      mode: event.target.value
    }
    dispatch(updateConfig(newConfig));
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Modus</FormLabel>
      <RadioGroup aria-label="position" name="position" value={mode} onChange={handleChange} row>
        <FormControlLabel
          value={AppMode.Placement}
          control={<Radio color="primary" />}
          label={"Placement"}
          labelPlacement="top"
        />
        <FormControlLabel
          value={AppMode.Spell}
          control={<Radio color="primary" />}
          label="Spell"
          labelPlacement="top"
        />
        <FormControlLabel
          value={AppMode.Terrain}
          control={<Radio color="primary" />}
          label="Terrain"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}