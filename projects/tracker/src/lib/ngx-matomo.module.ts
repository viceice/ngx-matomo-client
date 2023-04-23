import { EnvironmentProviders, ModuleWithProviders, NgModule } from '@angular/core';
import { MatomoOptOutFormComponent } from './directives/matomo-opt-out-form.component';
import { MatomoTrackClickDirective } from './directives/matomo-track-click.directive';
import { MatomoTrackerDirective } from './directives/matomo-tracker.directive';
import { MatomoFeature, provideMatomo, withScriptFactory } from './ngx-matomo-providers';
import { MatomoConfiguration } from './tracker/configuration';
import { MatomoScriptFactory } from './tracker/script-factory';

const DIRECTIVES = [MatomoTrackerDirective, MatomoTrackClickDirective, MatomoOptOutFormComponent];

function buildProviders(
  config: MatomoConfiguration,
  scriptFactory?: MatomoScriptFactory
): EnvironmentProviders {
  const features: MatomoFeature[] = [];

  if (scriptFactory) {
    features.push(withScriptFactory(scriptFactory));
  }

  return provideMatomo(config, ...features);
}

@NgModule({
  imports: DIRECTIVES,
  exports: DIRECTIVES,
})
export class NgxMatomoModule {
  static forRoot(
    config: MatomoConfiguration,
    scriptFactory?: MatomoScriptFactory
  ): ModuleWithProviders<NgxMatomoModule> {
    return {
      ngModule: NgxMatomoModule,
      providers: [buildProviders(config, scriptFactory)],
    };
  }
}

/**
 * @deprecated use NgxMatomoModule instead
 */
@NgModule({
  imports: [NgxMatomoModule],
  exports: [NgxMatomoModule],
})
export class NgxMatomoTrackerModule {
  static forRoot(
    config: MatomoConfiguration,
    scriptFactory?: MatomoScriptFactory
  ): ModuleWithProviders<NgxMatomoTrackerModule> {
    return {
      ngModule: NgxMatomoTrackerModule,
      providers: [buildProviders(config, scriptFactory)],
    };
  }
}
