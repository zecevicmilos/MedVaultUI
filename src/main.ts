// src/main.ts
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

// === Locale za srpski (ćirilica i latinica) ===
import { registerLocaleData } from '@angular/common';
import localeSr from '@angular/common/locales/sr';        // sr-RS (ćirilica)
import localeSrLatn from '@angular/common/locales/sr-Latn'; // sr-Latn-RS (latinica)

// Registruj locale podatke da bi date pipe radio bez greške NG0701
registerLocaleData(localeSr, 'sr-RS');
registerLocaleData(localeSrLatn, 'sr-Latn-RS');

// Bootstrap aplikacije
platformBrowser()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch(err => console.error(err));
