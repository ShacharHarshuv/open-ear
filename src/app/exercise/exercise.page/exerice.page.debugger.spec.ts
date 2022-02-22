import {
  BaseComponentDebugger,
  TestingUtility,
} from '../../shared/testing-utility';
import { ExercisePage } from './exercise.page';
import { Exercise } from '../Exercise';

export class ExercisePageDebugger extends BaseComponentDebugger<ExercisePage> {
  getPossibleAnswersList(): string[] {
    return this.spectator.queryAll('.exercise__answer-button').map((element: HTMLElement) => element.innerText)
  }

  getExerciseTitle(): string | null {
    const toolbarElement: HTMLElement | null = this.spectator.query<HTMLElement>('ion-toolbar');
    return toolbarElement?.innerText ?? null;
  }

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
}
