import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {bootstrapApplication} from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [importProvidersFrom(RouterModule.forRoot(routes)), importProvidersFrom([BrowserAnimationsModule]), provideHttpClient()]
});
