import {setPwd} from "../Docker";

const cd =  (literals: TemplateStringsArray, ...placeholders: string[]) => {
  let str = "";

  placeholders.forEach( (ph, idx) => {
    str += (literals[idx]);
    str += (ph);
  });

  if (placeholders.length > 0) {
    str += (literals[placeholders.length - 1]);
  } else {
    str += literals[0];
  }

  setPwd(str);
}

export const Env = {
  cd
};
