import notificationSound from '$lib/assets/notification.wav'
import { RECAPTCHA_CLIENT_KEY } from './env';


export const GetRecaptchaToken = async () => {
	return new Promise((resolve, reject) => {
		grecaptcha.ready(async () => {
			const token = await grecaptcha.execute(RECAPTCHA_CLIENT_KEY, {
				action: 'submit'
			});
			return resolve(token);
		});
	});
};

export const playNotificationSound = () => {
    console.log("playNotificationSound");
    const audio = new Audio(notificationSound);
    audio.volume = 0.5;
    audio.play();
};

/**
* Calculates the haversine distance between point A, and B.
* @param {number[]} latlngA [lat, lng] point A
* @param {number[]} latlngB [lat, lng] point B
* @param {boolean} isMiles If we are using miles, else km.
*/
export const haversineDistance = ([lat1, lon1], [lat2, lon2], isMiles = false) => {
 const toRadian = angle => (Math.PI / 180) * angle;
 const distance = (a, b) => (Math.PI / 180) * (a - b);
 const RADIUS_OF_EARTH_IN_KM = 6371;

 const dLat = distance(lat2, lat1);
 const dLon = distance(lon2, lon1);

 lat1 = toRadian(lat1);
 lat2 = toRadian(lat2);

 // Haversine Formula
 const a =
   Math.pow(Math.sin(dLat / 2), 2) +
   Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
 const c = 2 * Math.asin(Math.sqrt(a));

 let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

 if (isMiles) {
   finalDistance /= 1.60934;
 }

 return finalDistance;
};