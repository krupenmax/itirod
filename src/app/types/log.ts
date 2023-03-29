import { User } from "./user";

export type Log = {
	date: string,
	message: string,
	createdBy?: string | User,
	isChecked: boolean
};
