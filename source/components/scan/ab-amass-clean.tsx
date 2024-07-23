import os from 'node:os';
import path from 'node:path';
import React, {useEffect, useState} from 'react';
import {Text, useApp} from 'ink';
import type {ScanSteps} from '../../types.js';
import {getUniqueSubdomains} from '../../utils/get-unique-subdomains.js';

export function AmassClean({
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
					setError('Invalid input: URL or unique identifier is missing.');
					setLoading(false);
					exit();
				}

				return;
			}

			const inputFilePath = path.resolve(
				os.homedir(),
				'.yuta/amass',
				`${baseName}-${uniqueIdentifier}-initial.txt`,
			);
			const outputFilePath = path.resolve(
				os.homedir(),
				'.yuta/amass',
				`${baseName}-${uniqueIdentifier}-unique.txt`,
			);

			try {
				await getUniqueSubdomains(
					inputFilePath,
					outputFilePath,
					pattern,
					columnOfPattern,
				);
				if (isMounted) {
					setStep('DNS probing');
					setLoading(false);
				}
			} catch (error: unknown) {
				if (isMounted) {
					setError(
						`Error occurred while cleaning domains in the enumerating step: ${
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
			Unique subdomains have been processed successfully in the enumerating
			step.
		</Text>
	);
}
