import { Mode } from 'src/app/exercise/utility';
import { convertModalAnalysis } from './modal-analysis';

fdescribe('modalAnalysis', () => {
  it('should convert modal analysis', () => {
    expect(
      convertModalAnalysis({
        scaleDegree: '1',
        currentTonic: 1,
        mode: Mode.Major,
        modalAnalysis: 'tonic-1',
      }),
    ).toBe('1');
  });
});
