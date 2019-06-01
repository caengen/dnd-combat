import orc from "./001-orc.svg";
import dragon from "./002-dragon.svg";
import monster from "./003-monster.svg";
import zombie from "./004-frankenstein.svg";
import witchHat from "./010-witch-hat.svg";
import smilodon from "./014-saber-toothed-tiger.svg";
import animal from "./013-animals.svg";

import samurai from "./005-samurai.svg";
import knight from "./006-knight.svg";
import helmet from "./007-helmet.svg";
import crusader from "./008-crusader.svg";
import wizard from "./009-wizard.svg";
import wizard1 from "./011-wizard-1.svg";
import wizard2 from "./012-wizard-2.svg";

interface PieceIcons {
  monsters: {
    [index: string]: string;
  }
  heroes: {
    [index: string]: string;
  }
}
export const pieceIcons = {
  monsters: {
    "orc": orc,
    "dragon": dragon,
    "monster": monster,
    "zombie": zombie,
    "witchHat": witchHat,
    "smilodon": smilodon,
    "animal": animal
  },
  heroes: {
    "samurai": samurai,
    "knight": knight,
    "helmet": helmet,
    "crusader": crusader,
    "wizard": wizard,
    "wizard1": wizard1,
    "wizard2": wizard2
  }
}