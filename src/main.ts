import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {bootstrapApplication} from '@angular/platform-browser';
import { provideRoutes } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [importProvidersFrom(RouterModule.forRoot(routes)), importProvidersFrom([BrowserAnimationsModule])]
});
