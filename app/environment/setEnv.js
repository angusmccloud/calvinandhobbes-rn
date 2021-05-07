#!/bin/node
const fs = require('fs');

// Obtain the environment string passed to the node script
const environment = process.argv[2];

// read the content of the json file
// if-structure to silence Typescript String Literal on Requires
const envFileContent =
  environment === 'dev'
    ? require(`./envConfig/dev.json`)
    : environment === 'test'
    ? require(`./envConfig/test.json`)
    : require(`./envConfig/prod.json`);

// copy the json inside the env.json file
fs.writeFileSync(
  'app/environment/env.json',
  JSON.stringify(envFileContent, undefined, 2),
);
