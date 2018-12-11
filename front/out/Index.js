var Docker = require("dockerode");

var docker = new Docker({
    host: '127.0.0.1',
    port: process.env.DOCKER_PORT || 2375,
    /*ca: fs.readFileSync('ca.pem'),
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),*/
    version: 'v1.25' // required when Docker >= v1.13, https://docs.docker.com/engine/api/version-history/
  });
  
  docker.createContainer({
    Image: 'alpine/git',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Cmd: [" clone", "--recursive", "https://github.com/fskorzec/shadow-flux.git", "/ci/sflux"],
    OpenStdin: true,
    StdinOnce: false,
   HostConfig: {
       Mounts: [{
           Source:"ci",
           Target:"/ci",
           Type:"volume",
           ReadOnly:false
       }]
   }
  }).then(function(container) {
    return container.start();
  }).then(function(container) {
    return container.resize({
      h: process.stdout.rows,
      w: process.stdout.columns
    });
  }).then(function(container) {
    return container.stop();
  }).then(function(container) {
    return container.remove();
  }).then(function(data) {
    console.log('container removed');
  }).catch(function(err) {
    console.log(err);
  });
  