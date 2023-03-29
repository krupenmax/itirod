import { User } from "./user";

export type Activity = {
	category: string,
	description: string,
	rate: number,
	place?: string,
	imageName?: string,
	usersSubscribed: User[],
	date: Date,
	placeUrl: PlaceUrl,
	userOwner: User | undefined
};

export type PlaceUrl = {
	lat: number,
	lng: number
};
