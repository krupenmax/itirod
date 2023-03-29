import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Log } from '../types/log';
import { User } from '../types/user';

@Injectable({
  	providedIn: 'root'
})
export class LogService {
	private logs: Log[] = [];
  	constructor(private datepipe: DatePipe) { }

	public addLog(message: string, createdBy?: string | User) {
		const newLog = {
			message: message,
			createdBy: createdBy,
			date: this.datepipe.transform((new Date), "MM/dd/yyyy h:mm:ss")?.toString() as string,
			isChecked: false
		};
		this.logs.push(newLog);
	}

	public markAllAsChecked(): void {
		this.logs.forEach((log) => {
			log.isChecked = true;
		})
	}

	public markAsChecked(log: Log): void {
		this.logs.forEach((item) => {
			if (log === item) {
				item.isChecked = !item.isChecked;
			}
		})
	}

	public getLogs(): Log[] {
		return this.logs;
	}
}
