import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	private users: User[] = [];
	private loggedUser?: User;

  	constructor() {
		this.users.push({
			login: "123",
			password: "123",
			name: "123",
			secondName: "123"
		});
	}

	public addUser(user: User): void {
		this.users.push(user);
	}

	public getUsers(): User[] {
		return this.users;
	}

	public getUser(): User | undefined {
		return this.loggedUser;
	}

	public setUser(user: User | undefined): void {
		this.loggedUser = user;
	}
}
