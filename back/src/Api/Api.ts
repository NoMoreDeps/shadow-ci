import {Env} from "./Ext/Env";
import {Git} from "./Ext/Git";

const volume = "";
const gitUrl = "";

Env.cd `${volume}/flux`;

Git.clone `--recursive ${gitUrl}`;

