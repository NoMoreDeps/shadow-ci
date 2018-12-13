"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Docker_1 = require("../Docker");
const cd = (literals, ...placeholders) => {
    let str = "";
    placeholders.forEach((ph, idx) => {
        str += (literals[idx]);
        str += (ph);
    });
    if (placeholders.length > 0) {
        str += (literals[placeholders.length - 1]);
    }
    else {
        str += literals[0];
    }
    Docker_1.setPwd(str);
};
exports.Env = {
    cd
};
