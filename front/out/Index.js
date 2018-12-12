var Docker = require("dockerode");

var docker = new Docker({
    host: '127.0.0.1',
    port: process.env.DOCKER_PORT || 2375,
    /*ca: fs.readFileSync('ca.pem'),
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),*/
    version: 'v1.25' // required when Docker >= v1.13, https://docs.docker.com/engine/api/version-history/
  });

  docker.createVolume({"Name": "cc"}).then( _ => {
  docker.run('git:2.17', ["git","clone", "--recursive", "https://github.com/fskorzec/shadow-flux.git", "/cc/flux"], process.stdout,{
    HostConfig: {
      Mounts: [{
          Source:"cc",
          Target:"/cc",
          Type:"volume",
          ReadOnly:false
      }]
  }
  }, function (err, data, container) {
    console.log(err, data);
    docker.run('nodejs:10.x', ["npm","i"], process.stdout, {
      HostConfig: {
        Mounts: [{
            Source:"cc",
            Target:"/cc",
            Type:"volume",
            ReadOnly:false
        }]
    },
      WorkingDir:"/cc/flux"
    },function (err, data, container) {
      console.log(err, data);
      docker.run('nodejs:10.x', ["npm","run", "test"], process.stdout, {
    HostConfig: {
      Mounts: [{
          Source:"cc",
          Target:"/cc",
          Type:"volume",
          ReadOnly:false
      }]
  },
      WorkingDir:"/cc/flux"
  }, function (err, data, container) {
    console.log(err, data);
    docker.pruneVolumes();
    docker.pruneContainers();
      })
    });
  });

});
/*
  
  docker.createContainer({
    Image: 'git:2.17',
    AttachStdin: false,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    Cmd: ["git","clone", "--recursive", "https://github.com/fskorzec/shadow-flux.git", "/cc/flux"],
    OpenStdin: true,
    StdinOnce: false,
   HostConfig: {
       Mounts: [{
           Source:"cc",
           Target:"/cc",
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
  
})

*/
