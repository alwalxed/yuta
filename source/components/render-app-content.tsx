import React from 'react';
import {Text} from 'ink';
import {useCheckImages} from '../hooks/use-check-images.js';
import {uuid} from '../utils/uuid.js';
import {domainRegex, fullUrlRegex} from '../constants.js';
import {Scan} from './scan/index.js';
import {Install} from './install.js';
import {Default} from './default.js';

export function RenderAppContent({
	command,
	arg,
}: {
	readonly command: string | undefined;
	readonly arg?: string;
}) {
	const {imagesStatus} = useCheckImages();
	switch (command) {
		case 'install': {
			return imagesStatus ? (
				<Text color="green">All images are already installed.</Text>
			) : (
				<Install />
			);
		}

		case 'scan': {
			if (!imagesStatus) {
				return (
					<Text color="orange">
						Some images are not installed. Run yuta install.
					</Text>
				);
			}

			if (typeof arg !== 'string') {
				return <Text color="red">Invalid URL</Text>;
			}

			if (!arg) {
				return <Text color="yellow">URL is required.</Text>;
			}

			if (!fullUrlRegex.test(arg)) {
				return <Text color="red">Invalid URL.</Text>;
			}

			if (!domainRegex.test(arg)) {
				return (
					<Text color="yellow">
						Enter a domain like {'{ example.com }'}, without http:// or
						https://.
					</Text>
				);
			}

			return <Scan url={arg} uniqueIdentifier={uuid()} />;
		}

		default: {
			return <Default />;
		}
	}
}
