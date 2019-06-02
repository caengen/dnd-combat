import React, { useContext} from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { SpellMode } from "../types";
import { StoreContext } from "../StoreContext";
import { updateSpellMode } from "../actions";

export function SpellSelector() {
  const { state, dispatch } = useContext(StoreContext);
  const { spellMode } = state;

  const handleChange = (event: React.ChangeEvent<any>) => {
    dispatch(updateSpellMode(event.target.value));
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Spell mode</FormLabel>
      <RadioGroup aria-label="position" name="position" value={spellMode} onChange={handleChange}>
        <FormControlLabel
          value={SpellMode.Line}
          control={<Radio color="primary" />}
          label={"Line"}
        />
        <FormControlLabel
          value={SpellMode.Circle}
          control={<Radio color="primary" />}
          label="Circle"
        />
        <FormControlLabel
          value={SpellMode.Cone}
          control={<Radio color="primary" />}
          label="Cone"
        />
      </RadioGroup>
    </FormControl>
  );
}