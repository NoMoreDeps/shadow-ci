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
const npm = (literals, ...placeholders) => __awaiter(this, void 0, void 0, function* () {
    let cmd = ["npm"];
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
        image: "nodejs:10.x",
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
exports.Node = {
    npm
};
