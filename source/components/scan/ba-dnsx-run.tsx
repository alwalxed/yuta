import os from 'node:os';
import React, {useEffect} from 'react';
import {Box, Text} from 'ink';
import type {ScanSteps} from '../../types.js';
import {useCommand} from '../../hooks/use-command.js';

export function DnsxRun({
	baseName,
	setStep,
	uniqueIdentifier,
}: {
	readonly baseName: string;
	readonly setStep: React.Dispatch<React.SetStateAction<ScanSteps>>;
	readonly uniqueIdentifier: string;
}) {
	const command = `docker run -v ${os.homedir()}/.yuta:/root/.yuta alwalxed/dnsx dnsx -l /root/.yuta/amass/${baseName}-${uniqueIdentifier}-unique.txt -o /root/.yuta/dnsx/${baseName}-${uniqueIdentifier}.txt`;
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
			setStep('HTTP probing');
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
