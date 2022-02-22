import {
  BaseComponentDebugger,
  TestingUtility,
} from '../../shared/testing-utility';
import { ExercisePage } from './exercise.page';
import { Exercise } from '../Exercise';
import {
  flush,
  TestBed,
} from '@angular/core/testing';
import { PlayerService } from '../../services/player.service';

export class ExercisePageDebugger extends BaseComponentDebugger<ExercisePage> {
  //#region Getters
  getPossibleAnswersList(): {
    answerText: string,
    wasWrong: boolean,
  }[] {
    return this.spectator.queryAll('.exercise__answer-button').map((element: HTMLElement) => ({
      answerText: element.innerText,
      wasWrong: element.classList.contains('--wrong'),
    }))
  }

  getExerciseTitle(): string | null {
    const toolbarElement: HTMLElement | null = this.spectator.query<HTMLElement>('ion-toolbar');
    return toolbarElement?.innerText ?? null;
  }

  getCurrentAnswersList(): {
    answer: Exercise.Answer | null;
    wasWrong: boolean;
  }[] {
    return Array.from(document.querySelectorAll('app-answer-indication')).map((answerIndication: HTMLElement) => {
      return {
        answer: answerIndication.innerText === '?' ? null : answerIndication.innerText,
        wasWrong: answerIndication.classList.contains('--wrong'),
      }
    });
  }

  getNextButton(): HTMLElement {
    return TestingUtility.getButtonByText('Next');
  }
  //#endregion

  //#region Actions
  displayExplanation(): void {
    TestingUtility.getButtonByIcon('help-outline').click();
    this.fixture.detectChanges();
  }

  closeExplanation(): void {
    TestingUtility.getButtonByIcon('close-outline').click();
    this.fixture.detectChanges();
  }

  clickOnRepeat(): void {
    TestingUtility.getButtonByText('repeat').click();
    this.fixture.detectChanges();
  }

  clickOnMusicalNote(): void {
    TestingUtility.getButtonByIcon('musical-note').click();
    this.fixture.detectChanges();
  }

  clickOnAnswer(answerText: string): void {
    TestingUtility.getButtonByText(answerText).click();
    flush();
    this.detectChanges();
  }

  nextQuestion() {
    this.getNextButton().click();
    flush();
    this.detectChanges();
  }
  //#endregion
}
