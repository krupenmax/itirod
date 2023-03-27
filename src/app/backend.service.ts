import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BackendService {

	constructor(private http: HttpClient) { }

	// public get(url: string): Observable<User> {
	// 	return this.http.get<User>(url);
	// }

	public post(url: string, user: User): void {
		this.http.post<User>(url, user);
	}

	public readonly users = {
		get$: (): Observable<DummyResponse> => {
			return this.http.get<DummyResponse>("https://dummyjson.com/users?&select=firstName,lastName,password,username");
		}
	}
}

export type DummyResponse = {
	total: number,
	skip: number,
	limit: number,
	users: User[]
}
