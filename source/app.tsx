import React, {useEffect, useState} from 'react';
import {Install} from './install.js';
import {Scan} from './scan.js';
import {Default} from './default.js';
import {exec} from 'child_process';
import {Text} from 'ink';

type Status =
	| 'not-supported'
	| 'docker-not-installed'
	| 'folder-not-created'
	| 'ok'
	| null;

export function App({input}: {input: string[]}) {
	const [status, setStatus] = useState<Status>(null);

	useEffect(() => {
		initializeApp();
	}, []);

	const initializeApp = async () => {
		try {
			if (process.platform === 'win32') {
				setStatus('not-supported');
				return;
			}

			await checkDockerInstalled();
			await createYutaFolder();

			setStatus('ok');
		} catch (error) {
			console.error('Error:', error);
			if (error === 'docker-not-installed') {
				setStatus('docker-not-installed');
			} else if (error === 'folder-not-created') {
				setStatus('folder-not-created');
			}
		}
	};

	const checkDockerInstalled = () => {
		return new Promise<void>((resolve, reject) => {
			exec('docker --version', (error) => {
				if (error) {
					reject('docker-not-installed');
				} else {
					resolve();
				}
			});
		});
	};

	const createYutaFolder = () => {
		return new Promise<void>((resolve, reject) => {
			exec('mkdir -p ~/.yuta', (error) => {
				if (error) {
					reject('folder-not-created');
				} else {
					resolve();
				}
			});
		});
	};

	if (status === 'not-supported') {
		return <Text color="red">Windows is not supported.</Text>;
	}

	if (status === 'docker-not-installed') {
		return <Text color="red">Docker is not installed.</Text>;
	}

	if (status === 'folder-not-created') {
		return <Text color="red">Folder ~/.yuta/ not created.</Text>;
	}

	if (status === 'ok') {
		switch (input[0]) {
			case 'install':
				return <Install />;
			case 'scan':
				return <Scan url={input[1]} />;
			default:
				return <Default />;
		}
	}

	return null;
}