import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import {exec} from 'child_process';
import {colors, dockerPullCommand, symbols} from './constants.js';

type Status = 'error' | 'disconnect' | 'close' | 'exit' | 'spawn' | null;

export function Install() {
	const [output, setOutput] = useState('');
	const [status, setStatus] = useState<Status>(null);

	useEffect(() => {
		const childProcess = exec(dockerPullCommand);

		childProcess.stdout?.on('data', data => {
			setOutput(prevOutput => prevOutput + data.toString());
		});

		childProcess.stderr?.on('data', data => {
			setOutput(prevOutput => prevOutput + `Stderr: ${data.toString()}`);
		});

		const handleProcessEvents = (eventName: Status) => () => {
			setStatus(eventName);
		};

		childProcess.on('error', handleProcessEvents('error'));
		childProcess.on('disconnect', handleProcessEvents('disconnect'));
		childProcess.on('close', handleProcessEvents('close'));
		childProcess.on('exit', handleProcessEvents('exit'));
		childProcess.on('spawn', handleProcessEvents('spawn'));

		return () => {
			childProcess.kill();
		};
	}, []);

	return (
		<Box flexDirection="column" alignItems="flex-start">
			<Text color={'gray'} italic wrap='truncate-end'>{output}</Text>
			{renderStatus(status)}
		</Box>
	);
}

function renderStatus(status: Status) {
	switch (status) {
		case 'error':
			return (
				<Text color="red">
					{'Oops. Something went wrong. Run `yuta install` again.\n'}
				</Text>
			);
		case 'disconnect':
			return <Text color="magenta">{'You have been disconnected\n'}</Text>;
		case 'exit':
			return <Text color="yellow">{'Exited\n'}</Text>;
		case 'close':
			return <Close />;
		case 'spawn':
			return <Spawn />;
		default:
			return null;
	}
}

function Close() {
	return (
		<Text italic color="green">
			Successful installation. Run{' {'}
			<Text bold color="whiteBright">{' yuta scan example.com '}</Text>{'} now.\n'}
		</Text>
	);

}

export function Spawn() {
	const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
	const [currentColorIndex, setCurrentColorIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentColorIndex(prevIndex => (prevIndex + 1) % colors.length);
			setCurrentSymbolIndex(prevIndex => (prevIndex + 1) % symbols.length);
		}, 200);

		return () => clearInterval(interval);
	}, []);

	const currentColor = colors[currentColorIndex];
	const currentSymbol = symbols[currentSymbolIndex];


	return <Text color={currentColor}>{currentSymbol}</Text>;
}