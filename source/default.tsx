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
'Discovers subdomains',
		'Filters them',
		'Runs DNS and HTTP probes',
		'Outputs a clean file of working, non-duplicate entries',
	];
	return (
		<Box
			marginLeft={2}
			display="flex"
			flexDirection="column"
			alignItems="flex-start"
		>
			<Gradient colors={['#03001e', '#7303c0']}>Description:</Gradient>
			<Box marginLeft={2}>
				<Gradient colors={['#03001e', '#7303c0']}>
					Yuta automates domain enumeration:
				</Gradient>
			</Box>
			<Box marginLeft={4} display="flex" flexDirection="column">
				{points.map((text, index) => (
					<PointsBox order={index + 1} text={text} />
				))}
			</Box>
		</Box>
	);
}

function PointsBox({order, text}: {order: number, text: string}) {
	return (
		<Box>
			<Text bold>
				{order}){' '}
			</Text>
			<Text>{text}</Text>
		</Box>
	);
}