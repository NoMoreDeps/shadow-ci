"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const p = __importStar(require("child_process"));
const gg = require("simple-git")();
const repo = "https://github.com/fskorzec/shadow-flux";
var log = (...params) => void 0;
// log(JSON.stringify(p.execSync(`git clone https://github.com/fskorzec/shadow-flux ./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac`).toString()));
// log(JSON.stringify(p.execSync(`git checkout 4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac -b localtest`, { cwd: "./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac"}).toString()));
// log(JSON.stringify(p.execSync(`yarn install`, { cwd: "./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac" }).toString()));
// log(JSON.stringify(p.execSync(`yarn test`, { cwd: "./repo/4aacaf9af7b939cd3b54b76f1d7b964dfa9fa3ac"}).toString()));
function execute(command, path = "./") {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((r, x) => {
            let message = [];
            let strOut = "";
            let strErr = "";
            const proc = p.exec(command, { cwd: path }, (err, stdin, stdout) => {
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
            });
            proc.on("exit", (code, signal) => {
                r({
                    code,
                    signal,
                    message,
                    strOut: strOut.split("\n"),
                    strErr: strErr.split("\n")
                });
            });
        });
    });
}
function doTest(repo, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = [];
        res.push(yield execute(`git clone ${repo} ./repo/${hash}`));
        res.push(yield execute(`git checkout ${hash} -b localtest`, `./repo/${hash}`));
        res.push(yield execute(`yarn install`, `./repo/${hash}`));
        res.push(yield execute(`yarn test`, `./repo/${hash}`));
        return new Promise((r, x) => r(res));
    });
}
exports.doTest = doTest;
