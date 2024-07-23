import Docker from 'dockerode';

const docker = new Docker();

export async function checkImagesInstallation(
	dockerImages: string[],
): Promise<boolean> {
	try {
		const images = await docker.listImages();
		const installedImages = new Set<string>(
			images.flatMap(image => image.RepoTags ?? []),
		);

		return dockerImages.every(image => installedImages.has(image));
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error checking images:', error.message);
		} else {
			console.error('Error checking images:', error);
		}

		return false;
	}
}
