"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const git = Pipeline
    .inject()
    .inject()
    .inject()
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
});
