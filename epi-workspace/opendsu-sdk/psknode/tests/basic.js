const path = require('path');
require("../../builds/output/testsRuntime");
require("../../builds/output/pskWebServer");

const tir = require(path.resolve(path.join(__dirname, "util/tir.js")));
const assert = require('double-check').assert;

const domain = 'local';
const agent = 'exampleAgent';
const agents = [agent];

const constitutionFolder = path.resolve(path.join(__dirname, "./basicConstitution"));

assert.callback('Basic Test', (finished) => {
    tir.addDomain(domain, agents, constitutionFolder);

    tir.launch(6000, () => {
        $$.interactions.startSwarmAs(`${domain}/agent/${agent}`, "basicTestEcho", "say", "Hello").onReturn(function (err, result) {
            assert.equal("Echo Hello", result);
            finished();
        });
    });
}, 15000);