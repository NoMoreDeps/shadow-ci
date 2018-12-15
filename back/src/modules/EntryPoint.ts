import {start} from "shadow-nucleus/dist/boot/App.Node";


(async() => {
  try {
    start();
  } catch(ex) {
    console.log(ex);
  }
})();


