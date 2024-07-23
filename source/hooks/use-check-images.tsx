import {useState, useEffect} from 'react';
import {dockerImages} from '../constants.js';
import {checkImagesInstallation} from '../utils/check-installed-images.js';

export const useCheckImages = () => {
	const [imagesStatus, setImagesStatus] = useState<boolean | undefined>(
		undefined,
	);

	useEffect(() => {
		const checkImages = async () => {
			try {
				const result = await checkImagesInstallation(dockerImages);
				setImagesStatus(result);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error('Error checking images:', error.message);
				} else {
					console.error('Error checking images:', error);
				}

				setImagesStatus(false);
			}
		};

		void checkImages();
	}, []);

	return {imagesStatus};
};
