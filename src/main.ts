import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs'; // material2 gesture support
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// for change detection profiling
// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
//   const applicationRef = ref.injector.get(ApplicationRef);
//   const appComponent = applicationRef.components[0];
//   enableDebugTools(appComponent);
// });
// in console: ng.profiler.timeChangeDetection();
// in console: ng.profiler.timeChangeDetection({record:true}); -- will write a dump to Chrome profiler

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
