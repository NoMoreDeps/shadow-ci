import * as Hapi from "hapi";
import { createCheckRun, updateCheckRun } from "./GithubApp";
import { doTest } from "./Checkout";

const server = new Hapi.Server({
  host: 'localhost',
  port: 80
});

// Add the route
server.route({
  method: 'POST',
  path: '/github',
  handler: function (request, h) {
    const data: any = request.payload;

    const action = data.action;

    if (action === "requested" || action === "rerequested") {

      const installationId = data.installation.id;
      const headBranch = data.check_suite.head_branch;
      const headCommit = data.check_suite.head_sha;
      const repoUrl = data.repository.html_url;
      const repo = data.repository.name;
      const owner = data.repository.owner.login;
      try {

        createCheckRun(installationId, headCommit, owner, repo, headBranch).then((_: any) => {
          const runId = _.data.id;
          console.log("Run created", runId);

          doTest(repoUrl, headCommit).then((res: any[]) => {
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

            summuary += "</pre>"

            updateCheckRun(installationId, runId, owner, repo, summuary, passed).then( _ => {
              console.log("Done");
            })

          })
        });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      console.log("*********************************")
      console.log(request.payload)
      console.log("*********************************")
    }

    return 200;
  }
});


(async () => {
  try {
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
})();