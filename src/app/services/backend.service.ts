import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
	providedIn: 'root',
})
export class BackendService {

	constructor(private http: HttpClient) { }

	public post(url: string, user: User): void {
		this.http.post<User>(url, user);
	}

	public readonly users = {
		get$: (): Observable<DummyResponse> => {
			return this.http.get<DummyResponse>("https://dummyjson.com/users?&select=firstName,lastName,password,username", { withCredentials: true });
		}
	}
}

export type DummyResponse = {
	total: number,
	skip: number,
	limit: number,
	users: User[]
}
