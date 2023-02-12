import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from "@angular/router";
import { routes } from './app.routes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
	imports: [ LoginComponent, RouterModule ]
})
export class AppComponent {
    title = 'Lab';
}
