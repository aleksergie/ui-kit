import { Route } from '@angular/router';

import { NestedCheckboxes } from './nested-checkboxes/nested-checkboxes';

export const appRoutes: Route[] = [{ path: '**', component: NestedCheckboxes }];
