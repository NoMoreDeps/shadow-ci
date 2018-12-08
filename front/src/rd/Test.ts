import {Pipeline, Git, Shell, Node} from "./Interfaces"; 

declare var Pipeline: Pipeline

const git = Pipeline
  .inject<Git>()
  .inject<Shell>()
  .inject<Node>()

  .define("Checkout", _ => {
    _.Git.clone("");
    _.Git.checkout("");
  })

  .define("Install", _ => {
    _.Node.yarn `install`;
  })

  .define("Test", _ => {
    _.Node.yarn `test`;
  })
  
  .define("Build", _ => {
    _.Node.yarn `build:prod`;
  })

    
    

    