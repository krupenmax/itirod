import { User } from "./user";

export type Activity = {
	category: string,
	description: string,
	rate: number,
	place?: string,
	imageName?: string,
	usersSubscribed: User[],
	date: string,
	placeUrl: PlaceUrl,
	userOwner: User | undefined,
	time: string
};

export type PlaceUrl = {
	lat: number,
	lng: number
};
