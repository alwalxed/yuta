import React, {useState} from 'react';
import {Box, Text} from 'ink';
import type {ScanSteps} from '../../types.js';
import {AmassRun} from './aa-amass-run.js';
import {AmassClean} from './ab-amass-clean.js';
import {DnsxRun} from './ba-dnsx-run.js';
import {HttpxRun} from './ca-httpx-run.js';
import {HttpxClean} from './cb-httpx-clean.js';
import {FinalOutput} from './da-final-output.js';
import { Loader } from '../loader.js';

type Props = {readonly url: string; readonly uniqueIdentifier: string};

export function Scan({url, uniqueIdentifier}: Props) {
	const baseName = url.split('.')[0] ?? 'results';
	const steps: ScanSteps[] = [
		'Domain enumeration',
		'Cleaning domains',
		'DNS probing',
		'HTTP probing',
		'Cleaning non-working domains',
		'Preparing final results',
	];
	const [step, setStep] = useState<ScanSteps>('Domain enumeration');

	function renderStep() {
		switch (step) {
			case 'Domain enumeration': {
				return (
					<AmassRun
						baseName={baseName}
						setStep={setStep}
						url={url}
						uniqueIdentifier={uniqueIdentifier}
					/>
				);
			}

			case 'Cleaning domains': {
				return (
					<AmassClean
						baseName={baseName}
						setStep={setStep}
						uniqueIdentifier={uniqueIdentifier}
						pattern={url}
						columnOfPattern={1}
					/>
				);
			}

			case 'DNS probing': {
				return (
					<DnsxRun
						baseName={baseName}
						setStep={setStep}
						uniqueIdentifier={uniqueIdentifier}
					/>
				);
			}

			case 'HTTP probing': {
				return (
					<HttpxRun
						baseName={baseName}
						setStep={setStep}
						uniqueIdentifier={uniqueIdentifier}
					/>
				);
			}

			case 'Cleaning non-working domains': {
				return (
					<HttpxClean
						baseName={baseName}
						setStep={setStep}
						uniqueIdentifier={uniqueIdentifier}
						pattern="[404]"
						columnOfPattern={2}
					/>
				);
			}

			case 'Preparing final results': {
				return (
					<FinalOutput
						baseName={baseName}
						url={url}
						uniqueIdentifier={uniqueIdentifier}
					/>
				);
			}

			default: {
				return <Text>Invalid step</Text>;
			}
		}
	}

	return (
		<>
			{renderStep()}
			{step === 'Preparing final results' ? null : (
				<Box>
					<Loader />
					<Text italic color="gray">{` [${steps.indexOf(step) + 1}/${
						steps.length
					}] ${step}`}</Text>
				</Box>
			)}
		</>
	);
}
