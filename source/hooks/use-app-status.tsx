import {platform as nodePlatform} from 'node:process';

import {useCallback, useEffect, useState} from 'react';
import {
	checkDockerInstallation,
	createYutaFolders,
} from '../utils/os-commands.js';
import type {AppStatus} from '../types.js';

export function useAppStatus() {
	const [appStatus, setAppStatus] = useState<AppStatus>(undefined);

	const initializeApp = useCallback(async () => {
		try {
			if (nodePlatform === 'win32') {
				setAppStatus('not-supported');
				return;
			}

			await checkDockerInstallation();
			await createYutaFolders();

			setAppStatus('ok');
		} catch (error: unknown) {
			console.error('Error:', error);
			if (error === 'docker-not-installed') {
				setAppStatus('docker-not-installed');
			} else if (error === 'folder-not-created') {
				setAppStatus('folder-not-created');
			}
		}
	}, []);

	useEffect(() => {
		initializeApp().catch(console.error);
	}, [initializeApp]);

	return {appStatus};
}
