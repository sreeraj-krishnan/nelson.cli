#!/usr/bin/env node
'use strict';

require('colors');

var ini = require('ini');
var fs = require('fs');
var program = require('commander');

var _require = require('./index'),
    initNode = _require.initNode;

var _require2 = require('./node/node'),
    DEFAULT_OPTIONS = _require2.DEFAULT_OPTIONS;

var _require3 = require('./node/peer-list'),
    DEFAULT_LIST_OPTIONS = _require3.DEFAULT_OPTIONS;

var version = require('../package.json').version;

var parseNeighbors = function parseNeighbors(val) {
    return val.split(' ');
};
var parseNumber = function parseNumber(v) {
    return parseInt(v);
};

process.on('unhandledRejection', function (reason, p) {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

program.version(version).option('-n, --neighbors [value]', 'Trusted neighbors', parseNeighbors, []).option('--getNeighbors [url]', 'Download default set of neighbors', false).option('-c, --cycleInterval [value]', 'Cycle interval in seconds', parseNumber, DEFAULT_OPTIONS.cycleInterval).option('-e, --epochInterval [value]', 'Epoch interval in seconds', parseNumber, DEFAULT_OPTIONS.epochInterval).option('--incomingMax [value]', 'Maximal incoming connection slots', parseNumber, DEFAULT_OPTIONS.incomingMax).option('--outgoingMax [value]', 'Maximal outgoing connection slots', parseNumber, DEFAULT_OPTIONS.outgoingMax).option('-a, --apiPort [value]', 'Nelson API port', parseNumber, DEFAULT_OPTIONS.apiPort).option('-o, --apiHostname [value]', 'Nelson API hostname', DEFAULT_OPTIONS.apiHostname).option('-p, --port [value]', 'Nelson port', parseNumber, DEFAULT_OPTIONS.port).option('-r, --IRIHostname [value]', 'IRI API hostname', DEFAULT_OPTIONS.IRIHostname).option('-i, --IRIPort [value]', 'IRI API port', parseNumber, DEFAULT_OPTIONS.IRIPort).option('-t, --TCPPort [value]', 'IRI TCP port', parseNumber, DEFAULT_OPTIONS.TCPPort).option('-u, --UDPPort [value]', 'IRI UDP port', parseNumber, DEFAULT_OPTIONS.UDPPort).option('-d, --dataPath [value]', 'Peer database path', DEFAULT_LIST_OPTIONS.dataPath).option('-m, --isMaster [value]', 'Is a master node', false).option('-s, --silent [value]', 'Silent', false).option('-g, --gui [value]', 'GUI', false).option('--temporary [value]', 'Create a temporary node', false).option('--config [value]', 'Config file path', null).parse(process.argv);

var configPath = process.env.NELSON_CONFIG || program.config;

initNode(configPath ? ini.parse(fs.readFileSync(configPath, 'utf-8')).nelson : program);