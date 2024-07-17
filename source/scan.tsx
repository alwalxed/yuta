import React from 'react';
import {Text} from 'ink';

//    TODO:
/*
		- ------------------------------------------>
		* Check if tools are installed. (using dockerode)
    * Validate the URL.
		- ------------------------------------------>
    = Output selectors for choosing amass or subfinder.
    = Generate a unique identifier for the process (used for output file names).
    = Run the selected tool with the URL, outputting to ~/.yuta/[tool]/identifier-initial.txt.
    # Monitor the tool until completion.
    - Clean and filter the output for unique entries, storing in ~/.yuta/[tool]/identifier-unique.txt.
    - Run DNS probes on the unique entries, storing output in ~/.yuta/dnsx/identifier.txt.
		# Monitor dnsx until completion.
    - Run HTTP probes on the unique entries, storing output in ~/.yuta/httpx/identifier-initial.txt.
		# Monitor httpx until completion.
    - Remove 404s from HTTPS entries, store output in ~/.yuta/httpx/identifier-working.txt.
    - Sort the working entries, store output in ~/.yuta/httpx/identifier-sorted.txt.
    - Remove duplicate entries, store output in ~/.yuta/httpx/identifier-unique.txt.
    + Copy unique entries to the current directory.
*/

export function Scan({url}: {url: string | undefined}) {
	return <Text>Scanning {url}</Text>;
}
