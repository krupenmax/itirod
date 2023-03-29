import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { BackendService } from './backend.service';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	private users: User[] = [];
	private loggedUser?: User;

  	constructor(private backendService: BackendService) {

		this.users.push({
			login: "123",
			password: "123",
			firstName: "123",
			lastName: "123",
			username: "123	",
			email: "123"
		});

		this.backendService.users.get$().subscribe(response => {
			response.users.forEach(user => {
				const newUser: User = {
					firstName: user.firstName,
					lastName: user.lastName,
					login: user.username,
					username: user.username,
					password: user.password,
					email: user.email
				};
				this.users.push(newUser);
			})
		});;
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

	public editUser(oldUser: User, newUser: User): void {
		this.users.push(newUser);
		this.users = this.users.filter((user) => oldUser !== user);
		if (this.loggedUser === oldUser) {
			this.loggedUser = newUser;
		}
	}

	public initUsers(users: User[]): void {
		users.forEach(user => {
			this.users.push(user);
		})
	}
}
