"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Docker_1 = require("../Docker");
const clone = (literals, ...placeholders) => __awaiter(this, void 0, void 0, function* () {
    let cmd = ["git", "clone"];
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
    str.split(" ").forEach(s => {
        if (s.trim().length > 0) {
            cmd.push(s.trim());
        }
    });
    console.log(cmd);
    yield Docker_1.docker.run({
        image: "git:2.17",
        cmd: cmd,
        createOptions: {
            WorkingDir: Docker_1.getPwd(),
            HostConfig: {
                Mounts: [
                    {
                        Source: "cc",
                        Target: "/cc",
                        ReadOnly: false,
                        Type: "volume"
                    }
                ]
            }
        },
        outputStream: process.stdout
    });
});
const checkout = (literals, ...placeholders) => __awaiter(this, void 0, void 0, function* () {
    const cmd = ["git", "checkout"];
    placeholders.forEach((ph, idx) => {
        cmd.push(literals[idx]);
        cmd.push(ph);
    });
    cmd.push(literals[placeholders.length - 1]);
});
exports.Git = {
    clone,
    checkout
};
