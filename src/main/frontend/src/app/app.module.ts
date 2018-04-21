import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
//Routes
import {APP_ROUTING} from './app.routes';
//Components
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {MeasureListComponent} from './components/measures/measure-list/measure-list.component';
import {MeasureGraphicsComponent} from './components/measures/measure-graphics/measure-graphics.component';
import {AboutComponent} from './components/about/about.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

//Services
import {MeasuresService} from "./services/measures.service";
import { MeasureComponent } from './components/measures/measure/measure.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        MeasureListComponent,
        MeasureGraphicsComponent,
        AboutComponent,
        MeasureComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        APP_ROUTING
    ],
    providers: [MeasuresService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
