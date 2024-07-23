import os from 'node:os';
import path from 'node:path';
import React, {useEffect, useState} from 'react';
import {Text, useApp} from 'ink';
import type {ScanSteps} from '../../types.js';
import {getWorkingDomains} from '../../utils/get-working-domains.js';

export function HttpxClean({
	baseName,
	setStep,
	uniqueIdentifier,
	pattern,
	columnOfPattern,
}: {
	readonly baseName: string;
	readonly setStep: React.Dispatch<React.SetStateAction<ScanSteps>>;
	readonly uniqueIdentifier: string;
	readonly pattern: string;
	readonly columnOfPattern: number;
}) {
	const {exit} = useApp();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		let isMounted = true;

		(async () => {
			if (!pattern || !uniqueIdentifier) {
				if (isMounted) {
					setError('Invalid input: pattern or unique identifier is missing.');
					setLoading(false);
					exit();
				}

				return;
			}

			const inputFilePath = path.resolve(
				os.homedir(),
				'.yuta/httpx',
				`${baseName}-${uniqueIdentifier}-initial.txt`,
			);
			const outputFilePath = path.resolve(
				os.homedir(),
				'.yuta/httpx',
				`${baseName}-${uniqueIdentifier}-unique.txt`,
			);

			try {
				await getWorkingDomains(
					inputFilePath,
					outputFilePath,
					pattern,
					columnOfPattern,
				);
				if (isMounted) {
					setStep('Preparing final results');
					setLoading(false);
				}
			} catch (error: unknown) {
				if (isMounted) {
					setError(
						`Error occurred while cleaning domains in the http probing step: ${
							error instanceof Error ? error.message : 'Unknown error'
						}`,
					);
					setLoading(false);
					exit();
				}
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [pattern, uniqueIdentifier, exit, setStep, columnOfPattern, baseName]);

	if (loading) {
		return (
			<Text italic color="gray">
				Cleaning domains...
			</Text>
		);
	}

	if (error) {
		return (
			<Text italic color="red">
				{error}
			</Text>
		);
	}

	return (
		<Text italic color="gray">
			Unique subdomains have been processed successfully in the http probing
			step.
		</Text>
	);
}
