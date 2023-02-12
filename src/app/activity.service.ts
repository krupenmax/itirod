import { Injectable } from '@angular/core';
import { Activity } from './home/activity';
import { User } from './user';
import { UserService } from './user.service';

@Injectable({
  	providedIn: 'root'
})
export class ActivityService {
	public activities: Activity[] = [];
  	constructor(private userService: UserService) {
		this.activities.push({
			category: "Кино",
			description: "Очень большое описание о том, как я хочу сходить в кинои оно не влазит в одну строчку",
			rate: 4.9,
			place: "Дом кино",
			imageName: "",
			usersSubscribed: [],
			date: new Date(2023, 1, 15, 19, 0),
			placeUrl: "",
			userOwner: this.userService.getUser() as User
		});
	}

	public addActivity(activity: Activity): void {
		this.activities.push(activity);
	}

	public getActivities(): Activity[] {
		return this.activities;
	}
}
