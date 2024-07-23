#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow({
	allowUnknownFlags: false,
	autoHelp: false,
	importMeta: import.meta,
});

render(<App input={cli.input} />);
