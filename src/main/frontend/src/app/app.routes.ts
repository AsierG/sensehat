import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {MeasureComponent} from "./components/measures/measure/measure.component";

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'measure/:id', component: MeasureComponent},
    {path: 'about', component: AboutComponent},

    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
