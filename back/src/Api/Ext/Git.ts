
import {docker, getPwd} from "../Docker";

const clone =  async (literals: TemplateStringsArray, ...placeholders: string[]) => {
  let cmd = ["git", "clone"];
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

  
  str.split(" ").forEach( s => {
    if (s.trim().length > 0) {
      cmd.push(s.trim());
    }
  })
  
  console.log(cmd)
  await docker.run({
    image:"git:2.17",
    cmd: cmd,
    createOptions:{
      WorkingDir:getPwd(),
      HostConfig: {
        Mounts: [
          {
            Source:"cc",
            Target:"/cc",
            ReadOnly:false,
            Type:"volume"
          }
        ]
      }
    },
    outputStream: process.stdout
  })
}

const checkout =  async (literals: TemplateStringsArray, ...placeholders: string[]) => {
  const cmd = ["git", "checkout"];
  placeholders.forEach( (ph, idx) => {
    cmd.push(literals[idx]);
    cmd.push(ph);
  });
  cmd.push(literals[placeholders.length - 1]);
}

export const Git = {
  clone,
  checkout
};
