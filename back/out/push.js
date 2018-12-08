"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
node_fetch_1.default('https://api.github.com/repos/fskorzec/shadow-flux/statuses/159802f8c188f4d1866c5d7904af18c3e0989db3', {
    method: "POST",
    body: JSON.stringify({
        "state": "success",
        "target_url": "https://example.com/build/status",
        "description": "The build succeeded!",
        "context": "continuous-integration/jenkins"
    })
});
