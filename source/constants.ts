export const dockerPullCommand =
	'docker pull alwalxed/amass && docker pull alwalxed/dnsx && docker pull alwalxed/httpx && docker pull alwalxed/subfinder';

export const symbols = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
export const colors = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta', 'white'];

export const installedTool = [
	'docker run alwalxed/amass amass -h',
]

export const platform =
	process.platform === 'win32'
		? 'windows'
		: process.platform === 'darwin'
		? 'macos'
		: process.platform === 'linux'
		? 'linux'
		: 'linux';