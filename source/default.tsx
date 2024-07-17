import React from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { Box,Text } from 'ink';

export function Default() {
	return (
		<Box flexDirection="column" display="flex" alignItems="flex-start" gap={1}>
			<TitleBox />
			<UsageBox />
			<DescriptionBox />
			<Gradient colors={['#03001e', '#7303c0']}>
				For more information and updates, visit:
				https://github.com/alwalxed/yuta {"\n"}
			</Gradient>
		</Box>
	);
}

function TitleBox() {
	return (
		<Box display="flex" flexDirection="column" alignItems="flex-start">
			<Gradient colors={['#03001e', '#7303c0']}>
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
			<Gradient colors={['#03001e', '#7303c0']}>Usage:</Gradient>
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
const points = [
	'First, yuta finds subdomains with amass or subfinder',
	'Next, it cleans and filters them',
	'Then, runs DNS probes with dnsx to catch wildcards',
	'Runs HTTP probes with httpx to catch 404s',
	'Outputs a clean file',
	'File is sorted by status code',
	'Includes title, IP, domain, and status for each entry',
];
	return (
		<Box
			marginLeft={2}
			display="flex"
			flexDirection="column"
			alignItems="flex-start"
		>
			<Gradient colors={['#03001e', '#7303c0']}>How Yuta Works:</Gradient>
			<Box marginLeft={2} display="flex" flexDirection="column">
				{points.map((text, index) => (
					<PointsBox key={index} text={text} />
				))}
			</Box>
		</Box>
	);
}

function PointsBox({text}: {text: string}) {
	return (
		<Box>
			<Text bold>{'• '}</Text>
			<Text>{text}</Text>
		</Box>
	);
}