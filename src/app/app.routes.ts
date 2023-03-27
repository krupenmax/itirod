import { HttpClientModule } from "@angular/common/http";
import { Route } from "@angular/router";
import { LoginGuard } from "./login.guard";

export const routes: Route[] = [
	{
		path: "", loadComponent: () => import("./login/login.component").then(m => m.LoginComponent)
	},
	{
		path: "home", canActivate: [LoginGuard], loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
	},
];
