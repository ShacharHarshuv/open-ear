import { transpose } from './transpose';

describe('transpose', function () {
  describe('Single note type', function () {
    it('C + 3', () => {
      expect(transpose('C', 3)).toEqual('D#');
    })

    it('D - 4', () => {
      expect(transpose('D', -4)).toEqual('A#');
    })
  });

  describe('single note', function () {
    it('C4 + 3', () => {
      expect(transpose('C4', 3)).toEqual('D#4');
    })

    it('D2 - 4', () => {
      expect(transpose('D2', -4)).toEqual('A#1');
    })
  });

  describe('multiple notes', function () {
    it('[C4, E4] + 3', () => {
      expect(transpose(['C4', 'E4'], 3)).toEqual(['D#4', 'G4']);
    })

    it('[D2, G2] - 4', () => {
      expect(transpose(['D2', 'G2'], -4)).toEqual(['A#1', 'D#2']);
    })
  });

  describe('note events', function () {
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
        }
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
        }
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
        }
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
        }
      ]);
    })
  });
});
