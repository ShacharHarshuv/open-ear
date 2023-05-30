import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ExerciseSummaryComponent } from './components/exercise-summary/exercise-summary.component';

@NgModule({
  imports: [
    HomePage,
    ExerciseSummaryComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
})
export class HomePageModule {}
