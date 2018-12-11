import Docker from "dockerode";

var docker = new Docker({
  host: '127.0.0.1',
  port: process.env.DOCKER_PORT || 2375,
  /*ca: fs.readFileSync('ca.pem'),
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem'),*/
  version: 'v1.25' // required when Docker >= v1.13, https://docs.docker.com/engine/api/version-history/
});

docker.createVolume({
  Name:"ci"
}).then( _ => {

  docker.run(
    "alpine/git", 
    ["git","clone", "--recursive https://github.com/fskorzec/shadow-flux.git /ci/flux"], 
    [process.stdout, process.stderr],
    {
      Mount: "source=ci,target=/ci",
      Rm:true
    })
});
