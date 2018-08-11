import Git from "nodegit";
import * as p from "child_process";

const repo = "https://github.com/fskorzec/shadow-flux";

var log = (...params: any[]) => void 0;

 // log(JSON.stringify(p.execSync(`git clone https://github.com/fskorzec/shadow-flux ./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac`).toString()));
 // log(JSON.stringify(p.execSync(`git checkout 4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac -b localtest`, { cwd: "./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac"}).toString()));
 // log(JSON.stringify(p.execSync(`yarn install`, { cwd: "./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac" }).toString()));
 // log(JSON.stringify(p.execSync(`yarn test`, { cwd: "./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac"}).toString()));

  async function execute(command: string, path: string = "./") {
    return new Promise<any>( (r,x) => {
      let message: string[] = [];
      let strOut = "";
      let strErr = "";

      const proc = p.exec(command , { cwd: path}, (err, stdin, stdout) => {
        strErr += JSON.stringify(err, null, 2);
      });

      proc.stdout.on('data', (data) => {
        strOut += data.toString();
      });

      proc.stderr.on('data', (data) => {
        strErr += data.toString();
      });


      proc.on("message", (m) => {
        message.push(m);
      })

      proc.on("exit", (code, signal) => {
        r({
          code,
          signal,
          message,
          strOut:strOut.split("\n"),
          strErr:strErr.split("\n")
        })
      })
    });
  }

  export async function doTest(repo: string, hash: string) {
    let res: string[] = [];

    res.push(await execute(`git clone ${repo} ./repo/${hash}`));
    res.push(await execute(`git checkout ${hash} -b localtest`, `./repo/${hash}`));
    res.push(await execute(`yarn install`, `./repo/${hash}`));
    res.push(await execute(`yarn test`, `./repo/${hash}`));

    return new Promise<any[]>( (r,x) => r(res));
  }