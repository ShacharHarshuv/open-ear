import { transpose } from './transpose';
import { NotesRange } from './NotesRange';

describe('transpose', function() {
  describe('Single note type', function() {
    it('C + 3', () => {
      expect(transpose('C', 3)).toEqual('D#');
    })

    it('D - 4', () => {
      expect(transpose('D', -4)).toEqual('A#');
    })
  });

  describe('single note', function() {
    it('C4 + 3', () => {
      expect(transpose('C4', 3)).toEqual('D#4');
    })

    it('D2 - 4', () => {
      expect(transpose('D2', -4)).toEqual('A#1');
    })
  });

  describe('multiple notes', function() {
    it('[C4, E4] + 3', () => {
      expect(transpose(['C4', 'E4'], 3)).toEqual(['D#4', 'G4']);
    });

    it('[D2, G2] - 4', () => {
      expect(transpose(['D2', 'G2'], -4)).toEqual(['A#1', 'D#2']);
    });

    it('should fail gracefully when some of the notes are out of range', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      expect(transpose(['D#1', 'D#2'], -12)).toEqual(['D#1']);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      consoleErrorSpy.and.callThrough();
    });

    it('should fail fatally when all of the notes are out of range', () => {
      expect(() => transpose(['D#1'], -12)).toThrow();
    });
  });

  describe('note events', function() {
    it('[C4, E4] + 3', () => {
      expect(transpose([
        {
          notes: 'C4',
          time: 0,
          duration: '4n',
          velocity: 0.8,
        },
        {
          notes: 'E4',
          time: 5,
          duration: '8n',
          velocity: 0.9,
        },
      ], 3)).toEqual([
        {
          notes: 'D#4',
          time: 0,
          duration: '4n',
          velocity: 0.8,
        },
        {
          notes: 'G4',
          time: 5,
          duration: '8n',
          velocity: 0.9,
        },
      ]);
    })

    it('[D2, G2] - 4', () => {
      expect(transpose([
        {
          notes: 'D2',
          time: 0,
          duration: '4n',
          velocity: 0.8,
        },
        {
          notes: 'G2',
          time: 5,
          duration: '8n',
          velocity: 0.9,
        },
      ], -4)).toEqual([
        {
          notes: 'A#1',
          time: 0,
          duration: '4n',
          velocity: 0.8,
        },
        {
          notes: 'D#2',
          time: 5,
          duration: '8n',
          velocity: 0.9,
        },
      ]);
    })

    it('should fail gracefully when some notes in the same event are out of range', () => {
      const consoleErrorSpy = spyOn(console, 'error');
      expect(transpose([
        {
          notes: ['D#1', 'D#2'],
          time: 0,
          duration: '4n',
          velocity: 0.8,
        }
      ], -12)).toEqual([
        {
          notes: ['D#1'],
          time: 0,
          duration: '4n',
          velocity: 0.8,
        }
      ]);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      consoleErrorSpy.and.callThrough();
    });

    it('should fail fatally when all notes in one event are out of range', () => {
      expect(() => transpose([
        {
          notes: ['D#1'],
          time: 0,
          duration: '4n',
          velocity: 0.8,
        },
        {
          notes: ['D#2'],
          time: 0,
          duration: '4n',
          velocity: 0.8,
        }
      ], -12)).toThrow();
    });
  });

  describe('note range', function() {
    it('should work', () => {
      expect(transpose(new NotesRange('C1', 'G1'), 3)).toEqual(new NotesRange('D#1', 'A#1'));
    })
  })
});
