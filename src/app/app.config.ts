import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// NgRx imports
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { taskReducer } from './shared/store/task.reducer';

// Reducers and Effects

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    
    // NgRx setup
    provideStore({
      tasks: taskReducer
    }),
    provideStoreDevtools({
      maxAge: 25, 
      logOnly: false,
    }),
  ],
};
