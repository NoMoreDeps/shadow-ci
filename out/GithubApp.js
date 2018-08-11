"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = __importDefault(require("@octokit/rest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const clientId = "Iv1.b57f1d5428db439c";
const clientSecret = "bc45eea2aa777740d3b7f6327474388c7067c9a2";
const certPath = "C:\\Users\\franc\\.ssh\\shadow-ci.2018-08-10.private-key.pem";
const appId = "15950";
const perm = fs.readFileSync(certPath, "utf8");
function generateJwt() {
    const payload = {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60,
        iss: appId // Integration's GitHub id
    };
    // Sign with RSA SHA256
    return jsonwebtoken_1.default.sign(payload, perm, { algorithm: 'RS256' });
}
let token = generateJwt();
let sToken = "";
const api = new rest_1.default({
    timeout: 0,
    headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': 'octokit/rest.js v1.2.3' // v1.2.3 will be current version
    },
    // custom GitHub Enterprise URL
    baseUrl: 'https://api.github.com',
    // Node only: advanced request options can be passed as http(s) agent
    agent: undefined
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function authenticate(installationId, token) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((r, x) => {
            node_fetch_1.default(`https://api.github.com/installations/${installationId}/access_tokens`, {
                method: "POST",
                headers: {
                    "User-Agent": "Static-Scheduler",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/vnd.github.machine-man-preview+json"
                }
            }).then(response => {
                return response.json();
            }).then(json => {
                r(json.token);
            }).catch(err => x(err));
        });
    });
}
function createCheckRun(installationId, head_sha, owner, repo, head_branch) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("createCheckRun", installationId, head_sha, owner, repo, head_branch);
        const tkn = yield authenticate(installationId, generateJwt());
        console.log(tkn);
        api.authenticate({
            type: 'app',
            token: tkn
        });
        const result = yield api.checks.create({
            owner,
            repo,
            details_url: "bout:blank",
            head_branch,
            head_sha,
            name: "build test",
            status: "in_progress"
        });
        return new Promise((r, x) => r(result));
    });
}
exports.createCheckRun = createCheckRun;
function updateCheckRun(installationId, check_run_id, owner, repo, summary, success = true) {
    return __awaiter(this, void 0, void 0, function* () {
        api.authenticate({
            type: 'app',
            token: yield authenticate(installationId, generateJwt())
        });
        const result = yield api.checks.update({
            owner,
            repo,
            name: "build test",
            check_run_id,
            status: "completed",
            completed_at: new Date().toISOString(),
            conclusion: success ? "success" : "failure",
            output: {
                title: "Build and test status report",
                summary
            }
        });
        return new Promise((r, x) => r(result));
    });
}
exports.updateCheckRun = updateCheckRun;
