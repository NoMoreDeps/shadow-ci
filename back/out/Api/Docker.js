"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dockerode_1 = __importDefault(require("dockerode"));
class Docker {
    constructor(options) {
        this._dockerode = new dockerode_1.default(options);
    }
    createVolume() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._dockerode.createVolume({ "Name": "cc" });
        });
    }
    cleanAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._dockerode.pruneContainers();
            yield this._dockerode.pruneVolumes();
        });
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((r, x) => {
                this._dockerode.run(options.image, options.cmd, options.outputStream, options.createOptions, void 0, (error, result) => {
                    if (error) {
                        x(error);
                    }
                    else {
                        r(result);
                    }
                });
            });
        });
    }
}
exports.docker = new Docker({
    host: '127.0.0.1',
    port: process.env.DOCKER_PORT || 2375,
    version: 'v1.25'
});
exports.start = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.docker.createVolume();
});
exports.stop = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.docker.cleanAll();
});
let pwd = "./";
exports.getPwd = () => {
    return pwd;
};
exports.setPwd = (path) => {
    pwd = path;
};
