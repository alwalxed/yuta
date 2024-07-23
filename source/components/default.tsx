import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import {Box, Text} from 'ink';
import {uuid} from '../utils/uuid.js';

const gradient = ['#7E4E60', '#B287A3'];

export function Default() {
	return (
		<Box flexDirection="column" display="flex" alignItems="flex-start" gap={1}>
			<TitleBox />
			<UsageBox />
			<DescriptionBox />
			<Gradient colors={gradient}>
				For more information and updates, visit:
				https://github.com/alwalxed/yuta {'\n'}
			</Gradient>
		</Box>
	);
}

function TitleBox() {
	return (
		<Box display="flex" flexDirection="column" alignItems="flex-start">
			<Gradient colors={gradient}>
				<BigText text="yuta" align="left" font="simple" />
				<Text>Automated Domain Enumeration Tool</Text>
			</Gradient>
		</Box>
	);
}

function UsageBox() {
	return (
		<Box
			marginLeft={2}
			display="flex"
			flexDirection="column"
			alignItems="flex-start"
		>
			<Gradient colors={gradient}>Usage:</Gradient>
			<Box marginLeft={2}>
				<Text>yuta install {'                   '} Install Yuta</Text>
			</Box>
			<Box marginLeft={2}>
				<Text>
					yuta scan example.com {'          '} Perform domain enumeration
				</Text>
			</Box>
		</Box>
	);
}

function DescriptionBox() {
	const points: readonly string[] = [
		'Finds subdomains with Amass.',
		'Cleans and filters results.',
		'Runs DNS probes with DNSx.',
		'Probes HTTP with HTTPx.',
		'Outputs a clean file.',
		'File is sorted by status code.',
		'Includes title, domain, method, status, technology, and server.',
	];
	return (
		<Box
			marginLeft={2}
			display="flex"
			flexDirection="column"
			alignItems="flex-start"
		>
			<Gradient colors={gradient}>How Yuta Works:</Gradient>
			<Box marginLeft={2} display="flex" flexDirection="column">
				{points.map(text => (
					<PointsBox key={uuid()} text={text} />
				))}
			</Box>
		</Box>
	);
}

function PointsBox({text}: {readonly text: string}) {
	return (
		<Box>
			<Text bold>{'• '}</Text>
			<Text>{text}</Text>
		</Box>
	);
}
