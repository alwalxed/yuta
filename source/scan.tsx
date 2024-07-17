import React from 'react';
import {Text} from 'ink';

export function Scan({url}: {url: string | undefined}) {
	return <Text>Scanning {url}</Text>;
}
