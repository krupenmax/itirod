import { Injectable } from '@angular/core';
import { Activity } from '../types/activity';
import { User } from '../types/user';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';

@Injectable({
  	providedIn: 'root'
})
export class ActivityService {
	public activities: Activity[] = [];
  	constructor(private userService: UserService, private datepipe: DatePipe) {
		for (let i = 0; i < 3; i++) {
			this.activities.push({
				category: "Кино",
				description: "Очень большое описание о том, как я хочу сходить в кинои оно не влазит в одну строчку",
				rate: 4.9,
				place: "Дом кино",
				imageName: "",
				usersSubscribed: [],
				date: this.datepipe.transform((new Date), "MM/dd/yyyy")?.toString() as string,
				placeUrl: { lat: 0, lng: 0 },
				userOwner: undefined,
				time: this.datepipe.transform((new Date), "h:mm:ss")?.toString() as string
			});
		}
	}

	public addActivity(activity: Activity): void {
		this.activities.push(activity);
	}

	public getActivities(): Activity[] {
		return this.activities;
	}

	public getUserSubscriptions(user: User): Activity[] {
		return this.activities.filter((activity) => activity.usersSubscribed.includes(user));
	}

	public getOwnedActivities(user: User): Activity[] {
		console.log(this.activities.filter((activity) => activity.userOwner === user));
		return this.activities.filter((activity) => activity.userOwner === user);
	}
}
