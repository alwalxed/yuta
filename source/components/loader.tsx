import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import {colors, symbols} from '../constants.js';

export function Loader() {
	const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
	const [currentColorIndex, setCurrentColorIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentColorIndex(
				previousIndex => (previousIndex + 1) % colors.length,
			);
			setCurrentSymbolIndex(
				previousIndex => (previousIndex + 1) % symbols.length,
			);
		}, 200);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const currentColor = colors[currentColorIndex];
	const currentSymbol = symbols[currentSymbolIndex];

	return (
		<Text italic color={currentColor}>
			{currentSymbol}
		</Text>
	);
}
