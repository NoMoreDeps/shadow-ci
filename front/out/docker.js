var Docker = require('dockerode');

var docker = new Docker({
  host: '192.168.56.129',
  port: process.env.DOCKER_PORT || 2376,
  /*ca: fs.readFileSync('ca.pem'),
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem'),*/
  version: 'v1.25' // required when Docker >= v1.13, https://docs.docker.com/engine/api/version-history/
});

docker.listImages().then( l => {
  for(var i in l) {
    console.log(l[i].Id);
  }
}).catch( ex => {
  console.log(ex);
})