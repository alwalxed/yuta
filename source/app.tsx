import React from 'react';
import {useAppStatus} from './hooks/use-app-status.js';
import {AppNotOkStatusMessage} from './components/app-status-not-ok.js';
import {RenderAppContent} from './components/render-app-content.js';

export default function App({input}: {readonly input: string[]}) {
	const {appStatus} = useAppStatus();
	const [command, arg] = input;

	if (appStatus !== 'ok') {
		return <AppNotOkStatusMessage appStatus={appStatus} />;
	}

	return <RenderAppContent command={command} arg={arg} />;
}
