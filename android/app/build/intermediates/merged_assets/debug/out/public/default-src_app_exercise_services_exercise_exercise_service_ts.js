"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_exercise_services_exercise_exercise_service_ts"],{

/***/ 51254:
/*!**************************************!*\
  !*** ./src/app/exercise/Exercise.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Exercise": () => (/* binding */ Exercise)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/ts-utility */ 40352);


var Exercise;
(function (Exercise) {
    function normalizeAnswerLayoutCellConfig(cell) {
        var _a;
        if (!cell || typeof cell !== 'object') {
            return {
                answer: cell,
                space: 1,
            };
        }
        return {
            space: (_a = cell.space) !== null && _a !== void 0 ? _a : 1,
            answer: cell.answer,
        };
    }
    Exercise.normalizeAnswerLayoutCellConfig = normalizeAnswerLayoutCellConfig;
    function flatAnswerList(answerList) {
        return Array.isArray(answerList) ? answerList : lodash__WEBPACK_IMPORTED_MODULE_0__.flatMap(answerList.rows.map(row => row.map(cellConfig => {
            if (typeof cellConfig === 'object') {
                return cellConfig === null || cellConfig === void 0 ? void 0 : cellConfig.answer;
            }
            else {
                return cellConfig;
            }
        }).filter(_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.isValueTruthy)));
    }
    Exercise.flatAnswerList = flatAnswerList;
})(Exercise || (Exercise = {}));


/***/ }),

/***/ 28576:
/*!***********************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordArpeggioExercise/ChordArpeggioExercise.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChordArpeggioExercise": () => (/* binding */ ChordArpeggioExercise)
/* harmony export */ });
/* harmony import */ var _utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/BaseMelodicDictationExercise */ 81482);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/music/chords */ 72491);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/ts-utility */ 40352);



class ChordArpeggioExercise extends _utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_0__.BaseMelodicDictationExercise {
    constructor() {
        super();
        this.id = 'chordArpeggio';
        this.name = 'Chord Arpeggio';
        this.summary = 'Identify melodic lines that arpeggiate chord tone';
        this.explanation = 'In this exercise a chord will be played but its notes will be broken melodically, either ascending or descending. Your job is to understand what is the chord and work out the notes in it.';
        this.includedChords = ['C', 'G']; // todo: make it part of the setting
        this.noteDuration = '4n';
        // In the future we must get those from the selected chords
        this.updateSettings(Object.assign(Object.assign({}, this._settings), { includedAnswers: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'] }));
    }
    getMelodicQuestionInC() {
        const randomChord = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__.randomFromList)(this.includedChords);
        let voicing = new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord(randomChord).getVoicing({
            topVoicesInversion: 0,
            withBass: false,
        });
        const direction = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__.randomFromList)(['asc', 'desc']);
        if (direction === 'desc') {
            voicing = voicing.reverse();
        }
        return {
            segments: voicing,
        };
    }
    _getSettingsDescriptor() {
        return [
        // todo: add chord selection, inversion selection etc
        ];
    }
}


/***/ }),

/***/ 92515:
/*!******************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordInKeyExercise/ChordsInKeyExercise.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChordsInKeyExercise": () => (/* binding */ ChordsInKeyExercise)
/* harmony export */ });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utility_NumberOfSegmentsSetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/NumberOfSegmentsSetting */ 58548);
/* harmony import */ var _chord_in_key_explanation_chord_in_key_explanation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chord-in-key-explanation/chord-in-key-explanation.component */ 67600);
/* harmony import */ var _utility_PlayAfterCorrectAnswerSetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility/PlayAfterCorrectAnswerSetting */ 69797);
/* harmony import */ var _utility_BaseRomanAnalysisChordProgressionExercise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utility/BaseRomanAnalysisChordProgressionExercise */ 14079);






class ChordsInKeyExercise extends _utility_BaseRomanAnalysisChordProgressionExercise__WEBPACK_IMPORTED_MODULE_5__.BaseRomanAnalysisChordProgressionExercise {
    constructor() {
        super(...arguments);
        this.id = 'chordInKey';
        this.name = 'Chord in Key';
        this.summary = 'Identify chords based on their tonal context in a key';
        this.explanation = _chord_in_key_explanation_chord_in_key_explanation_component__WEBPACK_IMPORTED_MODULE_3__.ChordInKeyExplanationComponent;
    }
    _getChordProgressionInRomanNumerals() {
        const numberOfSegments = this._settings.numberOfSegments;
        const availableChords = this._settings.includedAnswers;
        const chordProgression = [(0,_utility__WEBPACK_IMPORTED_MODULE_0__.randomFromList)(availableChords)];
        while (chordProgression.length < numberOfSegments) {
            chordProgression.push((0,_utility__WEBPACK_IMPORTED_MODULE_0__.randomFromList)(availableChords.filter(chord => chord !== lodash__WEBPACK_IMPORTED_MODULE_1__.last(chordProgression))));
        }
        return {
            chordProgressionInRomanAnalysis: chordProgression,
        };
    }
    _getSettingsDescriptor() {
        return [
            ...super._getSettingsDescriptor(),
            ...(0,_utility_NumberOfSegmentsSetting__WEBPACK_IMPORTED_MODULE_2__.numberOfSegmentsControlDescriptorList)('chords'),
            ...(0,_utility_PlayAfterCorrectAnswerSetting__WEBPACK_IMPORTED_MODULE_4__.playAfterCorrectAnswerControlDescriptorList)({
                show: ((settings) => settings.numberOfSegments === 1),
            }),
        ];
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { numberOfSegments: 1, playAfterCorrectAnswer: true });
    }
}


/***/ }),

/***/ 67600:
/*!**********************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordInKeyExercise/chord-in-key-explanation/chord-in-key-explanation.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChordInKeyExplanationComponent": () => (/* binding */ ChordInKeyExplanationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _chord_in_key_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chord-in-key-explanation.component.html?ngResource */ 92685);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/music/chords */ 72491);




let ChordInKeyExplanationComponent = class ChordInKeyExplanationComponent {
    constructor() {
        this.cadenceAndIChord = this.getChordExample('C', _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave);
        this.cadenceAndVChord = this.getChordExample('G', _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third);
    }
    getChordExample(chordSymbol, topVoicesInversion) {
        return [
            ..._utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.IV_V_I_CADENCE_IN_C,
            {
                notes: [],
                duration: '4n',
            },
            {
                notes: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord(chordSymbol).getVoicing({ topVoicesInversion }),
                velocity: 0.3,
                duration: '1n',
            },
        ];
    }
};
ChordInKeyExplanationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-chord-in-key-explanation',
        template: _chord_in_key_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], ChordInKeyExplanationComponent);



/***/ }),

/***/ 35539:
/*!*************************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordTypeInKeyExercise/ChordTypeInKeyExercise.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChordTypeInKeyExercise": () => (/* binding */ ChordTypeInKeyExercise)
/* harmony export */ });
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/music/chords */ 72491);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/ts-utility */ 40352);
/* harmony import */ var _utility_NumberOfSegmentsSetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/NumberOfSegmentsSetting */ 58548);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utility_BaseTonalChordProgressionExercise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utility/BaseTonalChordProgressionExercise */ 72891);
/* harmony import */ var _chord_type_in_key_explanation_chord_type_in_key_explanation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chord-type-in-key-explanation/chord-type-in-key-explanation.component */ 35642);






const chordsInC = [
    'C',
    'Dm',
    'Em',
    'F',
    'G',
    'Am',
];
class ChordTypeInKeyExercise extends _utility_BaseTonalChordProgressionExercise__WEBPACK_IMPORTED_MODULE_4__.BaseTonalChordProgressionExercise {
    constructor() {
        super(...arguments);
        this.id = 'chordTypeInKey';
        this.name = 'Chord type in key';
        this.summary = 'Identify chord type (major / minor) when all chords are diatonic to the same key';
        this.explanation = _chord_type_in_key_explanation_chord_type_in_key_explanation_component__WEBPACK_IMPORTED_MODULE_5__.ChordTypeInKeyExplanationComponent;
    }
    _getChordProgressionInC() {
        const chordProgression = [new _utility_music_chords__WEBPACK_IMPORTED_MODULE_0__.Chord((0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(chordsInC))];
        while (chordProgression.length < this._settings.numberOfSegments) {
            chordProgression.push(new _utility_music_chords__WEBPACK_IMPORTED_MODULE_0__.Chord((0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(chordsInC.filter(chord => chord !== lodash__WEBPACK_IMPORTED_MODULE_3__.last(chordProgression).symbol))));
        }
        return {
            segments: chordProgression
                .map((chord) => {
                return {
                    answer: chord.type,
                    chord: chord,
                };
            })
        };
    }
    getQuestion() {
        return Object.assign(Object.assign({}, super.getQuestion()), { cadence: undefined });
    }
    _getAllAnswersList() {
        return [
            'M',
            'm',
        ];
    }
    _getSettingsDescriptor() {
        return [
            ...super._getSettingsDescriptor(),
            ...(0,_utility_NumberOfSegmentsSetting__WEBPACK_IMPORTED_MODULE_2__.numberOfSegmentsControlDescriptorList)('chords'),
        ];
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { numberOfSegments: 1 });
    }
}


/***/ }),

/***/ 35642:
/*!************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordTypeInKeyExercise/chord-type-in-key-explanation/chord-type-in-key-explanation.component.ts ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChordTypeInKeyExplanationComponent": () => (/* binding */ ChordTypeInKeyExplanationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _chord_type_in_key_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chord-type-in-key-explanation.component.html?ngResource */ 77824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);



let ChordTypeInKeyExplanationComponent = class ChordTypeInKeyExplanationComponent {
    constructor() { }
    ngOnInit() { }
};
ChordTypeInKeyExplanationComponent.ctorParameters = () => [];
ChordTypeInKeyExplanationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-chord-type-in-key-explanation',
        template: _chord_type_in_key_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], ChordTypeInKeyExplanationComponent);



/***/ }),

/***/ 1264:
/*!******************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/CommonChordProgressionExercise/CommonChordProgressionsExercise.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonChordProgressionsExercise": () => (/* binding */ CommonChordProgressionsExercise)
/* harmony export */ });
/* harmony import */ var _utility_BaseRomanAnalysisChordProgressionExercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/BaseRomanAnalysisChordProgressionExercise */ 14079);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/ts-utility */ 40352);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 85921);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_chord_progressions_explanation_common_chord_progressions_explanation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common-chord-progressions-explanation/common-chord-progressions-explanation.component */ 11624);





class CommonChordProgressionsExercise extends _utility_BaseRomanAnalysisChordProgressionExercise__WEBPACK_IMPORTED_MODULE_0__.BaseRomanAnalysisChordProgressionExercise {
    constructor() {
        super();
        this.explanation = _common_chord_progressions_explanation_common_chord_progressions_explanation_component__WEBPACK_IMPORTED_MODULE_3__.CommonChordProgressionsExplanationComponent;
        this.id = 'commonChordProgression';
        this.name = 'Common Progressions';
        this.summary = 'Practice on recognizing the most common chord progression in popular music.';
        this._startIncludedProgressionsChangeHandler();
    }
    static _getProgressionId(progression) {
        return progression.romanNumerals.join(' ');
    }
    _getChordProgressionInRomanNumerals() {
        const includedProgressions = this._getIncludedProgressionsDescriptors();
        return {
            chordProgressionInRomanAnalysis: (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(includedProgressions.map(progression => progression.romanNumerals))
        };
    }
    _getSettingsDescriptor() {
        return [
            {
                key: 'includedProgressions',
                descriptor: {
                    controlType: 'LIST_SELECT',
                    label: 'Included Options',
                    allOptions: CommonChordProgressionsExercise._progression.map(progression => ({
                        value: CommonChordProgressionsExercise._getProgressionId(progression),
                        label: CommonChordProgressionsExercise._getProgressionId(progression) + (progression.name ? ` (${progression.name})` : ''),
                    })),
                },
            }
        ];
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { includedProgressions: CommonChordProgressionsExercise._defaultProgressions });
    }
    _startIncludedProgressionsChangeHandler() {
        this._settings$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(settings => settings.includedProgressions), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.startWith)(CommonChordProgressionsExercise._defaultProgressions), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this._destroy$)).subscribe(() => {
            this.updateSettings(Object.assign(Object.assign({}, this._settings), { includedAnswers: lodash__WEBPACK_IMPORTED_MODULE_2__.uniq(lodash__WEBPACK_IMPORTED_MODULE_2__.flatMap(this._getIncludedProgressionsDescriptors(), 'romanNumerals')) }));
        });
    }
    _getIncludedProgressionsDescriptors() {
        return CommonChordProgressionsExercise._progression.filter(progression => {
            return this._settings.includedProgressions.includes(CommonChordProgressionsExercise._getProgressionId(progression));
        });
    }
}
CommonChordProgressionsExercise._progression = [
    {
        romanNumerals: ['I', 'V', 'I'],
        name: 'Perfect Cadence'
    },
    {
        romanNumerals: ['I', 'IV', 'I'],
        name: 'Plagal Cadence',
    },
    {
        romanNumerals: ['I', 'IV', 'V', 'I'],
        name: 'Classical Cadence',
    },
    {
        romanNumerals: ['I', 'V', 'IV', 'I'],
        name: 'Blues Cadence',
    },
    {
        romanNumerals: ['I', 'V', 'vi', 'IV'],
        name: 'Axis (optimistic)',
    },
    {
        romanNumerals: ['I', 'V', 'vi', 'IV'],
        name: 'Axis (optimistic)',
    },
    {
        romanNumerals: ['V', 'vi', 'IV', 'I'],
        name: 'Axis'
    },
    {
        romanNumerals: ['vi', 'IV', 'I', 'V'],
        name: 'Axis (pessimistic)',
    },
    {
        romanNumerals: ['IV', 'I', 'V', 'vi'],
        name: 'Axis'
    },
    {
        romanNumerals: ['I', 'vi', 'IV', 'V'],
        name: 'Doo-Wop / 50s',
    },
    {
        romanNumerals: ['I', 'vi', 'ii', 'V'],
        name: 'Circle'
    },
    {
        romanNumerals: ['I', 'vi', 'iii'],
        name: 'Circle'
    },
    {
        romanNumerals: ['I', 'vi', 'iii'],
    },
    {
        romanNumerals: ['I', 'vi', 'iii', 'IV'],
    }
];
CommonChordProgressionsExercise._defaultProgressions = [
    'I V vi IV',
    'I vi IV V',
];


/***/ }),

/***/ 11624:
/*!************************************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/CommonChordProgressionExercise/common-chord-progressions-explanation/common-chord-progressions-explanation.component.ts ***!
  \************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonChordProgressionsExplanationComponent": () => (/* binding */ CommonChordProgressionsExplanationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _common_chord_progressions_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common-chord-progressions-explanation.component.html?ngResource */ 31954);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);



let CommonChordProgressionsExplanationComponent = class CommonChordProgressionsExplanationComponent {
};
CommonChordProgressionsExplanationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-common-chord-progressions-explanation',
        template: _common_chord_progressions_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], CommonChordProgressionsExplanationComponent);



/***/ }),

/***/ 52897:
/*!*************************************************************************!*\
  !*** ./src/app/exercise/exercises/IntervalExercise/IntervalExercise.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IntervalExercise": () => (/* binding */ IntervalExercise)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _utility_BaseCommonSettingsExercise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/BaseCommonSettingsExercise */ 11007);
/* harmony import */ var _interval_exercise_explanation_interval_exercise_explanation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interval-exercise-explanation/interval-exercise-explanation.component */ 82148);




class IntervalExercise extends _utility_BaseCommonSettingsExercise__WEBPACK_IMPORTED_MODULE_2__.BaseCommonSettingsExercise {
    constructor() {
        super(...arguments);
        this.id = 'interval';
        this.name = 'Intervals';
        this.summary = 'Identify intervals without context';
        this.explanation = _interval_exercise_explanation_interval_exercise_explanation_component__WEBPACK_IMPORTED_MODULE_3__.IntervalExerciseExplanationComponent;
        this.range = new _utility__WEBPACK_IMPORTED_MODULE_1__.NotesRange('C3', 'E5');
    }
    getQuestion() {
        const randomIntervalDescriptor = (0,_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(IntervalExercise.intervalDescriptorList.filter(intervalDescriptor => this._settings.includedAnswers.includes(intervalDescriptor.name)));
        const randomStartingNote = lodash__WEBPACK_IMPORTED_MODULE_0__.random(this.range.lowestNoteNumber, this.range.highestNoteNumber - randomIntervalDescriptor.semitones);
        return {
            segments: [{
                    rightAnswer: randomIntervalDescriptor.name,
                    partToPlay: lodash__WEBPACK_IMPORTED_MODULE_0__.shuffle([
                        (0,_utility__WEBPACK_IMPORTED_MODULE_1__.toNoteName)(randomStartingNote),
                        (0,_utility__WEBPACK_IMPORTED_MODULE_1__.toNoteName)(randomStartingNote + randomIntervalDescriptor.semitones),
                    ]),
                }],
        };
    }
    _getAllAnswersList() {
        return lodash__WEBPACK_IMPORTED_MODULE_0__.map(IntervalExercise.intervalDescriptorList, 'name');
    }
}
IntervalExercise.intervalDescriptorList = [
    {
        name: 'Minor 2nd',
        semitones: 1,
    },
    {
        name: 'Major 2nd',
        semitones: 2,
    },
    {
        name: 'Minor 3rd',
        semitones: 3,
    },
    {
        name: 'Major 3rd',
        semitones: 4,
    },
    {
        name: 'Perfect 4th',
        semitones: 5,
    },
    {
        name: 'Aug 4th',
        semitones: 6,
    },
    {
        name: 'Perfect 5th',
        semitones: 7,
    },
    {
        name: 'Minor 6th',
        semitones: 8,
    },
    {
        name: 'Major 6th',
        semitones: 9,
    },
    {
        name: 'Minor 7th',
        semitones: 10,
    },
    {
        name: 'Major 7th',
        semitones: 11,
    },
    {
        name: 'Octave',
        semitones: 12,
    },
];


/***/ }),

/***/ 82148:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/IntervalExercise/interval-exercise-explanation/interval-exercise-explanation.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IntervalExerciseExplanationComponent": () => (/* binding */ IntervalExerciseExplanationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _interval_exercise_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interval-exercise-explanation.component.html?ngResource */ 46669);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _IntervalExercise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../IntervalExercise */ 52897);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utility */ 98979);





let IntervalExerciseExplanationComponent = class IntervalExerciseExplanationComponent {
    constructor() {
        this.intervalDescriptorList = _IntervalExercise__WEBPACK_IMPORTED_MODULE_1__.IntervalExercise.intervalDescriptorList.map(interval => (Object.assign(Object.assign({}, interval), { toPlay: ['C4', (0,_utility__WEBPACK_IMPORTED_MODULE_2__.toNoteNumber)('C4') + interval.semitones] })));
    }
};
IntervalExerciseExplanationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-interval-exercise-explanation',
        template: _interval_exercise_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], IntervalExerciseExplanationComponent);



/***/ }),

/***/ 67131:
/*!*****************************************************************************!*\
  !*** ./src/app/exercise/exercises/NotesInKeyExercise/NotesInKeyExercise.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesInKeyExercise": () => (/* binding */ NotesInKeyExercise)
/* harmony export */ });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/music/notes/getNoteType */ 8100);
/* harmony import */ var _utility_music_notes_getNoteOctave__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utility/music/notes/getNoteOctave */ 57657);
/* harmony import */ var _utility_music_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utility/music/notes/toNoteTypeNumber */ 59553);
/* harmony import */ var _utility_music_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utility/music/notes/noteTypeToNote */ 57875);
/* harmony import */ var _notes_in_key_explanation_notes_in_key_explanation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notes-in-key-explanation/notes-in-key-explanation.component */ 93294);
/* harmony import */ var _utility_NumberOfSegmentsSetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utility/NumberOfSegmentsSetting */ 58548);
/* harmony import */ var _utility_PlayAfterCorrectAnswerSetting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utility/PlayAfterCorrectAnswerSetting */ 69797);
/* harmony import */ var _utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utility/BaseMelodicDictationExercise */ 81482);









class NotesInKeyExercise extends _utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_8__.BaseMelodicDictationExercise {
    constructor() {
        super(...arguments);
        this.id = 'noteInKey';
        this.name = `Notes in Key`;
        this.summary = `Identify notes based on their tonal context in a major scale`;
        this.explanation = _notes_in_key_explanation_notes_in_key_explanation_component__WEBPACK_IMPORTED_MODULE_5__.NotesInKeyExplanationComponent;
        this.rangeForKeyOfC = new _utility__WEBPACK_IMPORTED_MODULE_0__.NotesRange('G2', 'E4');
        this.questionOptionsInC = this._getQuestionOptionsInC();
    }
    getMelodicQuestionInC() {
        const noteOptions = this.questionOptionsInC.filter(questionOption => this._settings.includedAnswers.includes(_utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_8__.noteInCToSolfege[(0,_utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_1__.getNoteType)(questionOption)]));
        const randomQuestionsInC = Array.from(Array(this._settings.numberOfSegments)).map(() => (0,_utility__WEBPACK_IMPORTED_MODULE_0__.randomFromList)(noteOptions));
        // calculation resolution
        let resolution = [];
        if (this._settings.numberOfSegments === 1 && this._settings.playAfterCorrectAnswer) {
            const randomQuestionInC = randomQuestionsInC[0];
            /**
             * Temporary solution, in the future we should either automatically detect it, or enable the user to set it in the setting
             * */
            const detectedScale = this._settings.cadenceType === 'I IV V I' ? ['C', 'D', 'E', 'F', 'G', 'A', 'B'] : ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'];
            const noteOctave = (0,_utility_music_notes_getNoteOctave__WEBPACK_IMPORTED_MODULE_2__.getNoteOctave)(randomQuestionInC);
            const noteType = (0,_utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_1__.getNoteType)(randomQuestionInC);
            if ((0,_utility_music_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__.toNoteTypeNumber)(noteType) < (0,_utility_music_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__.toNoteTypeNumber)('G')) {
                const range = new _utility__WEBPACK_IMPORTED_MODULE_0__.NotesRange((0,_utility_music_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_4__.noteTypeToNote)('C', noteOctave), randomQuestionInC);
                resolution = range.getAllNotes(detectedScale).reverse();
            }
            else {
                const range = new _utility__WEBPACK_IMPORTED_MODULE_0__.NotesRange(randomQuestionInC, (0,_utility_music_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_4__.noteTypeToNote)('C', noteOctave + 1));
                resolution = range.getAllNotes(detectedScale);
            }
            if (resolution[0] !== randomQuestionInC) {
                resolution.unshift(randomQuestionInC);
            }
        }
        return {
            segments: randomQuestionsInC,
            afterCorrectAnswer: resolution.map((note, index) => ({
                partToPlay: [{
                        notes: note,
                        duration: index === 0 ? '4n' : index === resolution.length - 1 ? '2n' : '8n',
                    }],
                answerToHighlight: _utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_8__.noteInCToSolfege[(0,_utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_1__.getNoteType)(note)],
            })),
        };
    }
    _getQuestionOptionsInC() {
        return this.rangeForKeyOfC.getAllNotes().filter((note) => _utility_BaseMelodicDictationExercise__WEBPACK_IMPORTED_MODULE_8__.noteInCToSolfege[(0,_utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_1__.getNoteType)(note)]);
    }
    _getSettingsDescriptor() {
        return [
            ...super._getSettingsDescriptor(),
            ...(0,_utility_NumberOfSegmentsSetting__WEBPACK_IMPORTED_MODULE_6__.numberOfSegmentsControlDescriptorList)('notes'),
            ...(0,_utility_PlayAfterCorrectAnswerSetting__WEBPACK_IMPORTED_MODULE_7__.playAfterCorrectAnswerControlDescriptorList)({
                show: ((settings) => settings.numberOfSegments === 1),
            }),
        ];
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { numberOfSegments: 1, playAfterCorrectAnswer: true });
    }
    _getDefaultSelectedIncludedAnswers() {
        return [
            'Do',
            'Re',
            'Mi',
        ];
    }
}


/***/ }),

/***/ 93294:
/*!**********************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/NotesInKeyExercise/notes-in-key-explanation/notes-in-key-explanation.component.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesInKeyExplanationComponent": () => (/* binding */ NotesInKeyExplanationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _notes_in_key_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notes-in-key-explanation.component.html?ngResource */ 98705);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utility/music/chords */ 72491);




let NotesInKeyExplanationComponent = class NotesInKeyExplanationComponent {
    constructor() {
        this.resolutionOfReInC = [
            ..._utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.IV_V_I_CADENCE_IN_C,
            {
                notes: 'D3',
                duration: '2n.',
            },
            {
                notes: 'C3',
                duration: '2n',
            }
        ];
    }
};
NotesInKeyExplanationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-notes-in-key-explanation',
        template: _notes_in_key_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], NotesInKeyExplanationComponent);



/***/ }),

/***/ 27755:
/*!*************************************************************************************!*\
  !*** ./src/app/exercise/exercises/TriadInversionExercise/TriadInversionExercise.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TriadInversionExercise": () => (/* binding */ TriadInversionExercise)
/* harmony export */ });
/* harmony import */ var _utility_BaseTonalExercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/BaseTonalExercise */ 46167);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/music/chords */ 72491);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/ts-utility */ 40352);
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tone */ 66151);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _triad_inversion_explanation_triad_inversion_explanation_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./triad-inversion-explanation/triad-inversion-explanation.component */ 85401);






const triadInversions = [
    'Root Position',
    '1st Inversion',
    '2nd Inversion',
];
class TriadInversionExercise extends _utility_BaseTonalExercise__WEBPACK_IMPORTED_MODULE_0__.BaseTonalExercise {
    constructor() {
        super(...arguments);
        this.id = 'triadInversions';
        this.name = 'Triad Inversions';
        this.summary = 'Find the inversion of a triad in close position';
        this.explanation = _triad_inversion_explanation_triad_inversion_explanation_component__WEBPACK_IMPORTED_MODULE_5__.TriadInversionExplanationComponent;
    }
    getQuestionInC() {
        const chordsInC = ['C', 'Dm', 'Em', 'F', 'G', 'Am'];
        const randomChordInC = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__.randomFromList)(chordsInC);
        const randomTriadInversion = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__.randomFromList)([0, 1, 2]);
        const answer = triadInversions[randomTriadInversion];
        const voicing = new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord(randomChordInC).getVoicing({
            topVoicesInversion: randomTriadInversion,
            withBass: false,
            octave: 3, // picking a lower octave as a high one is more difficult
        });
        const question = {
            segments: [
                {
                    partToPlay: voicing.map((note, index) => {
                        const noteDelay = index * this._settings.arpeggiateSpeed / 100;
                        return {
                            notes: note,
                            velocity: 0.3,
                            duration: tone__WEBPACK_IMPORTED_MODULE_3__.Time('1n').toSeconds() + (voicing.length - 1) * this._settings.arpeggiateSpeed / 100 - tone__WEBPACK_IMPORTED_MODULE_3__.Time(noteDelay).toSeconds(),
                            time: noteDelay,
                        };
                    }),
                    rightAnswer: answer,
                }
            ],
        };
        if (this._settings.playRootAfterAnswer) {
            question.afterCorrectAnswer = [
                {
                    partToPlay: (0,_utility__WEBPACK_IMPORTED_MODULE_4__.toSteadyPart)(voicing[(3 - randomTriadInversion) % 3], '1n', 0.3),
                    answerToHighlight: answer,
                },
            ];
        }
        return question;
    }
    getQuestion() {
        return Object.assign(Object.assign({}, super.getQuestion()), { cadence: undefined });
    }
    _getAllAnswersList() {
        return {
            rows: triadInversions.map(triadInversion => [triadInversion]),
        };
    }
    _getSettingsDescriptor() {
        return [
            ...super._getSettingsDescriptor(),
            {
                key: 'arpeggiateSpeed',
                descriptor: {
                    controlType: 'SLIDER',
                    label: 'Arpeggiate Speed',
                    min: 0,
                    max: 100,
                    step: 1,
                }
            },
            {
                key: 'playRootAfterAnswer',
                descriptor: {
                    controlType: 'CHECKBOX',
                    label: 'Play Root After Correct Answer',
                }
            }
        ];
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { arpeggiateSpeed: 0, playRootAfterAnswer: true });
    }
}


/***/ }),

/***/ 85401:
/*!********************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/TriadInversionExercise/triad-inversion-explanation/triad-inversion-explanation.component.ts ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TriadInversionExplanationComponent": () => (/* binding */ TriadInversionExplanationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _triad_inversion_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triad-inversion-explanation.component.html?ngResource */ 3337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);



let TriadInversionExplanationComponent = class TriadInversionExplanationComponent {
    constructor() { }
    ngOnInit() { }
};
TriadInversionExplanationComponent.ctorParameters = () => [];
TriadInversionExplanationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-triad-inversion-explanation',
        template: _triad_inversion_explanation_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], TriadInversionExplanationComponent);



/***/ }),

/***/ 11007:
/*!**************************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/BaseCommonSettingsExercise.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseCommonSettingsExercise": () => (/* binding */ BaseCommonSettingsExercise)
/* harmony export */ });
/* harmony import */ var _Exercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Exercise */ 51254);
/* harmony import */ var _BaseExercise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseExercise */ 73730);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var normalizeAnswerLayoutCellConfig = _Exercise__WEBPACK_IMPORTED_MODULE_0__.Exercise.normalizeAnswerLayoutCellConfig;
class BaseCommonSettingsExercise extends _BaseExercise__WEBPACK_IMPORTED_MODULE_1__.BaseExercise {
    constructor() {
        super(...arguments);
        this._allAnswersList = this._getAllAnswersList();
        this.settingsDescriptor = this._getSettingsDescriptor();
        this._settings = this._getDefaultSettings();
    }
    getAnswerList() {
        const includedAnswersList = this._settings.includedAnswers;
        if (Array.isArray(this._allAnswersList)) {
            return lodash__WEBPACK_IMPORTED_MODULE_2__.filter(this._allAnswersList, (answer => includedAnswersList.includes(answer)));
        }
        const normalizedAnswerLayout = {
            rows: this._allAnswersList.rows.map((row) => row.map(normalizeAnswerLayoutCellConfig)),
        };
        return {
            rows: normalizedAnswerLayout.rows.map((row) => lodash__WEBPACK_IMPORTED_MODULE_2__.map(row, answerLayoutCellConfig => answerLayoutCellConfig.answer && includedAnswersList.includes(answerLayoutCellConfig.answer) ? answerLayoutCellConfig : Object.assign(Object.assign({}, answerLayoutCellConfig), { answer: null })))
        };
    }
    _getSettingsDescriptor() {
        const includedAnswersDescriptor = {
            controlType: 'LIST_SELECT',
            label: 'Included Options',
            allOptions: this._getIncludedAnswersOptions().map(answer => ({
                value: answer,
                label: answer,
            })),
        };
        const settingsDescriptorList = [
            {
                key: 'includedAnswers',
                descriptor: includedAnswersDescriptor,
            }
        ];
        // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property
        return settingsDescriptorList;
    }
    _getDefaultSettings() {
        return {
            includedAnswers: this._getDefaultSelectedIncludedAnswers(),
        }; // couldn't find a better way around it, it means that extending classes will have the responsibility to override this property
    }
    _getDefaultSelectedIncludedAnswers() {
        return _Exercise__WEBPACK_IMPORTED_MODULE_0__.Exercise.flatAnswerList(this._allAnswersList);
    }
    _getIncludedAnswersOptions() {
        return _Exercise__WEBPACK_IMPORTED_MODULE_0__.Exercise.flatAnswerList(this._allAnswersList);
    }
}


/***/ }),

/***/ 73730:
/*!************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/BaseExercise.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseExercise": () => (/* binding */ BaseExercise)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 92218);


class BaseExercise {
    constructor() {
        this._settingsChangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(1);
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this._settings$ = this._settingsChangeSubject.asObservable();
    }
    updateSettings(settings) {
        for (let key in this._settings) {
            this._settings[key] = lodash__WEBPACK_IMPORTED_MODULE_0__.isNil(settings[key]) ? this._settings[key] : settings[key];
        }
        this._settingsChangeSubject.next(settings);
    }
    getCurrentSettings() {
        return this._settings;
    }
    onDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}


/***/ }),

/***/ 81482:
/*!****************************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/BaseMelodicDictationExercise.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "solfegeNotesInC": () => (/* binding */ solfegeNotesInC),
/* harmony export */   "noteInCToSolfege": () => (/* binding */ noteInCToSolfege),
/* harmony export */   "BaseMelodicDictationExercise": () => (/* binding */ BaseMelodicDictationExercise)
/* harmony export */ });
/* harmony import */ var _BaseTonalExercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTonalExercise */ 46167);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utility/music/notes/getNoteType */ 8100);



const solfegeNotesInC = [
    {
        note: 'C',
        solfege: 'Do',
    },
    {
        note: 'D',
        solfege: 'Re',
    },
    {
        note: 'D#',
        solfege: 'Me',
    },
    {
        note: 'E',
        solfege: 'Mi',
    },
    {
        note: 'F',
        solfege: 'Fa',
    },
    {
        note: 'G',
        solfege: 'Sol',
    },
    {
        note: 'A',
        solfege: 'La',
    },
    {
        note: 'G#',
        solfege: 'Le',
    },
    {
        note: 'A#',
        solfege: 'Te',
    },
    {
        note: 'B',
        solfege: 'Ti',
    },
];
const noteInCToSolfege = lodash__WEBPACK_IMPORTED_MODULE_1__.mapValues(lodash__WEBPACK_IMPORTED_MODULE_1__.keyBy(solfegeNotesInC, 'note'), 'solfege');
class BaseMelodicDictationExercise extends _BaseTonalExercise__WEBPACK_IMPORTED_MODULE_0__.BaseTonalExercise {
    constructor() {
        super(...arguments);
        this.noteDuration = '2n';
    }
    getQuestionInC() {
        const melodicQuestionInC = this.getMelodicQuestionInC();
        const question = {
            segments: melodicQuestionInC.segments.map(randomQuestionInC => ({
                rightAnswer: noteInCToSolfege[(0,_utility_music_notes_getNoteType__WEBPACK_IMPORTED_MODULE_2__.getNoteType)(randomQuestionInC)],
                partToPlay: [{
                        notes: randomQuestionInC,
                        duration: this.noteDuration,
                    }],
            })),
        };
        if (melodicQuestionInC.afterCorrectAnswer) {
            question.afterCorrectAnswer = melodicQuestionInC.afterCorrectAnswer;
        }
        return question;
    }
    _getAllAnswersList() {
        return {
            rows: [
                [
                    {
                        answer: null,
                        space: 0.58
                    },
                    null,
                    'Me',
                    null,
                    null,
                    'Le',
                    'Te',
                    {
                        answer: null,
                        space: 0.58,
                    },
                    null,
                ],
                [
                    'Do',
                    'Re',
                    'Mi',
                    'Fa',
                    'Sol',
                    'La',
                    'Ti',
                    'Do',
                ],
            ],
        };
    }
    /* Overriding to ensure order is right */
    _getIncludedAnswersOptions() {
        return [
            'Do',
            'Re',
            'Me',
            'Mi',
            'Fa',
            'Sol',
            'Le',
            'La',
            'Te',
            'Ti',
        ];
    }
}


/***/ }),

/***/ 14079:
/*!*****************************************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/BaseRomanAnalysisChordProgressionExercise.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseRomanAnalysisChordProgressionExercise": () => (/* binding */ BaseRomanAnalysisChordProgressionExercise)
/* harmony export */ });
/* harmony import */ var _BaseTonalChordProgressionExercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTonalChordProgressionExercise */ 72891);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/music/chords */ 72491);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _utility_music_transpose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utility/music/transpose */ 20585);





const chordsInC = [
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('C'),
        answer: 'I',
    },
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('Dm'),
        answer: 'ii',
    },
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('Em'),
        answer: 'iii',
    },
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('F'),
        answer: 'IV',
    },
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('G'),
        answer: 'V',
    },
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('Am'),
        answer: 'vi',
    },
    {
        chord: new _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.Chord('Bdim'),
        answer: 'viiᵒ',
    },
];
const romanNumeralToChordInC = lodash__WEBPACK_IMPORTED_MODULE_2__.mapValues(lodash__WEBPACK_IMPORTED_MODULE_2__.keyBy(chordsInC, 'answer'), 'chord');
const romanNumeralToResolution = {
    I: {
        0: [],
        1: [],
        2: [
            {
                romanNumeral: 'I',
                voicingConfig: { topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave },
            },
        ],
    },
    ii: {
        0: [
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Fifth,
                },
            },
        ],
        1: [
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                },
            },
        ],
        2: [
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                },
            },
        ],
    },
    iii: {
        0: [
            {
                romanNumeral: 'IV',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Fifth,
                    octave: 5,
                },
            },
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                },
            },
        ],
        1: [
            {
                romanNumeral: 'IV',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Fifth,
                },
            },
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                    octave: 3,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                },
            },
        ],
        2: [
            {
                romanNumeral: 'IV',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                },
            },
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                },
            },
        ],
    },
    IV: {
        0: [
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                    octave: 3,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: { topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave },
            },
        ],
        1: [
            {
                romanNumeral: 'V',
                voicingConfig: { topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Fifth },
            },
            {
                romanNumeral: 'I',
                voicingConfig: { topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave },
            },
        ],
        2: [
            {
                romanNumeral: 'V',
                voicingConfig: { topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                },
            },
        ],
    },
    V: {
        0: [{
                romanNumeral: 'I',
                voicingConfig: { topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave },
            }],
        1: [{
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                },
            }],
        2: [{
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                },
            }],
    },
    vi: {
        0: [
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Fifth,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                },
            },
        ],
        1: [
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                },
            },
        ],
        2: [
            {
                romanNumeral: 'V',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Third,
                    octave: 3,
                },
            },
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 4,
                },
            },
        ],
    },
    viiᵒ: {
        0: [
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Fifth,
                }
            }
        ],
        1: [
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                    octave: 5,
                }
            }
        ],
        2: [
            {
                romanNumeral: 'I',
                voicingConfig: {
                    topVoicesInversion: _utility_music_chords__WEBPACK_IMPORTED_MODULE_1__.TriadInversion.Octave,
                }
            }
        ],
    }
};
class BaseRomanAnalysisChordProgressionExercise extends _BaseTonalChordProgressionExercise__WEBPACK_IMPORTED_MODULE_0__.BaseTonalChordProgressionExercise {
    _getChordProgressionInC() {
        const chordProgressionQuestion = this._getChordProgressionInRomanNumerals();
        const question = {
            segments: chordProgressionQuestion.chordProgressionInRomanAnalysis.map((romanNumeral) => ({
                chord: romanNumeralToChordInC[romanNumeral],
                answer: romanNumeral,
            })),
        };
        if (question.segments.length === 1 && this._settings.playAfterCorrectAnswer) {
            question.afterCorrectAnswer = ({ firstChordInversion, questionSegments }) => {
                // calculate resolution
                const firstChordRomanNumeral = question.segments[0].answer;
                const resolution = [
                    {
                        romanNumeral: firstChordRomanNumeral,
                        chordVoicing: question.segments[0].chord.getVoicing({
                            topVoicesInversion: firstChordInversion,
                            withBass: this._settings.includeBass,
                        }),
                    },
                    ...romanNumeralToResolution[firstChordRomanNumeral][firstChordInversion].map(chord => ({
                        romanNumeral: chord.romanNumeral,
                        chordVoicing: romanNumeralToChordInC[chord.romanNumeral].getVoicing(Object.assign(Object.assign({}, chord.voicingConfig), { withBass: this._settings.includeBass })),
                    })),
                ];
                const differenceInOctavesToNormalize = lodash__WEBPACK_IMPORTED_MODULE_2__.round(((0,_utility__WEBPACK_IMPORTED_MODULE_3__.toNoteNumber)((0,_utility__WEBPACK_IMPORTED_MODULE_3__.toArray)((0,_utility__WEBPACK_IMPORTED_MODULE_3__.toSteadyPart)(questionSegments[0].partToPlay)[0].notes)[0]) - (0,_utility__WEBPACK_IMPORTED_MODULE_3__.toNoteNumber)(resolution[0].chordVoicing[0])) / _utility__WEBPACK_IMPORTED_MODULE_3__.Interval.Octave);
                return resolution.map(({ romanNumeral, chordVoicing, }, index) => ({
                    answerToHighlight: romanNumeral,
                    partToPlay: [{
                            notes: chordVoicing.map(note => (0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_4__.transpose)(note, differenceInOctavesToNormalize * _utility__WEBPACK_IMPORTED_MODULE_3__.Interval.Octave)),
                            duration: index === resolution.length - 1 ? '2n' : '4n',
                            velocity: 0.3,
                        }],
                }));
            };
        }
        return question;
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { playAfterCorrectAnswer: false });
    }
    _getAllAnswersList() {
        return {
            rows: [
                [
                    'I',
                    'ii',
                    'iii',
                    'IV',
                    'V',
                    'vi',
                    'viiᵒ',
                ]
            ]
        };
    }
}


/***/ }),

/***/ 72891:
/*!*********************************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/BaseTonalChordProgressionExercise.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTonalChordProgressionExercise": () => (/* binding */ BaseTonalChordProgressionExercise)
/* harmony export */ });
/* harmony import */ var _BaseTonalExercise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseTonalExercise */ 46167);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/ts-utility */ 40352);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utility/music/chords */ 72491);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _utility_music_transpose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utility/music/transpose */ 20585);
/* harmony import */ var _utility_music_intervals_Interval__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utility/music/intervals/Interval */ 88591);







class BaseTonalChordProgressionExercise extends _BaseTonalExercise__WEBPACK_IMPORTED_MODULE_0__.BaseTonalExercise {
    constructor() {
        super(...arguments);
        this._settings = Object.assign(Object.assign({}, this._settings), { voiceLeading: 'CORRECT', includedPositions: [0, 1, 2], includeBass: true });
        this._range = new _utility__WEBPACK_IMPORTED_MODULE_4__.NotesRange('G3', 'E5');
    }
    getQuestionInC() {
        const chordProgression = this._getChordProgressionInC();
        const firstChordInversion = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(this._settings.includedPositions);
        const voiceChordProgression = (chordOrChordSymbolList) => {
            if (this._settings.voiceLeading === 'CORRECT') {
                return (0,_utility_music_chords__WEBPACK_IMPORTED_MODULE_3__.voiceChordProgressionWithVoiceLeading)(chordOrChordSymbolList, firstChordInversion, {
                    withBass: this._settings.includeBass,
                });
            }
            const getAllVoicingsInRange = (chord, params) => {
                const voicing = chord.getVoicing(params);
                const bassNotes = [];
                if (params.withBass) {
                    bassNotes.push(voicing.shift());
                    bassNotes.push(voicing.shift());
                }
                let lowestVoicing = voicing;
                while (this._range.isInRange((0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_5__.transpose)(lowestVoicing, -_utility_music_intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.Octave))) {
                    lowestVoicing = (0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_5__.transpose)(lowestVoicing, -_utility_music_intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.Octave);
                }
                const possibleVoicingList = [lowestVoicing];
                while (this._range.isInRange((0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_5__.transpose)(lodash__WEBPACK_IMPORTED_MODULE_2__.last(possibleVoicingList), +_utility_music_intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.Octave))) {
                    possibleVoicingList.push((0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_5__.transpose)(lodash__WEBPACK_IMPORTED_MODULE_2__.last(possibleVoicingList), +_utility_music_intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.Octave));
                }
                return possibleVoicingList.map(possibleVoicing => [
                    ...bassNotes,
                    ...possibleVoicing,
                ]);
            };
            const voicingList = [(0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(getAllVoicingsInRange(chordProgression.segments[0].chord, {
                    topVoicesInversion: firstChordInversion,
                    withBass: this._settings.includeBass,
                }))];
            for (let i = 1; voicingList.length < chordProgression.segments.length; i++) {
                const lastVoicing = voicingList[i - 1];
                const possibleNextVoicingList = getAllVoicingsInRange(chordProgression.segments[i].chord, {
                    topVoicesInversion: (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(this._settings.includedPositions),
                    withBass: this._settings.includeBass,
                });
                const validNextVoicingList = possibleNextVoicingList.filter(possibleNextVoicing => {
                    const lastVoicingHighestNote = lodash__WEBPACK_IMPORTED_MODULE_2__.last(lastVoicing);
                    const nextVoicingHighestNote = lodash__WEBPACK_IMPORTED_MODULE_2__.last(possibleNextVoicing);
                    return (0,_utility__WEBPACK_IMPORTED_MODULE_4__.getInterval)(lastVoicingHighestNote, nextVoicingHighestNote) <= _utility_music_intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.PerfectFifth;
                });
                voicingList.push((0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.randomFromList)(lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty(validNextVoicingList) ? possibleNextVoicingList : validNextVoicingList));
            }
            return voicingList;
        };
        const question = {
            segments: voiceChordProgression(lodash__WEBPACK_IMPORTED_MODULE_2__.map(chordProgression.segments, 'chord'))
                .map((voicing, index) => {
                return {
                    rightAnswer: chordProgression.segments[index].answer,
                    partToPlay: [{
                            notes: voicing,
                            velocity: 0.3,
                            duration: '2n',
                        }],
                };
            }),
        };
        if (chordProgression.afterCorrectAnswer) {
            question.afterCorrectAnswer = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.toGetter)(chordProgression.afterCorrectAnswer)({
                firstChordInversion: firstChordInversion,
                questionSegments: question.segments,
            });
        }
        return question;
    }
    _getSettingsDescriptor() {
        return [
            ...super._getSettingsDescriptor(),
            {
                key: 'voiceLeading',
                descriptor: {
                    controlType: 'SELECT',
                    label: 'Voice Leading',
                    options: [
                        {
                            label: 'Random',
                            value: 'RANDOM',
                        },
                        {
                            label: 'Smooth',
                            value: 'CORRECT',
                        }
                    ],
                },
            },
            {
                key: 'includeBass',
                descriptor: {
                    controlType: 'CHECKBOX',
                    label: 'Include Bass',
                }
            },
            {
                key: 'includedPositions',
                descriptor: {
                    controlType: 'LIST_SELECT',
                    label: 'Included Positions (top voices)',
                    allOptions: [
                        {
                            value: 0,
                            label: 'Root Position',
                        },
                        {
                            value: 1,
                            label: '1st Inversion'
                        },
                        {
                            value: 2,
                            label: '2nd Inversion',
                        }
                    ],
                },
            },
        ];
    }
}


/***/ }),

/***/ 46167:
/*!*****************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/BaseTonalExercise.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTonalExercise": () => (/* binding */ BaseTonalExercise)
/* harmony export */ });
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _utility_music_transpose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utility/music/transpose */ 20585);
/* harmony import */ var _utility_music_keys_getDistanceOfKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utility/music/keys/getDistanceOfKeys */ 75740);
/* harmony import */ var _utility_music_chords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utility/music/chords */ 72491);
/* harmony import */ var _BaseCommonSettingsExercise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BaseCommonSettingsExercise */ 11007);





const cadenceTypeToCadence = {
    'I IV V I': _utility_music_chords__WEBPACK_IMPORTED_MODULE_3__.IV_V_I_CADENCE_IN_C,
    'i iv V i': _utility_music_chords__WEBPACK_IMPORTED_MODULE_3__.iv_V_i_CADENCE_IN_C,
};
class BaseTonalExercise extends _BaseCommonSettingsExercise__WEBPACK_IMPORTED_MODULE_4__.BaseCommonSettingsExercise {
    constructor() {
        super(...arguments);
        this.key = (0,_utility__WEBPACK_IMPORTED_MODULE_0__.randomFromList)(['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']);
    }
    getQuestion() {
        var _a;
        const randomQuestionInC = this.getQuestionInC();
        const selectedCadence = cadenceTypeToCadence[this._settings.cadenceType];
        return {
            segments: randomQuestionInC.segments.map(segment => ({
                rightAnswer: segment.rightAnswer,
                partToPlay: (0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_1__.transpose)(segment.partToPlay, (0,_utility_music_keys_getDistanceOfKeys__WEBPACK_IMPORTED_MODULE_2__.getDistanceOfKeys)(this.key, 'C')),
            })),
            cadence: (0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_1__.transpose)(selectedCadence, (0,_utility_music_keys_getDistanceOfKeys__WEBPACK_IMPORTED_MODULE_2__.getDistanceOfKeys)(this.key, 'C')),
            afterCorrectAnswer: (_a = randomQuestionInC.afterCorrectAnswer) === null || _a === void 0 ? void 0 : _a.map(afterCorrectAnswerSegment => ({
                answerToHighlight: afterCorrectAnswerSegment.answerToHighlight,
                partToPlay: (0,_utility_music_transpose__WEBPACK_IMPORTED_MODULE_1__.transpose)(afterCorrectAnswerSegment.partToPlay, (0,_utility_music_keys_getDistanceOfKeys__WEBPACK_IMPORTED_MODULE_2__.getDistanceOfKeys)(this.key, 'C')),
            }))
        };
    }
    _getSettingsDescriptor() {
        return [
            {
                key: 'cadenceType',
                descriptor: {
                    controlType: 'SELECT',
                    label: 'Cadence Type',
                    options: [
                        {
                            value: 'I IV V I',
                            label: 'I IV V I (Major)',
                        },
                        {
                            value: 'i iv V i',
                            label: 'i iv V i (Minor)',
                        },
                    ]
                }
            },
            ...super._getSettingsDescriptor(),
        ];
    }
    _getDefaultSettings() {
        return Object.assign(Object.assign({}, super._getDefaultSettings()), { cadenceType: 'I IV V I' });
    }
}


/***/ }),

/***/ 58548:
/*!***********************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/NumberOfSegmentsSetting.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "numberOfSegmentsControlDescriptorList": () => (/* binding */ numberOfSegmentsControlDescriptorList)
/* harmony export */ });
const numberOfSegmentsControlDescriptorList = (name) => ([
    {
        key: 'numberOfSegments',
        descriptor: {
            controlType: 'SLIDER',
            label: `Number of ${name}`,
            min: 1,
            max: 8,
            step: 1,
        },
    }
]);


/***/ }),

/***/ 69797:
/*!*****************************************************************************!*\
  !*** ./src/app/exercise/exercises/utility/PlayAfterCorrectAnswerSetting.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playAfterCorrectAnswerControlDescriptorList": () => (/* binding */ playAfterCorrectAnswerControlDescriptorList)
/* harmony export */ });
const playAfterCorrectAnswerControlDescriptorList = (param) => ([
    {
        key: 'playAfterCorrectAnswer',
        show: (param === null || param === void 0 ? void 0 : param.show) || undefined,
        descriptor: {
            controlType: 'CHECKBOX',
            label: `Play Resolution`,
        },
    }
]);


/***/ }),

/***/ 70174:
/*!****************************************************************!*\
  !*** ./src/app/exercise/services/exercise/exercise.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseService": () => (/* binding */ ExerciseService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _exercises_IntervalExercise_IntervalExercise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../exercises/IntervalExercise/IntervalExercise */ 52897);
/* harmony import */ var _exercises_ChordInKeyExercise_ChordsInKeyExercise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../exercises/ChordInKeyExercise/ChordsInKeyExercise */ 92515);
/* harmony import */ var _exercises_NotesInKeyExercise_NotesInKeyExercise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../exercises/NotesInKeyExercise/NotesInKeyExercise */ 67131);
/* harmony import */ var _exercises_ChordTypeInKeyExercise_ChordTypeInKeyExercise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../exercises/ChordTypeInKeyExercise/ChordTypeInKeyExercise */ 35539);
/* harmony import */ var _exercises_TriadInversionExercise_TriadInversionExercise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../exercises/TriadInversionExercise/TriadInversionExercise */ 27755);
/* harmony import */ var _exercises_CommonChordProgressionExercise_CommonChordProgressionsExercise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../exercises/CommonChordProgressionExercise/CommonChordProgressionsExercise */ 1264);
/* harmony import */ var _exercises_ChordArpeggioExercise_ChordArpeggioExercise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../exercises/ChordArpeggioExercise/ChordArpeggioExercise */ 28576);
var ExerciseService_1;










let ExerciseService = ExerciseService_1 = class ExerciseService {
    constructor() {
        this._exerciseIdToExercise = lodash__WEBPACK_IMPORTED_MODULE_0__.keyBy(ExerciseService_1._exerciseList, 'id');
    }
    getExercise(id) {
        return this._exerciseIdToExercise[id];
    }
    getExerciseList() {
        return ExerciseService_1._exerciseList;
    }
};
ExerciseService._exerciseList = [
    new _exercises_NotesInKeyExercise_NotesInKeyExercise__WEBPACK_IMPORTED_MODULE_3__.NotesInKeyExercise(),
    new _exercises_ChordInKeyExercise_ChordsInKeyExercise__WEBPACK_IMPORTED_MODULE_2__.ChordsInKeyExercise(),
    new _exercises_CommonChordProgressionExercise_CommonChordProgressionsExercise__WEBPACK_IMPORTED_MODULE_6__.CommonChordProgressionsExercise(),
    new _exercises_ChordTypeInKeyExercise_ChordTypeInKeyExercise__WEBPACK_IMPORTED_MODULE_4__.ChordTypeInKeyExercise(),
    new _exercises_TriadInversionExercise_TriadInversionExercise__WEBPACK_IMPORTED_MODULE_5__.TriadInversionExercise(),
    new _exercises_ChordArpeggioExercise_ChordArpeggioExercise__WEBPACK_IMPORTED_MODULE_7__.ChordArpeggioExercise(),
    new _exercises_IntervalExercise_IntervalExercise__WEBPACK_IMPORTED_MODULE_1__.IntervalExercise(),
];
ExerciseService.ngComponents = ExerciseService_1._exerciseList
    .map(exercise => exercise.explanation)
    .filter((explanation) => !!explanation && typeof explanation != 'string');
ExerciseService.ctorParameters = () => [];
ExerciseService = ExerciseService_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injectable)({
        providedIn: 'root'
    })
], ExerciseService);



/***/ }),

/***/ 45412:
/*!**************************************************************!*\
  !*** ./src/app/exercise/utility/music/chords/Chord/Chord.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TriadInversion": () => (/* binding */ TriadInversion),
/* harmony export */   "Chord": () => (/* binding */ Chord)
/* harmony export */ });
/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../transpose */ 20585);
/* harmony import */ var _notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../notes/noteTypeToNote */ 57875);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notes_getNoteOctave__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../notes/getNoteOctave */ 57657);
/* harmony import */ var _intervals_Interval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../intervals/Interval */ 88591);





var TriadInversion;
(function (TriadInversion) {
    TriadInversion[TriadInversion["Fifth"] = 0] = "Fifth";
    TriadInversion[TriadInversion["Octave"] = 1] = "Octave";
    TriadInversion[TriadInversion["Third"] = 2] = "Third";
})(TriadInversion || (TriadInversion = {}));
class Chord {
    constructor(symbol) {
        this.symbol = symbol;
        this.root = this._getChordRoot();
        this.type = this._getChordType();
        this.intervals = this._getChordIntervals();
        this.noteTypes = this._getNoteTypes();
    }
    _getChordRoot() {
        var _a;
        return (_a = this.symbol.match(/^[A-G](?:#|b|)/)) === null || _a === void 0 ? void 0 : _a[0];
    }
    _getChordType() {
        return this.symbol.includes('dim') ? 'dim' :
            this.symbol.includes('m') ? 'm' : 'M';
    }
    _getChordIntervals() {
        const intervals = [_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.Prima];
        switch (this.type) {
            case 'm':
            case 'dim':
                intervals.push(_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.MinorThird);
                break;
            case 'M':
                intervals.push(_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.MajorThird);
                break;
        }
        switch (this.type) {
            case 'm':
            case 'M':
                intervals.push(_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.PerfectFifth);
                break;
            case 'dim':
                intervals.push(_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.DiminishedFifth);
        }
        return intervals;
    }
    _getNoteTypes() {
        return this.intervals.map(interval => (0,_transpose__WEBPACK_IMPORTED_MODULE_0__.transpose)(this.root, interval));
    }
    getVoicing({ topVoicesInversion, withBass = true, octave = 4, }) {
        if (topVoicesInversion - 1 > this.noteTypes.length) {
            throw new Error(`Invalid inversion ${topVoicesInversion} from chord with notes ${this.noteTypes}`);
        }
        // first build the chord without inversions
        const rootNote = (0,_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_1__.noteTypeToNote)(this.root, 1);
        let chordVoicing = this.intervals.map(interval => (0,_transpose__WEBPACK_IMPORTED_MODULE_0__.transpose)(rootNote, interval));
        while (topVoicesInversion) {
            const lowestNote = chordVoicing.shift();
            chordVoicing.push((0,_transpose__WEBPACK_IMPORTED_MODULE_0__.transpose)(lowestNote, _intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.Octave));
            topVoicesInversion--;
        }
        //normalize to the right octave
        const highestVoice = lodash__WEBPACK_IMPORTED_MODULE_2__.last(chordVoicing);
        const highestVoiceOctave = (0,_notes_getNoteOctave__WEBPACK_IMPORTED_MODULE_3__.getNoteOctave)(highestVoice);
        chordVoicing = (0,_transpose__WEBPACK_IMPORTED_MODULE_0__.transpose)(chordVoicing, (octave - highestVoiceOctave) * _intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.Octave);
        if (withBass) {
            return [
                (0,_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_1__.noteTypeToNote)(this.root, 2),
                (0,_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_1__.noteTypeToNote)(this.root, 3),
                ...chordVoicing,
            ];
        }
        return chordVoicing;
    }
}


/***/ }),

/***/ 85299:
/*!********************************************************************!*\
  !*** ./src/app/exercise/utility/music/chords/chordProgressions.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IV_V_I_CADENCE_IN_C": () => (/* binding */ IV_V_I_CADENCE_IN_C),
/* harmony export */   "iv_V_i_CADENCE_IN_C": () => (/* binding */ iv_V_i_CADENCE_IN_C)
/* harmony export */ });
/* harmony import */ var _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chord/Chord */ 45412);

const IV_V_I_CADENCE_IN_C = [
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('C').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Fifth }),
        velocity: 0.3,
    },
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('F').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Third }),
        velocity: 0.3,
    },
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('G').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Third }),
        velocity: 0.3,
    },
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('C').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Octave, octave: 5 }),
        duration: '2n',
        velocity: 0.3,
    }
];
const iv_V_i_CADENCE_IN_C = [
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('Cm').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Fifth }),
        velocity: 0.3,
    },
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('Fm').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Third }),
        velocity: 0.3,
    },
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('G').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Third }),
        velocity: 0.3,
    },
    {
        notes: new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord('Cm').getVoicing({ topVoicesInversion: _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.TriadInversion.Octave, octave: 5 }),
        duration: '2n',
        velocity: 0.3,
    }
];


/***/ }),

/***/ 72491:
/*!********************************************************!*\
  !*** ./src/app/exercise/utility/music/chords/index.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "voiceChordProgressionWithVoiceLeading": () => (/* reexport safe */ _voiceChordProgressionWithVoiceLeading__WEBPACK_IMPORTED_MODULE_0__.voiceChordProgressionWithVoiceLeading),
/* harmony export */   "Chord": () => (/* reexport safe */ _Chord_Chord__WEBPACK_IMPORTED_MODULE_1__.Chord),
/* harmony export */   "TriadInversion": () => (/* reexport safe */ _Chord_Chord__WEBPACK_IMPORTED_MODULE_1__.TriadInversion),
/* harmony export */   "IV_V_I_CADENCE_IN_C": () => (/* reexport safe */ _chordProgressions__WEBPACK_IMPORTED_MODULE_2__.IV_V_I_CADENCE_IN_C),
/* harmony export */   "iv_V_i_CADENCE_IN_C": () => (/* reexport safe */ _chordProgressions__WEBPACK_IMPORTED_MODULE_2__.iv_V_i_CADENCE_IN_C)
/* harmony export */ });
/* harmony import */ var _voiceChordProgressionWithVoiceLeading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./voiceChordProgressionWithVoiceLeading */ 72030);
/* harmony import */ var _Chord_Chord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chord/Chord */ 45412);
/* harmony import */ var _chordProgressions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chordProgressions */ 85299);





/***/ }),

/***/ 72030:
/*!****************************************************************************************!*\
  !*** ./src/app/exercise/utility/music/chords/voiceChordProgressionWithVoiceLeading.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "voiceChordProgressionWithVoiceLeading": () => (/* binding */ voiceChordProgressionWithVoiceLeading)
/* harmony export */ });
/* harmony import */ var _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chord/Chord */ 45412);
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../notes/toNoteName */ 50506);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../notes/noteTypeToNote */ 57875);
/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transpose */ 20585);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/ts-utility */ 40352);
/* harmony import */ var _intervals_Interval__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../intervals/Interval */ 88591);







const MAX_AVG_VOICE_MOVEMENT = 8 / 3;
function voiceNextChord(currentChordVoicing, nextChord) {
    const highestVoice = lodash__WEBPACK_IMPORTED_MODULE_2__.last(currentChordVoicing);
    const voicingOptionsForNextChord = [];
    for (let i = 0; i < nextChord.noteTypes.length; i++) {
        let possibleVoicing = nextChord.getVoicing({
            topVoicesInversion: i,
            withBass: false,
        });
        // normalized for preferred octave, i.e. when the the soprano voice is the closest
        const highestNoteOfPossibleVoicing = lodash__WEBPACK_IMPORTED_MODULE_2__.last(possibleVoicing);
        possibleVoicing = (0,_transpose__WEBPACK_IMPORTED_MODULE_4__.transpose)(possibleVoicing, lodash__WEBPACK_IMPORTED_MODULE_2__.round(((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)(highestVoice) - (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)(highestNoteOfPossibleVoicing)) / _intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.Octave) * _intervals_Interval__WEBPACK_IMPORTED_MODULE_6__.Interval.Octave);
        voicingOptionsForNextChord.push(possibleVoicing);
    }
    // filter valid voicing (that has small movements in voices)
    const validVoicingOptions = voicingOptionsForNextChord.filter((voicingOption) => {
        if (voicingOption.length !== currentChordVoicing.length) {
            throw new Error(`voicing of different length not supported`); // (for now)
        }
        const rank = lodash__WEBPACK_IMPORTED_MODULE_2__.sum(voicingOption.map((voice, index) => {
            return Math.abs((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)(voice) - (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)(currentChordVoicing[index]));
        }));
        return (rank / voicingOption.length <= MAX_AVG_VOICE_MOVEMENT);
    });
    return (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_5__.randomFromList)(validVoicingOptions);
}
function voiceChordProgressionWithVoiceLeading(chordOrChordSymbolList, startingTopVoicesInversion = 0, options = { withBass: true }) {
    const chordList = chordOrChordSymbolList.map((chordOrChordSymbol) => {
        if (chordOrChordSymbol instanceof _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord) {
            return chordOrChordSymbol;
        }
        return new _Chord_Chord__WEBPACK_IMPORTED_MODULE_0__.Chord(chordOrChordSymbol);
    });
    const chordVoicingWithoutBass = [chordList[0].getVoicing({
            topVoicesInversion: startingTopVoicesInversion,
            withBass: false,
        })];
    for (let i = 1; i < chordList.length; i++) {
        const nextChordVoicing = voiceNextChord(chordVoicingWithoutBass[i - 1], chordList[i]);
        if (!nextChordVoicing) {
            throw new Error(`Voicing is undefined`);
        }
        chordVoicingWithoutBass.push(nextChordVoicing);
    }
    // adding bass notes
    return chordVoicingWithoutBass.map((chordVoicing, index) => {
        const rootNote = chordList[index].root;
        return [
            ...(options.withBass ? [
                (0,_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_3__.noteTypeToNote)(rootNote, 2),
                (0,_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_3__.noteTypeToNote)(rootNote, 3),
            ] : []),
            ...chordVoicing,
        ];
    });
}


/***/ }),

/***/ 57657:
/*!***************************************************************!*\
  !*** ./src/app/exercise/utility/music/notes/getNoteOctave.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNoteOctave": () => (/* binding */ getNoteOctave)
/* harmony export */ });
function getNoteOctave(note) {
    return +note.match(/\d+/g)[0];
}


/***/ }),

/***/ 92685:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordInKeyExercise/chord-in-key-explanation/chord-in-key-explanation.component.html?ngResource ***!
  \***********************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\r\n  In this exercise you will be given a series of chords (cadence) to establish a tonal center.\r\n  Then a chord would be played, and you will be asked to pick the roman analysis (degree) of the chord in the context of the key.\r\n</p>\r\n<app-info-panel>\r\n  <b>Tip!</b> Every chord has its own sensation of tension/release.\r\n  The 'I' chord feels most at rest, while the 'V' has tension - it \"wants\" to move.\r\n</app-info-panel>\r\n<app-collapsible>\r\n  <h2>Triads & Roman Numerals</h2>\r\n  <p>\r\n    Triadic chords are chords built from 3 notes using thirds.\r\n  </p>\r\n  <p>\r\n    For example, in the key of C major, we can form this chord:\r\n  </p>\r\n  <app-info-panel>\r\n    <b>C</b> D <b>E</b> F <b>G</b> A B\r\n  </app-info-panel>\r\n  <p>\r\n    Because it is built starting from the first degree (Tonic note) <b>it is called the 'I' (one) chord</b>.\r\n    The 'I' chord is most \"at rest\", and holds no tension.\r\n  </p>\r\n  <ion-button\r\n    [color]=\"'light'\"\r\n    [playOnClick]=\"cadenceAndIChord\"\r\n  >\r\n    Cadence + 'I' chord\r\n  </ion-button>\r\n  <p>\r\n    We can also build a triad from the 5th degree to form a 'V' (five) chord.\r\n    Notice how this chord holds tension, and wants to resolve to the tonic.\r\n  </p>\r\n  <ion-button\r\n    [color]=\"'light'\"\r\n    [playOnClick]=\"cadenceAndVChord\"\r\n  >\r\n    Cadence + 'V' chord\r\n  </ion-button>\r\n  <p>\r\n    Because the chord sensation is dependant on the key,\r\n    we use Roman numerals to indicate chords numbers in an arbitrary key.\r\n  </p>\r\n  <p>\r\n    Note that we use lower-case to indicate the minor chords (ii, iii and vi), and ᵒ to indicate diminished chords (viiᵒ)\r\n  </p>\r\n</app-collapsible>\r\n";

/***/ }),

/***/ 77824:
/*!*************************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/ChordTypeInKeyExercise/chord-type-in-key-explanation/chord-type-in-key-explanation.component.html?ngResource ***!
  \*************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\r\n  In this exercise you will be required to identify the type of a chord being played. Here are the possible types:\r\n</p>\r\n<ul>\r\n  <li><b>M - Major.</b> Example: C-E-G</li>\r\n  <li><b>m - Minor.</b> Example: A-C-E</li>\r\n</ul>\r\n<app-info-panel>\r\n  <b>Tip! Major chords tend to sound \"brighter\" and minor chords tend to sound \"darker\".</b>\r\n  But beware - the feeling of the chord also depends on context.\r\n</app-info-panel>\r\n<p>\r\n  All chords in this exercise will be <b>from the same key</b> -\r\n  This to simulate a real music situation where chords are not being picked at random, but usually belong to the same key.\r\n</p>\r\n";

/***/ }),

/***/ 31954:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/CommonChordProgressionExercise/common-chord-progressions-explanation/common-chord-progressions-explanation.component.html?ngResource ***!
  \*************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<app-info-panel>\r\n  If you haven't already - check out the <a routerLink=\"./chordInKey\">Chord in Key</a> exercise for a basic introduction to chord progressions and Roman Analysis.\r\n</app-info-panel>\r\n\r\n<p>\r\n  In this exercise, you can choose from a set of predefined progressions to practice.\r\n</p>\r\n<p>\r\n  The available progressions are one of the most popular chord progressions in popular music. If you think there is an important progression we missed, feel free to\r\n  <a href=\"https://github.com/ShacharHarshuv/open-ear/issues\">open an issue in Github</a> or <a href=\"https://github.com/ShacharHarshuv/open-ear#readme\">create a pull request</a>\r\n</p>\r\n\r\n<app-info-panel>\r\n  <b>Tip!</b> Try to think of songs you know that use each progression.\r\n</app-info-panel>\r\n";

/***/ }),

/***/ 46669:
/*!*******************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/IntervalExercise/interval-exercise-explanation/interval-exercise-explanation.component.html?ngResource ***!
  \*******************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\r\n  In the following exercise <b>two notes will be played</b>, and you will be required\r\n  to specify the interval between them.\r\n</p>\r\n<app-info-panel>\r\n  <b>Tip!</b> Try to recall songs / melodies you know that starts which each interval.\r\n</app-info-panel>\r\n<p>\r\n  If you're just starting out, it's recommended to limit to amount of possible\r\n  intervals. That can be done in the exercise settings (<ion-icon name=\"settings-outline\"></ion-icon>)\r\n</p>\r\n\r\n<h2>List of Intervals: </h2>\r\n\r\n<p>(Click to play)</p>\r\n\r\n<ion-list>\r\n  <ng-container *ngFor=\"let interval of intervalDescriptorList\">\r\n    <ion-item button [playOnClick]=\"interval.toPlay\">\r\n      {{interval.name}}\r\n    </ion-item>\r\n  </ng-container>\r\n</ion-list>\r\n";

/***/ }),

/***/ 98705:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/NotesInKeyExercise/notes-in-key-explanation/notes-in-key-explanation.component.html?ngResource ***!
  \***********************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\r\n  In this exercise you will be given a series of chords (cadence) to establish a tonal center.\r\n  Then a note (or a series of notes) will be played and you will be asked to find the scale degree of the note.\r\n</p>\r\n\r\n<app-info-panel>\r\n  <b>Tip!</b> If you're just starting out, it's better to practice on just a few scale degrees. Starting from Do, Re\r\n  and Mi is recommended.\r\n</app-info-panel>\r\n<app-collapsible>\r\n  <h2>Scales and scale degrees</h2>\r\n  <p>\r\n    The major scale consist of 7 notes that are built from the following intervals:\r\n  </p>\r\n  <app-info-panel>\r\n    tone - tone - semitone - tone - tone - tone - semitone\r\n  </app-info-panel>\r\n  <p>\r\n    For example, the C major scale, consists of the following notes:\r\n  </p>\r\n  <app-info-panel>\r\n    C D E F G A B\r\n  </app-info-panel>\r\n  <p>\r\n    The first note of the scale - also called the tonic - is the \"home\" note.\r\n    The note that will feel most \"resolves\" and at \"rest\".\r\n  </p>\r\n  <p>\r\n    Any other note will have a specific \"tension\" or \"sensation\" in relation to the tonic note.\r\n    It might feel as if the note \"wants\" to resolve to the tonic note.\r\n  </p>\r\n  <p>\r\n    In this example a group of chords will be played to let your mind feel C as the \"root note\".\r\n    Then the note D will be played, listen to its sense of tension, like it wants to resolve down to C.\r\n  </p>\r\n  <ion-button\r\n    [color]=\"'light'\"\r\n    [playOnClick]=\"resolutionOfReInC\"\r\n  >\r\n    Play\r\n  </ion-button>\r\n  <p>\r\n    In the key of D however, D is the tonic, so it assumes a sensation of rest.\r\n    To avoid confusion between different keys, <b>we use solfege syllables.</b>\r\n  </p>\r\n  <p>\r\n    Each syllable represents a different <b>degree</b> in the scale.\r\n  </p>\r\n  <ul>\r\n    <li><b>Do</b> - 1st Degree (C in C major)</li>\r\n    <li><b>Re</b> - 2nd Degree (D in C major)</li>\r\n    <li><b>Mi</b> - 3rd Degree (E in C major)</li>\r\n    <li><b>Fa</b> - 4th Degree (F in C major)</li>\r\n    <li><b>Sol</b> - 5th Degree (G in C major)</li>\r\n    <li><b>La</b> - 6th Degree (A in C major)</li>\r\n    <li><b>Ti</b> - 7th Degree (B in C major)</li>\r\n  </ul>\r\n  <p>\r\n    After getting a correct answer, the app will play a resolution of the note to the tonic,\r\n    to enforce your memory and sensation of tension and release.\r\n  </p>\r\n  <app-info-panel>\r\n    If you're finding it hard to accomplish, try sing the note and resolve it to the nearest tonic, either above or\r\n    below.\r\n  </app-info-panel>\r\n</app-collapsible>\r\n";

/***/ }),

/***/ 3337:
/*!*********************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercises/TriadInversionExercise/triad-inversion-explanation/triad-inversion-explanation.component.html?ngResource ***!
  \*********************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\r\n  In this exercise you will hear a triad in one of the three possible inversions,\r\n  and you will need to identify what inversion it is.\r\n</p>\r\n<p>\r\n  An inversion is the order of which the chord notes are played (from lowest to highest).\r\n</p>\r\n<p>\r\n  Here are the possible inversions:\r\n</p>\r\n<ul>\r\n  <li><b>Root position</b> (Example: C E G). Also called: 5th position</li>\r\n  <li><b>First inversion</b> (Example: E G C). Also called: Octave position</li>\r\n  <li><b>Second inversion</b> (Example: G C E). Also called: 3rd position</li>\r\n</ul>\r\n<app-info-panel>\r\n  If you're just starting out, check out the \"Arpeggiate Speed\" field in the settings.\r\n</app-info-panel>\r\n<!--Consider if this is needed or not-->\r\n<!--<p>\r\n  All chords in this exercise will be <b>from the same key</b> -\r\n  This to simulate a real music situation where chords are not being picked at random, but usually belong to the same key.\r\n</p>-->\r\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_exercise_services_exercise_exercise_service_ts.js.map