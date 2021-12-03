import {Component, Input} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-exercise-explanation',
  templateUrl: './exercise-explanation.page.html',
  styleUrls: ['./exercise-explanation.page.scss'],
})
export class ExerciseExplanationPage {

  constructor(
    private _modalController: ModalController,
  ) { }

  @Input()
  content: string;

  @Input()
  exerciseName: string;

  async close(): Promise<void> {
    await this._modalController.dismiss();
  }
}
