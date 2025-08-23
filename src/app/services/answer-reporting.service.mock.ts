import { Injectable, OnDestroy, Provider } from '@angular/core';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { AnswerReportingService } from './answer-reporting.service';

@Injectable()
class AnswerReportingServiceMock
  implements PublicMembers<AnswerReportingService>, OnDestroy
{
  async reportAttempt() {}

  async reportQuestion() {}

  async sendCachedAnswers() {}

  async getCachedAnswersCount() {
    return 0;
  }

  ngOnDestroy() {
    return;
  }
}

export function provideAnswerReportingServiceMock(): Provider[] {
  return [
    AnswerReportingServiceMock,
    {
      provide: AnswerReportingService,
      useExisting: AnswerReportingServiceMock,
    },
  ];
}
