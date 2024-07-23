import {exec, type ChildProcess} from 'node:child_process';
import type {Buffer} from 'node:buffer';
import {useState, useEffect, useCallback} from 'react';
import type {CommandStatus} from '../types.js';

export function useCommand(command: string) {
	const [status, setStatus] = useState<CommandStatus | undefined>(undefined);
	const [output, setOutput] = useState<string>('');
	const [childProcess, setChildProcess] = useState<ChildProcess | undefined>(
		undefined,
	);

	useEffect(() => {
		const process = exec(command);
		setChildProcess(process);

		const handleData = (data: Buffer) => {
			setOutput(previousOutput => previousOutput + data.toString());
		};

		const handleErrorData = (data: Buffer) => {
			setOutput(previousOutput => previousOutput + `${data.toString()}\n`);
			if (process) {
				process.kill();
			}
		};

		const handleProcessEvents = (eventName: CommandStatus) => () => {
			setStatus(eventName);
			if (
				process &&
				(eventName === 'error' ||
					eventName === 'disconnect' ||
					eventName === 'exit')
			) {
				process.kill();
			}
		};

		process.stdout?.on('data', handleData);
		process.stderr?.on('data', handleErrorData);

		process.on('error', handleProcessEvents('error'));
		process.on('disconnect', handleProcessEvents('disconnect'));
		process.on('close', handleProcessEvents('close'));
		process.on('exit', handleProcessEvents('exit'));
		process.on('spawn', handleProcessEvents('spawn'));

		return () => {
			process.stdout?.off('data', handleData);
			process.stderr?.off('data', handleErrorData);
			process.kill();
		};
	}, [command]);

	const stopProcess = useCallback(() => {
		if (childProcess) {
			childProcess.kill();
		}
	}, [childProcess]);

	return {status, output, stopProcess};
}
