import {
  BaseComponentDebugger,
  TestingUtility,
} from '../../shared/testing-utility';
import { ExercisePage } from './exercise.page';
import { Exercise } from '../Exercise';
import { flush } from '@angular/core/testing';

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

  getStats(): {
    correctAnswers: number,
    totalAnswers: number,
    percentage: number,
  } {
    const text: string | null = this.spectator.query<HTMLElement>('.exercise__stats-container')?.innerText ?? null;
    if (!text) {
      throw new Error(`Could not find stats element`);
    }
    const match: RegExpMatchArray | null = text.match(/Correct answers: ([0-9]+)\/([0-9]+) \(([0-9\.]+)\%\)/);
    if (!match) {
      throw new Error(`String "${text}" is not in the expected format for stats`);
    }

    return {
      correctAnswers: +match[1],
      totalAnswers: +match[2],
      percentage: +match[3],
    }
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

  clickOnNext(): void {
    this.getNextButton().click();
    flush();
    this.detectChanges();
  }
  //#endregion
}
