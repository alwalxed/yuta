import React from 'react';
import {Help} from './help.js';
import {Install} from './install.js';
import {Scan} from './scan.js';
import {Default} from './default.js';

export function App({input}: {input: string[]}) {
	switch (input[0]) {
		case 'help':
			return <Help />;
		case 'install':
			return <Install />;
		case 'scan':
			return <Scan url={input[1]} />;
		default:
			return <Default />;
	}
}
