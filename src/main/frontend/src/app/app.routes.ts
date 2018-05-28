import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {MeasureComponent} from "./components/measures/measure/measure.component";
import {MeasureByDataComponent} from "./components/measures/measure-by-data/measure-by-data.component";

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    // {path: 'measure/:id', component: MeasureComponent},
    {path: 'measure/:id', component: MeasureByDataComponent},
    {path: 'about', component: AboutComponent},

    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
