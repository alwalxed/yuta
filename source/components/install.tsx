import React, {useEffect} from 'react';
import {Box, Text} from 'ink';
import {useCommand} from '../hooks/use-command.js';
import type {CommandStatus} from '../types.js';
import {Loader} from './loader.js';

export const dockerPullCommand = `docker pull alwalxed/amass &&
	 docker pull alwalxed/dnsx &&
	 docker pull alwalxed/httpx &&
	 docker pull alwalxed/subfinder
	`;

export function Install() {
	const {status, output, stopProcess} = useCommand(dockerPullCommand);

	useEffect(() => {
		if (status === 'close') {
			stopProcess();
		}
	}, [status, stopProcess]);

	return (
		<Box flexDirection="column" alignItems="flex-start">
			<Text italic color="gray" wrap="truncate-end">
				{output}
			</Text>
			{renderCommandStatus(status, {
				error: 'Oops. Something went wrong. Run `yuta install` again.',
				closeComponent: (
					<Text italic color="green">
						Successful installation. Run{' { '}
						<Text bold color="whiteBright">
							yuta scan example.com
						</Text>
						{' } '}
						{'now.\n'}
					</Text>
				),
			})}
		</Box>
	);
}

function renderCommandStatus(
	status: CommandStatus,
	message: {
		error: string;
		closeComponent: React.ReactNode;
	},
) {
	switch (status) {
		case 'error': {
			return <Text color="red">{message.error}</Text>;
		}

		case 'disconnect': {
			return <Text color="magenta">{'You have been disconnected\n'}</Text>;
		}

		case 'exit': {
			return <Text color="yellow">{'Exited\n'}</Text>;
		}

		case 'close': {
			return message.closeComponent;
		}

		case 'spawn': {
			return <Loader />;
		}

		default: {
			return null;
		}
	}
}
