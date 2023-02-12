import { Route } from "@angular/router";

export const routes: Route[] = [
	{
		path: "", loadComponent: () => import("./login/login.component").then(m => m.LoginComponent)
	},
	{
		path: "home", loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
	},
];
