import os from 'node:os';
import fs from 'node:fs/promises';
import path from 'node:path';
import {cwd} from 'node:process';
import React, {useEffect, useState} from 'react';
import {Text, useApp} from 'ink';

export function FinalOutput({
	baseName,
	url,
	uniqueIdentifier,
}: {
	readonly baseName: string;
	readonly url: string;
	readonly uniqueIdentifier: string;
}) {
	const {exit} = useApp();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);
	const [outputFile, setOutputFile] = useState<string>('');

	useEffect(() => {
		let isMounted = true;

		(async () => {
			if (!url || !uniqueIdentifier) {
				if (isMounted) {
					setError('Invalid input: URL or unique identifier is missing.');
					setLoading(false);
					exit();
				}

				return;
			}

			const currentDir = cwd();

			const inputFilePath = path.resolve(
				os.homedir(),
				'.yuta/httpx',
				`${baseName}-${uniqueIdentifier}-unique.txt`,
			);
			const outputFilePath = path.resolve(
				currentDir,
				`${baseName}-${uniqueIdentifier}.txt`,
			);

			try {
				await fs.copyFile(inputFilePath, outputFilePath);
				if (isMounted) {
					setLoading(false);
					setOutputFile(outputFilePath);
					exit();
				}
			} catch (error: unknown) {
				if (isMounted) {
					setError(
						`Error occurred while creating output file: ${
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
	}, [url, uniqueIdentifier, exit, baseName]);

	if (loading) {
		return (
			<Text italic color="gray">
				Preparing output file...
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
		<Text italic color="whiteBright">
			Output file has been created successfully at{' '}
			<Text italic color="greenBright">
				{outputFile || 'current directory'}
			</Text>
		</Text>
	);
}
