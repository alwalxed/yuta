import React, {useEffect} from 'react';
import {Box, Text} from 'ink';
import type {ScanSteps} from '../../types.js';
import {useCommand} from '../../hooks/use-command.js';

export function HttpxRun({
	baseName,
	setStep,
	uniqueIdentifier,
}: {
	readonly baseName: string;
	readonly setStep: React.Dispatch<React.SetStateAction<ScanSteps>>;
	readonly uniqueIdentifier: string;
}) {
	const command = `docker run -v ~/.yuta:/root/.yuta alwalxed/httpx httpx -l /root/.yuta/dnsx/${baseName}-${uniqueIdentifier}.txt -nc -fhr -method -td -title -server -sc -o /root/.yuta/httpx/${baseName}-${uniqueIdentifier}-initial.txt`;
	return <RunCommand command={command} setStep={setStep} />;
}

export function RunCommand({
	command,
	setStep,
}: {
	readonly command: string;
	readonly setStep: React.Dispatch<React.SetStateAction<ScanSteps>>;
}) {
	const {output, status, stopProcess} = useCommand(command);

	useEffect(() => {
		if (status === 'close') {
			setStep('Cleaning non-working domains');
			stopProcess();
		}
	}, [status, setStep, stopProcess]);

	return (
		<Box flexDirection="column" alignItems="flex-start">
			<Text italic color="gray" wrap="truncate-end">
				{output}
			</Text>
		</Box>
	);
}