import {docker, getPwd} from "../Docker";

const npm =  async (literals: TemplateStringsArray, ...placeholders: string[]) => {
  let cmd = ["npm"];
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
    image:"nodejs:10.x",
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


export const Node = {
  npm
}