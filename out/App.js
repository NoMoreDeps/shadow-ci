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
const Hapi = __importStar(require("hapi"));
const GithubApp_1 = require("./GithubApp");
const Checkout_1 = require("./Checkout");
const server = new Hapi.Server({
    host: 'localhost',
    port: 8080
});
// Add the route
server.route({
    method: 'POST',
    path: '/hello',
    handler: function (request, h) {
        const data = request.payload;
        const action = data.action;
        if (action === "requested" || action === "rerequested") {
            const installationId = data.installation.id;
            const headBranch = data.check_suite.head_branch;
            const headCommit = data.check_suite.head_sha;
            const repoUrl = data.repository.html_url;
            const repo = data.repository.name;
            const owner = data.repository.owner.login;
            try {
                GithubApp_1.createCheckRun(installationId, headCommit, owner, repo, headBranch).then((_) => {
                    const runId = _.data.id;
                    console.log("Run created", runId);
                    Checkout_1.doTest(repoUrl, headCommit).then((res) => {
                        console.log("Tested", res);
                        let passed = true;
                        res.forEach(elt => {
                            if (elt.code !== 0) {
                                passed = false;
                            }
                        });
                        let summuary = "<pre>";
                        res.forEach(elt => {
                            summuary += elt.strOut.join("\n");
                        });
                        summuary += "\n\n";
                        res.forEach(elt => {
                            summuary += elt.strErr.join("\n");
                        });
                        summuary += "</pre>";
                        GithubApp_1.updateCheckRun(installationId, runId, owner, repo, summuary, passed).then(_ => {
                            console.log("Done");
                        });
                    });
                });
            }
            catch (ex) {
                console.log(ex);
            }
        }
        else {
            console.log("*********************************");
            console.log(request.payload);
            console.log("*********************************");
        }
        return 200;
    }
});
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
}))();
