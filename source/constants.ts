import {platform as nodePlatform} from 'node:process';

export const enumerationTools = [
	{key: 'amass', label: 'amass', value: 'amass'},
	{key: 'subfinder', label: 'subfinder', value: 'subfinder'},
];

export const dockerImages = [
	'alwalxed/subfinder:latest',
	'alwalxed/httpx:latest',
	'alwalxed/dnsx:latest',
	'alwalxed/amass:latest',
];

export const symbols = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
export const colors = [
	'red',
	'green',
	'yellow',
	'blue',
	'cyan',
	'magenta',
	'white',
];

export const installedTool = ['docker run alwalxed/amass amass -h'];

export const platform =
	nodePlatform === 'win32'
		? 'windows'
		: nodePlatform === 'darwin'
		? 'macos'
		: nodePlatform === 'linux'
		? 'linux'
		: 'linux';

export const fullUrlRegex =
	/^(https?:\/\/)?[a-zA-Z\d\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
export const domainRegex = /^[a-zA-Z\d\-.]+\.[a-zA-Z]{2,}$/;
