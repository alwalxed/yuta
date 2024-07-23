import {exec} from 'node:child_process';

export const createYutaFolders = async () => {
	return new Promise<void>((resolve, reject) => {
		exec(
			'mkdir -p ~/.yuta && mkdir -p ~/.yuta/httpx && mkdir -p ~/.yuta/dnsx && mkdir -p ~/.yuta/amass',
			error => {
				if (error) {
					reject(new Error('folder-not-created'));
				} else {
					resolve();
				}
			},
		);
	});
};

export const checkDockerInstallation = async () => {
	return new Promise<void>((resolve, reject) => {
		exec('docker --version', error => {
			if (error) {
				reject(new Error('docker-not-installed'));
			} else {
				resolve();
			}
		});
	});
};
