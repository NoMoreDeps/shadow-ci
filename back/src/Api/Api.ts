import {Env} from "./Ext/Env";
import {Git} from "./Ext/Git";
import {Node} from "./Ext/Node";
import {start, stop} from "./Docker";


(async () => {
  await start();

  await Env.cd `/`;
  await Git.clone `--recursive https://github.com/fskorzec/shadow-flux.git /cc/flux`;
  
  await Env.cd `/cc/flux`

  await Node.npm `install`;
  
  await Node.npm `run test`;

  await stop();
})();

