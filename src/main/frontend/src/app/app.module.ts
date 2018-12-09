import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// Routes
import {APP_ROUTING} from './app.routes';
// Components
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {MeasureListComponent} from './components/measures/measure-list/measure-list.component';
import {MeasureGraphicsComponent} from './components/measures/measure-graphics/measure-graphics.component';
import {AboutComponent} from './components/about/about.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
// Services
import {MeasuresService} from './services/measures.service';
import { MeasureComponent } from './components/measures/measure/measure.component';
import { MeasuresSearchComponent } from './components/measures/measures-search/measures-search.component';
import { MeasureByDataComponent } from './components/measures/measure-by-data/measure-by-data.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        MeasureListComponent,
        MeasureGraphicsComponent,
        AboutComponent,
        MeasureComponent,
        MeasuresSearchComponent,
        MeasureByDataComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,
        ChartsModule,
        APP_ROUTING
    ],
    providers: [MeasuresService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
