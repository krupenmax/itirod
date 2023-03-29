import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {bootstrapApplication} from '@angular/platform-browser';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { LogService } from './app/services/log.service';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [importProvidersFrom(RouterModule.forRoot(routes)), importProvidersFrom([BrowserAnimationsModule]), provideHttpClient(), LogService, DatePipe]
});
