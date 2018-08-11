import octokit from "@octokit/rest";

import jwt from "jsonwebtoken";
import * as fs from "fs";
import Http from "node-fetch";

const clientId = "Iv1.b57f1d5428db439c";
const clientSecret = "bc45eea2aa777740d3b7f6327474388c7067c9a2";

const certPath = "C:\\Users\\franc\\.ssh\\shadow-ci.2018-08-10.private-key.pem";
const appId = "15950";

const perm = fs.readFileSync(certPath, "utf8");

function generateJwt() {
  const payload = {
    iat: Math.floor(Date.now() / 1000),       // Issued at time
    exp: Math.floor(Date.now() / 1000) + 60,  // JWT expiration time
    iss: appId                               // Integration's GitHub id
  }

  // Sign with RSA SHA256
  return jwt.sign(payload, perm, { algorithm: 'RS256' })
}

let token = generateJwt();

let sToken = "";

const api = new octokit({
  timeout: 0, // 0 means no request timeout
  headers: {
    accept: 'application/vnd.github.v3+json',
    'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
  },

  // custom GitHub Enterprise URL
  baseUrl: 'https://api.github.com',

  // Node only: advanced request options can be passed as http(s) agent
  agent: undefined
});

async function start() {

  

  api.authenticate({
    type: 'app',
    token: sToken
  });


  /*
    const result = await api.checks.create({
      owner       : "fskorzec",
      repo        : "shadow-flux",
      name        : "build test",
      status      : "in_progress",
      head_branch : "",
      head_sha    : "4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac"
    });
    */

  


}

async function authenticate(installationId: string, token: string): Promise<string> {
  return new Promise<string>((r, x) => {
    Http(`https://api.github.com/installations/${installationId}/access_tokens`,
      {
        method: "POST",
        headers: {
          "User-Agent": "Static-Scheduler",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.machine-man-preview+json"
        }
      }).then(response => {
        return response.json()
      }).then(json => {
        r(json.token);
      }).catch(err => x(err));
  });
} 

export async function createCheckRun(installationId: string, head_sha: string, owner: string, repo: string, head_branch: string) {
  console.log("createCheckRun", installationId,head_sha, owner, repo, head_branch);
  const tkn = await authenticate(installationId, generateJwt());
  console.log(tkn);
  api.authenticate({
    type: 'app',
    token: tkn
  });

  const result = await api.checks.create({
    owner,
    repo,
    details_url:"bout:blank",
    head_branch ,
    head_sha,
    name        : "build test",
    status      : "in_progress"
  });

  return new Promise( (r,x) => r(result) );
}

export async function updateCheckRun(installationId: string, check_run_id: string, owner: string, repo: string, summary: string, success: boolean = true) {
  api.authenticate({
    type: 'app',
    token: await authenticate(installationId, generateJwt())
  });

  const result = await api.checks.update({
    owner,
    repo,
    name: "build test",
    check_run_id,
    status: "completed",
    completed_at: new Date().toISOString(),
    conclusion: success ? "success" : "failure",
    output: {
      title:"Build and test status report",
      summary
    }
  });

  return new Promise( (r,x) => r(result) );
}