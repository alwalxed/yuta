import React from 'react';
import {Text} from 'ink';
import type {AppStatus} from '../types.js';

export function AppNotOkStatusMessage({
	appStatus,
}: {
	readonly appStatus: AppStatus;
}) {
	switch (appStatus) {
		case 'not-supported': {
			return <Text color="red">Windows is not supported.</Text>;
		}

		case 'docker-not-installed': {
			return <Text color="red">Docker is not installed.</Text>;
		}

		case 'folder-not-created': {
			return <Text color="red">Folder ~/.yuta/ not created.</Text>;
		}

		default: {
			return null;
		}
	}
}
