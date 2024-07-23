export type AppStatus =
	| 'not-supported'
	| 'docker-not-installed'
	| 'folder-not-created'
	| 'ok'
	| undefined;

export type CommandStatus =
	| 'error'
	| 'disconnect'
	| 'close'
	| 'exit'
	| 'spawn'
	| undefined;

export type ScanSteps =
	| 'Domain enumeration'
	| 'Cleaning domains'
	| 'DNS probing'
	| 'HTTP probing'
	| 'Cleaning non-working domains'
	| 'Preparing final results';
