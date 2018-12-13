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
const Env_1 = require("./Ext/Env");
const Git_1 = require("./Ext/Git");
const Node_1 = require("./Ext/Node");
const Docker_1 = require("./Docker");
(() => __awaiter(this, void 0, void 0, function* () {
    yield Docker_1.start();
    yield Env_1.Env.cd `/`;
    yield Git_1.Git.clone `--recursive https://github.com/fskorzec/shadow-flux.git /cc/flux`;
    yield Env_1.Env.cd `/cc/flux`;
    yield Node_1.Node.npm `install`;
    yield Node_1.Node.npm `run test`;
    yield Docker_1.stop();
}))();
