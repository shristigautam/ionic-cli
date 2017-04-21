import * as path from 'path';

import * as replace from 'replace';

const pluginName = process.argv[2];
const pluginPath = path.join(__dirname, `../packages/${pluginName}`);
const plugin = require(pluginPath);
const pkg = require(path.join(pluginPath, 'package.json'));
const nameMatchStr = '__NAME__';
const versionMatchStr = '__VERSION__';

if (!plugin.name) {
  throw new Error(`Plugin ${pluginName} MUST define and export a 'name' attribute`);
}

if (!plugin.version) {
  throw new Error(`Plugin ${pluginName} MUST define and export a 'version' attribute`);
}

const replacePath = path.join(pluginPath, pkg.main);

replace({ regex: nameMatchStr, replacement: pkg.name, paths: [replacePath], recursive: false });
replace({ regex: versionMatchStr, replacement: pkg.version, paths: [replacePath], recursive: false });