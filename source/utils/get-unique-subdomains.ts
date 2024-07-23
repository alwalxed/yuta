import fs from 'node:fs/promises';
import ansiRegex from 'ansi-regex';

export async function getUniqueSubdomains(
	inputFilePath: string,
	outputFilePath: string,
	pattern: string,
	columnOfPattern: number,
) {
	try {
		const data = await fs.readFile(inputFilePath, 'utf8');

		const lines = data.split('\n').filter(Boolean);

		const uniqueSubdomains = new Set<string>();

		const ansiRegexPattern = ansiRegex();

		for (const line of lines) {
			const cleanedLine = line.replace(ansiRegexPattern, '').trim();
			const columnedLine = cleanedLine.split(/\s+/);
			const targetColumn = columnedLine[columnOfPattern - 1];
			if (!targetColumn) {
				continue;
			}

			if (targetColumn.endsWith(pattern) && targetColumn !== pattern) {
				uniqueSubdomains.add(targetColumn);
			}
		}

		const uniqueSubdomainsArray = [pattern, ...uniqueSubdomains];
		const outputData = uniqueSubdomainsArray.join('\n') + '\n';

		await fs.writeFile(outputFilePath, outputData);
	} catch (error: unknown) {
		console.error('Error processing file:', error);
	}
}
