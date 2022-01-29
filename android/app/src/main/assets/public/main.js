(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 52816);



const routes = [
    {
        path: 'home',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_exercise_services_exercise_exercise_service_ts"), __webpack_require__.e("src_app_home_home_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./home/home.module */ 3467)).then(m => m.HomePageModule)
    },
    {
        path: 'about',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_about_about_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./about/about.module */ 46985)).then(m => m.AboutModule)
    },
    {
        path: 'message/:id',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_view-message_view-message_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./view-message/view-message.module */ 18164)).then(m => m.ViewMessagePageModule)
    },
    {
        path: 'exercise/:id',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_exercise_services_exercise_exercise_service_ts"), __webpack_require__.e("src_app_exercise_exercise_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./exercise/exercise.module */ 6464)).then(m => m.ExerciseModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 33383);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 77601);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _release_notes_release_notes_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./release-notes/release-notes-page.component */ 36392);
/* harmony import */ var _release_notes_release_notes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./release-notes/release-notes.service */ 59728);
/* harmony import */ var _shared_ts_utility_rxjs_toPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/ts-utility/rxjs/toPromise */ 85937);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);









let AppComponent = class AppComponent {
    constructor(_modalController, _releaseNotesService) {
        this._modalController = _modalController;
        this._releaseNotesService = _releaseNotesService;
        this.showReleaseNotes();
    }
    showReleaseNotes() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const releaseNotes = yield (0,_shared_ts_utility_rxjs_toPromise__WEBPACK_IMPORTED_MODULE_4__.toPromise)(this._releaseNotesService.relevantReleaseNotes$);
            if (lodash__WEBPACK_IMPORTED_MODULE_5__.isEmpty(releaseNotes)) {
                yield this._releaseNotesService.setReleaseNotesWereViewed();
                return;
            }
            const modal = yield this._modalController.create({
                component: _release_notes_release_notes_page_component__WEBPACK_IMPORTED_MODULE_2__.ReleaseNotesPage,
            });
            yield modal.present();
            yield modal.onDidDismiss();
            yield this._releaseNotesService.setReleaseNotesWereViewed();
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController },
    { type: _release_notes_release_notes_service__WEBPACK_IMPORTED_MODULE_3__.ReleaseNotesService }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-root',
        template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AppComponent);



/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/storage-angular */ 47566);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ 73598);
/* harmony import */ var _version_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version.service */ 28370);
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ 85209);
/* harmony import */ var _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/modal/modal.module */ 38975);
/* harmony import */ var _release_notes_release_notes_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./release-notes/release-notes.module */ 42431);













let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
        ],
        entryComponents: [],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicModule.forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
            _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_11__.IonicStorageModule.forRoot(),
            _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_4__.ModalModule,
            _release_notes_release_notes_module__WEBPACK_IMPORTED_MODULE_5__.ReleaseNotesModule,
        ],
        providers: [
            {
                provide: _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouteReuseStrategy,
                useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonicRouteStrategy,
            },
            _version_service__WEBPACK_IMPORTED_MODULE_2__.VersionService,
            _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_3__.AppVersion,
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
        exports: [],
    })
], AppModule);



/***/ }),

/***/ 62647:
/*!****************************************************************************!*\
  !*** ./src/app/exercise/utility/exercise-settings/ExerciseSettingsData.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 61652:
/*!******************************************************************************!*\
  !*** ./src/app/exercise/utility/exercise-settings/GlobalExerciseSettings.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 98979:
/*!*******************************************!*\
  !*** ./src/app/exercise/utility/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toSteadyPart": () => (/* reexport safe */ _music_toSteadyPart__WEBPACK_IMPORTED_MODULE_0__.toSteadyPart),
/* harmony export */   "toNoteName": () => (/* reexport safe */ _music_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteName),
/* harmony export */   "toNoteNumber": () => (/* reexport safe */ _music_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber),
/* harmony export */   "NotesRange": () => (/* reexport safe */ _music_NotesRange__WEBPACK_IMPORTED_MODULE_2__.NotesRange),
/* harmony export */   "Interval": () => (/* reexport safe */ _music_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval),
/* harmony export */   "getInterval": () => (/* reexport safe */ _music_intervals_getInterval__WEBPACK_IMPORTED_MODULE_5__.getInterval),
/* harmony export */   "BaseComponent": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.BaseComponent),
/* harmony export */   "BaseControlValueAccessorComponent": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.BaseControlValueAccessorComponent),
/* harmony export */   "BaseControlValueAccessorService": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.BaseControlValueAccessorService),
/* harmony export */   "BaseControlValueAccessorWithCustomControl": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.BaseControlValueAccessorWithCustomControl),
/* harmony export */   "BaseDestroyable": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.BaseDestroyable),
/* harmony export */   "LogAsyncReturnValue": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.LogAsyncReturnValue),
/* harmony export */   "LogReturnValue": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.LogReturnValue),
/* harmony export */   "isValueTruthy": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.isValueTruthy),
/* harmony export */   "publishReplayUntilAndConnect": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.publishReplayUntilAndConnect),
/* harmony export */   "randomFromList": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.randomFromList),
/* harmony export */   "timeoutAsPromise": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.timeoutAsPromise),
/* harmony export */   "toArray": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.toArray),
/* harmony export */   "toGetter": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.toGetter),
/* harmony export */   "toObservable": () => (/* reexport safe */ _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__.toObservable)
/* harmony export */ });
/* harmony import */ var _music_toSteadyPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./music/toSteadyPart */ 91467);
/* harmony import */ var _music_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music/notes/toNoteName */ 50506);
/* harmony import */ var _music_NotesRange__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./music/NotesRange */ 2763);
/* harmony import */ var _music_keys_Key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./music/keys/Key */ 55995);
/* harmony import */ var _music_intervals_Interval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./music/intervals/Interval */ 88591);
/* harmony import */ var _music_intervals_getInterval__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./music/intervals/getInterval */ 30346);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/ts-utility */ 40352);
/* harmony import */ var _exercise_settings_GlobalExerciseSettings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exercise-settings/GlobalExerciseSettings */ 61652);
/* harmony import */ var _exercise_settings_ExerciseSettingsData__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./exercise-settings/ExerciseSettingsData */ 62647);











/***/ }),

/***/ 2763:
/*!******************************************************!*\
  !*** ./src/app/exercise/utility/music/NotesRange.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotesRange": () => (/* binding */ NotesRange)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notes/toNoteName */ 50506);
/* harmony import */ var lodash_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-decorators */ 79874);
/* harmony import */ var lodash_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _keys_isInKey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys/isInKey */ 6318);
/* harmony import */ var _notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notes/toNoteTypeNumber */ 59553);
/* harmony import */ var _notes_getNoteType__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notes/getNoteType */ 8100);






class NotesRange {
    constructor(lowestNoteOrRange, highestNote) {
        // let lowestNote:
        if (typeof lowestNoteOrRange === 'object') {
            this.lowestNoteNumber = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(lowestNoteOrRange.lowestNote);
            this.highestNoteNumber = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(lowestNoteOrRange.highestNote);
        }
        else {
            this.lowestNoteNumber = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(lowestNoteOrRange);
            this.highestNoteNumber = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(highestNote);
        }
        this.rangeSizeInSemitones = this.highestNoteNumber - this.lowestNoteNumber;
        if (this.rangeSizeInSemitones < 0) {
            throw new Error(`Invalid note range ${this.lowestNoteName}-${this.highestNoteName}`);
        }
        this.lowestNoteName = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteName)(this.lowestNoteNumber);
        this.highestNoteName = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteName)(this.highestNoteNumber);
    }
    isInRange(noteOrNoteList) {
        if (Array.isArray(noteOrNoteList)) {
            return noteOrNoteList.every(this.isInRange.bind(this));
        }
        const noteNumber = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(noteOrNoteList);
        return noteNumber >= this.lowestNoteNumber && noteNumber <= this.highestNoteNumber;
    }
    /**
     * When choosing key then Major is assumed
     * */
    getAllNotes(keyOrScale) {
        const notes = [];
        for (let i = this.lowestNoteNumber; i <= this.highestNoteNumber; i++) {
            if (keyOrScale) {
                if (typeof keyOrScale === 'string' && !(0,_keys_isInKey__WEBPACK_IMPORTED_MODULE_2__.isInKey)(i, keyOrScale)) {
                    continue;
                }
                if (Array.isArray(keyOrScale) && !keyOrScale.map(_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__.toNoteTypeNumber).includes((0,_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__.toNoteTypeNumber)((0,_notes_getNoteType__WEBPACK_IMPORTED_MODULE_4__.getNoteType)((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteName)(i))))) {
                    continue;
                }
            }
            notes.push((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteName)(i));
        }
        return notes;
    }
}
(0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,lodash_decorators__WEBPACK_IMPORTED_MODULE_1__.Memoize)()
], NotesRange.prototype, "isInRange", null);
(0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,lodash_decorators__WEBPACK_IMPORTED_MODULE_1__.Memoize)()
], NotesRange.prototype, "getAllNotes", null);


/***/ }),

/***/ 88591:
/*!**************************************************************!*\
  !*** ./src/app/exercise/utility/music/intervals/Interval.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Interval": () => (/* binding */ Interval)
/* harmony export */ });
var Interval;
(function (Interval) {
    Interval[Interval["Prima"] = 0] = "Prima";
    Interval[Interval["MinorSecond"] = 1] = "MinorSecond";
    Interval[Interval["MajorSecond"] = 2] = "MajorSecond";
    Interval[Interval["MinorThird"] = 3] = "MinorThird";
    Interval[Interval["MajorThird"] = 4] = "MajorThird";
    Interval[Interval["PerfectFourth"] = 5] = "PerfectFourth";
    Interval[Interval["AugmentedForth"] = 6] = "AugmentedForth";
    Interval[Interval["DiminishedFifth"] = 6] = "DiminishedFifth";
    Interval[Interval["PerfectFifth"] = 7] = "PerfectFifth";
    Interval[Interval["MinorSixth"] = 8] = "MinorSixth";
    Interval[Interval["MajorSixth"] = 9] = "MajorSixth";
    Interval[Interval["MinorSeventh"] = 10] = "MinorSeventh";
    Interval[Interval["MajorSeventh"] = 11] = "MajorSeventh";
    Interval[Interval["Octave"] = 12] = "Octave";
})(Interval || (Interval = {}));


/***/ }),

/***/ 30346:
/*!*****************************************************************!*\
  !*** ./src/app/exercise/utility/music/intervals/getInterval.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getInterval": () => (/* binding */ getInterval)
/* harmony export */ });
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../notes/toNoteName */ 50506);

function getInterval(note1, note2) {
    return Math.abs((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(note1) - (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(note2));
}


/***/ }),

/***/ 55995:
/*!****************************************************!*\
  !*** ./src/app/exercise/utility/music/keys/Key.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 75740:
/*!******************************************************************!*\
  !*** ./src/app/exercise/utility/music/keys/getDistanceOfKeys.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDistanceOfKeys": () => (/* binding */ getDistanceOfKeys)
/* harmony export */ });
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../notes/toNoteName */ 50506);

function getDistanceOfKeys(to, from) {
    return ((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(to + '1') - (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(from + '1')) % 12;
}


/***/ }),

/***/ 6318:
/*!********************************************************!*\
  !*** ./src/app/exercise/utility/music/keys/isInKey.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInKey": () => (/* binding */ isInKey)
/* harmony export */ });
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../notes/toNoteName */ 50506);
/* harmony import */ var _transpose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transpose */ 20585);
/* harmony import */ var _getDistanceOfKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDistanceOfKeys */ 75740);



const CMajorFirstOctave = ['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1'];
function isInKey(note, key) {
    function transposeToFirstOctave(note) {
        return (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteName)(((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(note) - (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)('C1')) % 12 + (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)('C1'));
    }
    const noteTransposedToFirstOctave = transposeToFirstOctave(note);
    const distanceOfKeyFromC = (0,_getDistanceOfKeys__WEBPACK_IMPORTED_MODULE_2__.getDistanceOfKeys)(key, 'C');
    const scaleOfKey = (0,_transpose__WEBPACK_IMPORTED_MODULE_1__.transpose)(CMajorFirstOctave, distanceOfKeyFromC);
    const scaleOfKeyInFirstOctave = scaleOfKey.map(transposeToFirstOctave);
    return scaleOfKeyInFirstOctave.map(_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber).includes((0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(noteTransposedToFirstOctave));
}


/***/ }),

/***/ 25564:
/*!**********************************************************!*\
  !*** ./src/app/exercise/utility/music/notes/NoteType.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALL_NOTE_TYPES": () => (/* binding */ ALL_NOTE_TYPES)
/* harmony export */ });
const noteTypeMap = {
    'A#': true,
    'C#': true,
    'D#': true,
    'F#': true,
    'G#': true,
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    Ab: true,
    Bb: true,
    Db: true,
    Eb: true,
    Gb: true,
};
const ALL_NOTE_TYPES = Object.keys(noteTypeMap);


/***/ }),

/***/ 8100:
/*!*************************************************************!*\
  !*** ./src/app/exercise/utility/music/notes/getNoteType.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNoteType": () => (/* binding */ getNoteType)
/* harmony export */ });
function getNoteType(note) {
    return note.split('').filter(c => ['A', 'B', 'C', 'D', 'E', 'F', 'G', '#', 'b'].includes(c)).join('');
}


/***/ }),

/***/ 57875:
/*!****************************************************************!*\
  !*** ./src/app/exercise/utility/music/notes/noteTypeToNote.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noteTypeToNote": () => (/* binding */ noteTypeToNote)
/* harmony export */ });
function noteTypeToNote(noteType, octave) {
    return noteType + octave;
}


/***/ }),

/***/ 50506:
/*!************************************************************!*\
  !*** ./src/app/exercise/utility/music/notes/toNoteName.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toNoteName": () => (/* binding */ toNoteName),
/* harmony export */   "toNoteNumber": () => (/* binding */ toNoteNumber)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_ts_utility_toArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/ts-utility/toArray */ 71138);


const midiNoteNamesArray = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "A0", ["A#0", "Bb0"], "B0", "C1", ["C#1", "Db1"], "D1", ["D#1", "Eb1"], "E1", "F1", ["F#1", "Gb1"], "G1", ["G#1", "Ab1"], "A1", ["A#1", "Bb1"], "B1", "C2", ["C#2", "Db2"], "D2", ["D#2", "Eb2"], "E2", "F2", ["F#2", "Gb2"], "G2", ["G#2", "Ab2"], "A2", ["A#2", "Bb2"], "B2", "C3", ["C#3", "Db3"], "D3", ["D#3", "Eb3"], "E3", "F3", ["F#3", "Gb3"],
    "G3", ["G#3", "Ab3"], "A3", ["A#3", "Bb3"], "B3", "C4", ["C#4", "Db4"], "D4", ["D#4", "Eb4"], "E4", "F4", ["F#4", "Gb4"], "G4", ["G#4", "Ab4"], "A4", ["A#4", "Bb4"], "B4", "C5", ["C#5", "Db5"], "D5", ["D#5", "Eb5"], "E5", "F5", ["F#5", "Gb5"], "G5", ["G#5", "Ab5"], "A5", ["A#5", "Bb5"], "B5", "C6", ["C#6", "Db6"], "D6", ["D#6", "Eb6"], "E6", "F6", ["F#6", "Gb6"], "G6", ["G#6", "Ab6"], "A6", ["A#6", "Bb6"], "B6", "C7", ["C#7", "Db7"], "D7", ["D#7", "Eb7"], "E7", "F7", ["F#7", "Gb7"], "G7", ["G#7", "Ab7"], "A7", ["A#7", "Bb7"], "B7", "C8", ["C#8", "Db8"], "D8", ["D#8", "Eb8"], "E8", "F8", ["F#8", "Gb8"], "G8", ["G#8", "Ab8"], "A8", ["A#8", "Bb8"], "B8", "C9", ["C#9", "Db9"], "D9", ["D#9", "Eb9"], "E9", "F9", ["F#9", "Gb9"], "G9"];
const noteNameToNoteNumberMap = {};
lodash__WEBPACK_IMPORTED_MODULE_0__.forEach(midiNoteNamesArray, (noteNameList, noteNumber) => {
    if (!noteNameList) {
        return;
    }
    lodash__WEBPACK_IMPORTED_MODULE_0__.forEach((0,_shared_ts_utility_toArray__WEBPACK_IMPORTED_MODULE_1__.toArray)(noteNameList), noteName => {
        noteNameToNoteNumberMap[noteName] = noteNumber;
    });
});
function toNoteName(note) {
    if (typeof note === 'string') {
        return note;
    }
    const noteName = midiNoteNamesArray[note];
    if (!noteName) {
        throw new Error(`No note name for ${note}`);
    }
    return (0,_shared_ts_utility_toArray__WEBPACK_IMPORTED_MODULE_1__.toArray)(noteName)[0];
}
function toNoteNumber(note) {
    if (typeof note === 'number') {
        return note;
    }
    return noteNameToNoteNumberMap[note];
}


/***/ }),

/***/ 59553:
/*!******************************************************************!*\
  !*** ./src/app/exercise/utility/music/notes/toNoteTypeNumber.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toNoteTypeNumber": () => (/* binding */ toNoteTypeNumber),
/* harmony export */   "toNoteTypeName": () => (/* binding */ toNoteTypeName)
/* harmony export */ });
/* harmony import */ var _getNoteType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNoteType */ 8100);
/* harmony import */ var _toNoteName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toNoteName */ 50506);


function toNoteTypeNumber(noteType) {
    if (typeof noteType === 'number') {
        return noteType;
    }
    return (0,_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)(noteType + '1') - (0,_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)('C1');
}
function toNoteTypeName(noteTypeNumber) {
    if (typeof noteTypeNumber === 'string') {
        return noteTypeNumber;
    }
    return (0,_getNoteType__WEBPACK_IMPORTED_MODULE_0__.getNoteType)((0,_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteName)((0,_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteNumber)('C1') + noteTypeNumber));
}


/***/ }),

/***/ 91467:
/*!********************************************************!*\
  !*** ./src/app/exercise/utility/music/toSteadyPart.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toSteadyPart": () => (/* binding */ toSteadyPart)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notes/toNoteName */ 50506);
/* harmony import */ var _shared_ts_utility_toArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/ts-utility/toArray */ 71138);



/*
* If got NoteEvent for input it doesn't change it
* */
function toSteadyPart(noteList, noteDuration = '4n', velocity = 1) {
    let numberOfNotes = 0;
    return lodash__WEBPACK_IMPORTED_MODULE_0__.map((0,_shared_ts_utility_toArray__WEBPACK_IMPORTED_MODULE_2__.toArray)(noteList), (frequencyOrEvent) => {
        if (typeof frequencyOrEvent === 'object' && !Array.isArray(frequencyOrEvent)) {
            return frequencyOrEvent;
        }
        return {
            notes: (0,_shared_ts_utility_toArray__WEBPACK_IMPORTED_MODULE_2__.toArray)(frequencyOrEvent).map(_notes_toNoteName__WEBPACK_IMPORTED_MODULE_1__.toNoteName),
            time: {
                [noteDuration]: numberOfNotes++,
            },
            duration: noteDuration,
            velocity: velocity,
        };
    });
}


/***/ }),

/***/ 20585:
/*!*****************************************************!*\
  !*** ./src/app/exercise/utility/music/transpose.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transpose": () => (/* binding */ transpose)
/* harmony export */ });
/* harmony import */ var _notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notes/toNoteName */ 50506);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _notes_NoteType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notes/NoteType */ 25564);
/* harmony import */ var _notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notes/toNoteTypeNumber */ 59553);
/* harmony import */ var _intervals_Interval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./intervals/Interval */ 88591);





function transpose(partOrNotes, semitones) {
    if (!Array.isArray(partOrNotes)) {
        const note = partOrNotes;
        if (_notes_NoteType__WEBPACK_IMPORTED_MODULE_2__.ALL_NOTE_TYPES.includes(note)) {
            return (0,_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__.toNoteTypeName)(((0,_notes_toNoteTypeNumber__WEBPACK_IMPORTED_MODULE_3__.toNoteTypeNumber)(note) + semitones) % _intervals_Interval__WEBPACK_IMPORTED_MODULE_4__.Interval.Octave);
        }
        const newNoteNumber = (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteNumber)(note) + semitones;
        if (newNoteNumber > 127 || newNoteNumber < 21) {
            throw new Error(`Out of range. Cannot transpose ${partOrNotes} by ${semitones} semitones`);
        }
        return (0,_notes_toNoteName__WEBPACK_IMPORTED_MODULE_0__.toNoteName)(newNoteNumber);
    }
    if (lodash__WEBPACK_IMPORTED_MODULE_1__.isEmpty(partOrNotes)) {
        return [];
    }
    if (typeof partOrNotes[0] === 'string') {
        const noteList = partOrNotes;
        return lodash__WEBPACK_IMPORTED_MODULE_1__.map(noteList, (note) => transpose(note, semitones));
    }
    const noteEventList = partOrNotes;
    return lodash__WEBPACK_IMPORTED_MODULE_1__.map(noteEventList, (noteEvent) => (Object.assign(Object.assign({}, noteEvent), { notes: transpose(noteEvent.notes, semitones) })));
}


/***/ }),

/***/ 36392:
/*!***************************************************************!*\
  !*** ./src/app/release-notes/release-notes-page.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReleaseNotesPage": () => (/* binding */ ReleaseNotesPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _release_notes_page_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./release-notes-page.component.html?ngResource */ 69659);
/* harmony import */ var _release_notes_page_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./release-notes-page.component.scss?ngResource */ 17112);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _version_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../version.service */ 28370);
/* harmony import */ var _release_notes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./release-notes.service */ 59728);






let ReleaseNotesPage = class ReleaseNotesPage {
    constructor(versionService, releaseNotesService) {
        this.versionService = versionService;
        this.releaseNotesService = releaseNotesService;
    }
};
ReleaseNotesPage.ctorParameters = () => [
    { type: _version_service__WEBPACK_IMPORTED_MODULE_2__.VersionService },
    { type: _release_notes_service__WEBPACK_IMPORTED_MODULE_3__.ReleaseNotesService }
];
ReleaseNotesPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-release-notes',
        template: _release_notes_page_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_release_notes_page_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ReleaseNotesPage);



/***/ }),

/***/ 42431:
/*!*******************************************************!*\
  !*** ./src/app/release-notes/release-notes.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReleaseNotesModule": () => (/* binding */ ReleaseNotesModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _release_notes_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./release-notes-page.component */ 36392);
/* harmony import */ var _release_notes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./release-notes */ 6803);
/* harmony import */ var _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/modal/modal.module */ 38975);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 34362);







let ReleaseNotesModule = class ReleaseNotesModule {
};
ReleaseNotesModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        declarations: [
            _release_notes_page_component__WEBPACK_IMPORTED_MODULE_0__.ReleaseNotesPage,
        ],
        providers: [
            {
                provide: _release_notes__WEBPACK_IMPORTED_MODULE_1__.RELEASE_NOTES_TOKEN,
                useValue: _release_notes__WEBPACK_IMPORTED_MODULE_1__.releaseNotes,
            }
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_2__.ModalModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        ]
    })
], ReleaseNotesModule);



/***/ }),

/***/ 59728:
/*!********************************************************!*\
  !*** ./src/app/release-notes/release-notes.service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReleaseNotesService": () => (/* binding */ ReleaseNotesService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var _version_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../version.service */ 28370);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 59095);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/ts-utility */ 40352);
/* harmony import */ var _release_notes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./release-notes */ 6803);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_ts_utility_rxjs_toPromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/ts-utility/rxjs/toPromise */ 85937);
/* harmony import */ var _version_comparator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./version-comparator */ 13626);
/* harmony import */ var _storage_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../storage/storage.service */ 46607);











let ReleaseNotesService = class ReleaseNotesService {
    constructor(_versionService, _releaseNotes, _storageService) {
        this._versionService = _versionService;
        this._releaseNotes = _releaseNotes;
        this._storageService = _storageService;
        this._releaseNotesKey = 'releaseNotesViewedOn';
        this._releaseNotesViewedOnChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
        this.relevantReleaseNotes$ = this._getRelevantReleaseNotes();
    }
    setReleaseNotesWereViewed() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const currentVersion = yield (0,_shared_ts_utility_rxjs_toPromise__WEBPACK_IMPORTED_MODULE_4__.toPromise)(this._versionService.version$);
            if (currentVersion === 'development') {
                return;
            }
            yield this._storageService.set(this._releaseNotesKey, currentVersion);
            this._releaseNotesViewedOnChange$.next(currentVersion);
        });
    }
    _getRelevantReleaseNotes() {
        return (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.toObservable)(this._versionService.version$).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(currentVersion => {
            if (currentVersion === 'development') {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)([]);
            }
            const releaseNotesLastViewedOn$ = (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_1__.toObservable)(this._storageService.get(this._releaseNotesKey)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(releaseNotesLastViewedOn => {
                return this._releaseNotesViewedOnChange$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.startWith)(releaseNotesLastViewedOn));
            }));
            return releaseNotesLastViewedOn$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)((releaseNotesLastViewedOn) => {
                return lodash__WEBPACK_IMPORTED_MODULE_3__.flatMap(this._releaseNotes.filter(releaseNote => !!releaseNotesLastViewedOn && (0,_version_comparator__WEBPACK_IMPORTED_MODULE_5__.versionComparator)(releaseNote.version, releaseNotesLastViewedOn) > 0), releaseNote => {
                    return releaseNote.notes;
                });
            }));
        }));
    }
};
ReleaseNotesService.ctorParameters = () => [
    { type: _version_service__WEBPACK_IMPORTED_MODULE_0__.VersionService },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Inject, args: [_release_notes__WEBPACK_IMPORTED_MODULE_2__.RELEASE_NOTES_TOKEN,] }] },
    { type: _storage_storage_service__WEBPACK_IMPORTED_MODULE_6__.StorageService }
];
ReleaseNotesService = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injectable)({
        providedIn: 'root'
    })
], ReleaseNotesService);



/***/ }),

/***/ 6803:
/*!************************************************!*\
  !*** ./src/app/release-notes/release-notes.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RELEASE_NOTES_TOKEN": () => (/* binding */ RELEASE_NOTES_TOKEN),
/* harmony export */   "releaseNotes": () => (/* binding */ releaseNotes)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

const RELEASE_NOTES_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('Release Notes');
const releaseNotes = [
    {
        version: '1.1.3',
        notes: 'Cadence is always played in 120BPM regardless of BPM settings',
    },
    {
        version: '1.1.3',
        notes: 'Support multiple notes for Note in Key exercise (can be set up via "Number of notes" in the exercise settings)',
    },
    {
        version: '1.1.3',
        notes: 'Add the option to disable resolution in tonal exercise (Notes and Chords in Key)',
    },
    {
        version: '1.1.4',
        notes: 'Add the option move immediately to next question after answering',
    },
    {
        version: '1.1.5',
        notes: 'Add "Common Chord Progressions" Exercise. Try this to identify on the most popular and used progression.'
    },
    {
        version: '1.1.6',
        notes: 'Fix bug where right answers were not highlighted correctly'
    },
    {
        version: '1.2.1',
        notes: 'Support the minor mode for note in key exercise. Note you have to manually select relevant notes and cadence type (for now)'
    }
];


/***/ }),

/***/ 13626:
/*!*****************************************************!*\
  !*** ./src/app/release-notes/version-comparator.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "versionComparator": () => (/* binding */ versionComparator)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function versionComparator(version1, version2) {
    const split1 = version1.split('.').map(v => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.toNumber)(v));
    const split2 = version2.split('.').map(v => (0,lodash__WEBPACK_IMPORTED_MODULE_0__.toNumber)(v));
    for (let i = 0; i < split1.length; i++) {
        if (split1[i] - split2[i] != 0) {
            return split1[i] - split2[i];
        }
    }
    return 0;
}


/***/ }),

/***/ 94115:
/*!********************************************!*\
  !*** ./src/app/services/player.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerService": () => (/* binding */ PlayerService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var tone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tone */ 66151);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _exercise_utility_music_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../exercise/utility/music/notes/noteTypeToNote */ 57875);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/ts-utility */ 40352);
var PlayerService_1;









const DEFAULT_VELOCITY = 0.7;
let PlayerService = PlayerService_1 = class PlayerService {
    constructor() {
        this._instrument = this._getInstrument();
        this._currentlyPlaying = null;
        this._currentlyPlayingPartFinishedSchedulerId = null;
        this._onPartFinished$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
        this._partsToPlay = [];
    }
    get bpm() {
        return tone__WEBPACK_IMPORTED_MODULE_0__.Transport.bpm.value;
    }
    init() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            yield tone__WEBPACK_IMPORTED_MODULE_0__.start();
            yield tone__WEBPACK_IMPORTED_MODULE_0__.loaded();
        });
    }
    static _getSampleMap() {
        const sampleMap = {};
        const notesWithSamples = ['A', 'C', 'D#', 'F#'];
        const octavesWithSamples = [1, 2, 3, 4, 5, 6, 7];
        for (let noteType of notesWithSamples) {
            for (let octaveNumber of octavesWithSamples) {
                const note = (0,_exercise_utility_music_notes_noteTypeToNote__WEBPACK_IMPORTED_MODULE_2__.noteTypeToNote)(noteType, octaveNumber);
                sampleMap[note] = encodeURIComponent(`${note}v10.mp3`);
            }
        }
        return sampleMap;
    }
    /**
     * If you need to play multiple parts in a row please use playMultipleParts to avoid event clashes in case of an event in them middle of the parts
     * */
    playPart(noteEventList) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this._partsToPlay = [];
            this._stopCurrentlyPlayingAndClearTransport();
            yield this._playPart(noteEventList);
        });
    }
    playMultipleParts(parts) {
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            // stop previous playMultipleParts if exists
            this._partsToPlay = [];
            this._stopCurrentlyPlayingAndClearTransport();
            /*
            * Stop current call stuck so previous call to playMultipleParts can return.
            * Otherwise previous call will return playing this started, causing a clash in playing order
            * */
            yield (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_3__.timeoutAsPromise)();
            this._partsToPlay = lodash__WEBPACK_IMPORTED_MODULE_1__.clone(parts);
            while (this._partsToPlay.length) {
                const nextPart = this._partsToPlay.shift();
                (_a = nextPart.beforePlaying) === null || _a === void 0 ? void 0 : _a.call(nextPart);
                if (typeof nextPart.partOrTime === 'number') {
                    yield (0,_shared_ts_utility__WEBPACK_IMPORTED_MODULE_3__.timeoutAsPromise)(nextPart.partOrTime);
                }
                else {
                    /*
                    * This can be stopped in the following cases:
                    * - Part was finished (thus playing was stopped and transport cleared)
                    * - public playPart was called (thus playing was stopped and transport cleared)
                    * - playMultipleParts was called (thus playing was stopped and transport cleared)
                    * */
                    const lastBpm = this.bpm;
                    if (nextPart.bpm && lastBpm != nextPart.bpm) {
                        this.setBpm(nextPart.bpm);
                        console.log('set bpm');
                    }
                    yield this._playPart(nextPart.partOrTime);
                    if (nextPart.bpm) {
                        this.setBpm(lastBpm);
                    }
                }
                (_b = nextPart.afterPlaying) === null || _b === void 0 ? void 0 : _b.call(nextPart);
            }
        });
    }
    _stopCurrentlyPlayingAndClearTransport() {
        tone__WEBPACK_IMPORTED_MODULE_0__.Transport.stop();
        if (this._currentlyPlaying) {
            this._currentlyPlaying.dispose();
            this._currentlyPlaying = null;
        }
        if (!lodash__WEBPACK_IMPORTED_MODULE_1__.isNil(this._currentlyPlayingPartFinishedSchedulerId)) {
            tone__WEBPACK_IMPORTED_MODULE_0__.Transport.clear(this._currentlyPlayingPartFinishedSchedulerId);
        }
        this._onPartFinished$.next();
    }
    _playPart(noteEventList) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            let lastTime = 0;
            const normalizedNoteEventList = noteEventList.map((noteEvent) => {
                const normalizedNoteEvent = Object.assign({ time: lastTime, velocity: DEFAULT_VELOCITY, duration: '4n' }, noteEvent);
                lastTime = tone__WEBPACK_IMPORTED_MODULE_0__.Time(normalizedNoteEvent.time).toSeconds() + tone__WEBPACK_IMPORTED_MODULE_0__.Time(normalizedNoteEvent.duration).toSeconds();
                return normalizedNoteEvent;
            });
            this._currentlyPlaying = new tone__WEBPACK_IMPORTED_MODULE_0__.Part(((time, noteEvent) => {
                this._instrument.triggerAttackRelease(noteEvent.notes, noteEvent.duration, time, noteEvent.velocity);
            }), normalizedNoteEventList).start(0);
            const stoppingTime = lodash__WEBPACK_IMPORTED_MODULE_1__.max(normalizedNoteEventList.map(noteEvent => tone__WEBPACK_IMPORTED_MODULE_0__.Time(noteEvent.time).toSeconds() + tone__WEBPACK_IMPORTED_MODULE_0__.Time(noteEvent.duration).toSeconds()));
            this._currentlyPlayingPartFinishedSchedulerId = tone__WEBPACK_IMPORTED_MODULE_0__.Transport.schedule(() => {
                this._stopCurrentlyPlayingAndClearTransport();
            }, stoppingTime);
            tone__WEBPACK_IMPORTED_MODULE_0__.Transport.start();
            return this._onPartFinished$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();
        });
    }
    _getInstrument() {
        return new tone__WEBPACK_IMPORTED_MODULE_0__.Sampler({
            urls: PlayerService_1._getSampleMap(),
            release: 1,
            baseUrl: `${location.origin}/samples/piano-mp3-velocity10/audio/`,
        }).toDestination();
    }
    setBpm(bpm) {
        if (tone__WEBPACK_IMPORTED_MODULE_0__.Transport.bpm.value !== bpm) {
            tone__WEBPACK_IMPORTED_MODULE_0__.Transport.bpm.value = bpm;
        }
    }
};
PlayerService.ctorParameters = () => [];
PlayerService = PlayerService_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)({
        providedIn: 'root'
    })
], PlayerService);



/***/ }),

/***/ 12662:
/*!********************************************************!*\
  !*** ./src/app/shared/animations/collapse-vertical.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collapseVertical": () => (/* binding */ collapseVertical)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ 31631);
/* harmony import */ var _enter_leave_animation_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enter-leave-animation-factory */ 69016);


const collapseVertical = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.trigger)('collapseVertical', (0,_enter_leave_animation_factory__WEBPACK_IMPORTED_MODULE_0__.enterLeaveAnimationFactory)({
    steps: [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
            height: 0,
            opacity: 0,
            overflow: 'hidden',
            offset: 0,
            display: 'block',
        }),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
            height: '*',
            opacity: 1,
            overflow: 'hidden',
            offset: 1.0,
            display: 'block',
        }),
    ],
}));


/***/ }),

/***/ 69016:
/*!********************************************************************!*\
  !*** ./src/app/shared/animations/enter-leave-animation-factory.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enterLeaveAnimationFactory": () => (/* binding */ enterLeaveAnimationFactory)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ 31631);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


function reverseSteps(steps) {
    return [...steps]
        .reverse();
}
function enterLeaveAnimationFactory(args) {
    lodash__WEBPACK_IMPORTED_MODULE_0__.defaults(args, {
        timing: '200ms ease-out',
        animateOnLeave: true,
    });
    const hiddenStyle = args.hiddenStyle || {
        display: 'none',
    };
    const animationStyleMetadataList = [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.state)('hidden', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)(hiddenStyle)),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)('hidden => visible', [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)(args.timing, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.keyframes)(args.steps)),
        ]),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)(':enter', [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)(args.timing, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.keyframes)(args.steps)),
        ]),
    ];
    if (args.animateOnLeave) {
        animationStyleMetadataList.push((0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)('visible => hidden', [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)(args.timing, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.keyframes)(reverseSteps(args.steps))),
        ]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.transition)(':leave', [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.animate)(args.timing, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.keyframes)(reverseSteps(args.steps))),
        ]));
    }
    return animationStyleMetadataList;
}


/***/ }),

/***/ 43978:
/*!*******************************************!*\
  !*** ./src/app/shared/animations/fade.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fade": () => (/* binding */ fade)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ 31631);
/* harmony import */ var _enter_leave_animation_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enter-leave-animation-factory */ 69016);


const fade = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.trigger)('fade', (0,_enter_leave_animation_factory__WEBPACK_IMPORTED_MODULE_0__.enterLeaveAnimationFactory)({
    steps: [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
            opacity: 0,
        }),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_1__.style)({
            opacity: 1,
        }),
    ],
}));


/***/ }),

/***/ 73510:
/*!********************************************!*\
  !*** ./src/app/shared/animations/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "collapseVertical": () => (/* reexport safe */ _collapse_vertical__WEBPACK_IMPORTED_MODULE_0__.collapseVertical)
/* harmony export */ });
/* harmony import */ var _collapse_vertical__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapse-vertical */ 12662);



/***/ }),

/***/ 58893:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/collapsible/collapsible.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollapsibleComponent": () => (/* binding */ CollapsibleComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _collapsible_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collapsible.component.html?ngResource */ 22447);
/* harmony import */ var _collapsible_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapsible.component.scss?ngResource */ 78445);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../animations */ 73510);
/* harmony import */ var _animations_fade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../animations/fade */ 43978);






let CollapsibleComponent = class CollapsibleComponent {
    constructor() {
        this.isCollapsed = true;
    }
};
CollapsibleComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-collapsible',
        template: _collapsible_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        animations: [
            _animations__WEBPACK_IMPORTED_MODULE_2__.collapseVertical,
            _animations_fade__WEBPACK_IMPORTED_MODULE_3__.fade,
        ],
        styles: [_collapsible_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], CollapsibleComponent);



/***/ }),

/***/ 61252:
/*!**********************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/content-padding.directive.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentPaddingDirective": () => (/* binding */ ContentPaddingDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);


let ContentPaddingDirective = class ContentPaddingDirective {
};
ContentPaddingDirective.propDecorators = {
    isWithPadding: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding, args: ['class.--padding',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input, args: ['padding',] }]
};
ContentPaddingDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({
        selector: 'ion-content[padding]'
    })
], ContentPaddingDirective);



/***/ }),

/***/ 46135:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/info-panel/info-panel.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoPanelComponent": () => (/* binding */ InfoPanelComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _info_panel_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./info-panel.component.html?ngResource */ 79627);
/* harmony import */ var _info_panel_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info-panel.component.scss?ngResource */ 33610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);




let InfoPanelComponent = class InfoPanelComponent {
    constructor() { }
    ngOnInit() { }
};
InfoPanelComponent.ctorParameters = () => [];
InfoPanelComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-info-panel',
        template: _info_panel_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_info_panel_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], InfoPanelComponent);



/***/ }),

/***/ 59119:
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/play-on-click.directive.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayOnClickDirective": () => (/* binding */ PlayOnClickDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_player_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/player.service */ 94115);
/* harmony import */ var _exercise_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../exercise/utility */ 98979);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);





let PlayOnClickDirective = class PlayOnClickDirective {
    constructor(_player) {
        this._player = _player;
    }
    onClick() {
        if (lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty(this.part)) {
            return;
        }
        this._player.playPart((0,_exercise_utility__WEBPACK_IMPORTED_MODULE_1__.toSteadyPart)(this.part));
    }
};
PlayOnClickDirective.ctorParameters = () => [
    { type: _services_player_service__WEBPACK_IMPORTED_MODULE_0__.PlayerService }
];
PlayOnClickDirective.propDecorators = {
    part: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input, args: ['playOnClick',] }],
    onClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.HostListener, args: ['click',] }]
};
PlayOnClickDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Directive)({
        selector: '[playOnClick]'
    })
], PlayOnClickDirective);



/***/ }),

/***/ 21264:
/*!*********************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/shared-components.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedComponentsModule": () => (/* binding */ SharedComponentsModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _content_padding_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content-padding.directive */ 61252);
/* harmony import */ var _play_on_click_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./play-on-click.directive */ 59119);
/* harmony import */ var _info_panel_info_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./info-panel/info-panel.component */ 46135);
/* harmony import */ var _collapsible_collapsible_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collapsible/collapsible.component */ 58893);







let SharedComponentsModule = class SharedComponentsModule {
};
SharedComponentsModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        declarations: [
            _content_padding_directive__WEBPACK_IMPORTED_MODULE_0__.ContentPaddingDirective,
            _play_on_click_directive__WEBPACK_IMPORTED_MODULE_1__.PlayOnClickDirective,
            _info_panel_info_panel_component__WEBPACK_IMPORTED_MODULE_2__.InfoPanelComponent,
            _collapsible_collapsible_component__WEBPACK_IMPORTED_MODULE_3__.CollapsibleComponent,
        ],
        exports: [
            _content_padding_directive__WEBPACK_IMPORTED_MODULE_0__.ContentPaddingDirective,
            _play_on_click_directive__WEBPACK_IMPORTED_MODULE_1__.PlayOnClickDirective,
            _info_panel_info_panel_component__WEBPACK_IMPORTED_MODULE_2__.InfoPanelComponent,
            _collapsible_collapsible_component__WEBPACK_IMPORTED_MODULE_3__.CollapsibleComponent,
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        ],
    })
], SharedComponentsModule);



/***/ }),

/***/ 41250:
/*!*******************************************************************!*\
  !*** ./src/app/shared/modal/modal-frame/modal-frame.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalFrameComponent": () => (/* binding */ ModalFrameComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _modal_frame_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-frame.component.html?ngResource */ 35902);
/* harmony import */ var _modal_frame_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal-frame.component.scss?ngResource */ 68606);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 34362);





let ModalFrameComponent = class ModalFrameComponent {
    constructor(_modalController) {
        this._modalController = _modalController;
        this.padding = true;
    }
    close() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            yield this._modalController.dismiss(this.onClose ? yield this.onClose() : undefined);
        });
    }
};
ModalFrameComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController }
];
ModalFrameComponent.propDecorators = {
    title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }],
    padding: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }],
    onClose: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Input }]
};
ModalFrameComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-modal-frame',
        template: _modal_frame_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        exportAs: 'modal',
        styles: [_modal_frame_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ModalFrameComponent);



/***/ }),

/***/ 38975:
/*!**********************************************!*\
  !*** ./src/app/shared/modal/modal.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModalModule": () => (/* binding */ ModalModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _modal_frame_modal_frame_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-frame/modal-frame.component */ 41250);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _components_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/shared-components/shared-components.module */ 21264);






let ModalModule = class ModalModule {
};
ModalModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        declarations: [
            _modal_frame_modal_frame_component__WEBPACK_IMPORTED_MODULE_0__.ModalFrameComponent,
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _components_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        ],
        exports: [
            _modal_frame_modal_frame_component__WEBPACK_IMPORTED_MODULE_0__.ModalFrameComponent,
        ]
    })
], ModalModule);



/***/ }),

/***/ 71594:
/*!****************************************************!*\
  !*** ./src/app/shared/ts-utility/ArrayItemType.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 52550:
/*!*****************************************************!*\
  !*** ./src/app/shared/ts-utility/LogReturnValue.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogReturnValue": () => (/* binding */ LogReturnValue),
/* harmony export */   "LogAsyncReturnValue": () => (/* binding */ LogAsyncReturnValue)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);

function LogReturnValue(label) {
    return function (target, propertyKey, descriptor) {
        const childFunction = descriptor.value;
        descriptor.value = function (...args) {
            const returnedValue = childFunction.apply(this, args);
            console.log(label || '', propertyKey, returnedValue);
            return returnedValue;
        };
    };
}
function LogAsyncReturnValue(label) {
    return function (target, propertyKey, descriptor) {
        const childFunction = descriptor.value;
        descriptor.value = function (...args) {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
                const returnedValue = yield childFunction.apply(this, args);
                console.log(label || '', propertyKey, returnedValue);
                return returnedValue;
            });
        };
    };
}


/***/ }),

/***/ 22964:
/*!************************************************!*\
  !*** ./src/app/shared/ts-utility/Primitive.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 6521:
/*!*****************************************************!*\
  !*** ./src/app/shared/ts-utility/StaticOrGetter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toGetter": () => (/* binding */ toGetter)
/* harmony export */ });
function toGetter(staticOrGetter) {
    return (...param) => staticOrGetter instanceof Function ? staticOrGetter(...param) : staticOrGetter;
}


/***/ }),

/***/ 3709:
/*!******************************************************************!*\
  !*** ./src/app/shared/ts-utility/base-classes/base-component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseComponent": () => (/* binding */ BaseComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var _base_destroyable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-destroyable */ 70939);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 83910);





let BaseComponent = class BaseComponent extends _base_destroyable__WEBPACK_IMPORTED_MODULE_0__.BaseDestroyable {
    constructor() {
        super(...arguments);
        this._afterViewInit$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(1);
        this.afterViewInit$ = this._afterViewInit$.asObservable();
        this.afterViewInitPromise = this.afterViewInit$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1))
            .toPromise();
    }
    ngAfterViewInit() {
        this._afterViewInit$.next();
    }
};
BaseComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Directive)()
], BaseComponent);



/***/ }),

/***/ 69909:
/*!*****************************************************************************************!*\
  !*** ./src/app/shared/ts-utility/base-classes/base-control-value-accessor-component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseControlValueAccessorComponent": () => (/* binding */ BaseControlValueAccessorComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ 3709);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 88623);
/* harmony import */ var _rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rxjs */ 78562);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);







let BaseControlValueAccessorComponent = class BaseControlValueAccessorComponent extends _base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor(_cvaInjector) {
        super();
        this._cvaInjector = _cvaInjector;
        this._isDisabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(false);
        this.isDisabled$ = this._isDisabled$.asObservable();
        this._modelValue$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.ReplaySubject(1);
        this.modelValue$ = this._modelValue$.asObservable();
        this._onChange = lodash__WEBPACK_IMPORTED_MODULE_2__.noop;
        this._onTouch = lodash__WEBPACK_IMPORTED_MODULE_2__.noop;
        this._cvaElement = this._cvaInjector.get(_angular_core__WEBPACK_IMPORTED_MODULE_5__.ElementRef).nativeElement;
        this.onValueChangeEmitter$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        this.value$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.merge)(this.modelValue$, this.onValueChangeEmitter$)
            .pipe((0,_rxjs__WEBPACK_IMPORTED_MODULE_1__.publishReplayUntilAndConnect)(this._destroy$));
        // Sometimes this can get called from outside, make an arrow function to ensure `this` points to the right object
        this.setDisabledState = (isDisabled) => {
            if (this._isDisabled$.value !== !!isDisabled) {
                this._isDisabled$.next(!!isDisabled);
                if (isDisabled) {
                    this._cvaElement.setAttribute('disabled', '');
                }
                else {
                    this._cvaElement.removeAttribute('disabled');
                }
            }
        };
    }
    set value(value) {
        this.writeValue(value);
    }
    set disabledInput(isDisabled) {
        this.setDisabledState(!!isDisabled);
    }
    get isDisabled() {
        return this._isDisabled$.value;
    }
    //#region PUBLIC ACTIONS
    setViewValue(newValue, skipMarkAsTouched) {
        this._onChange(newValue);
        if (!skipMarkAsTouched) {
            this._onTouch();
        }
        this.onValueChangeEmitter$.next(newValue);
    }
    getCurrentValuePromise() {
        return this.value$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1))
            .toPromise();
    }
    //#endregion
    //#region ANGULAR
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouch = fn;
    }
    writeValue(modelValue) {
        this._modelValue$.next(modelValue);
    }
};
BaseControlValueAccessorComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Injector }
];
BaseControlValueAccessorComponent.propDecorators = {
    value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    disabledInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input, args: ['disabled',] }],
    onValueChangeEmitter$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Output, args: ['valueChange',] }]
};
BaseControlValueAccessorComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Directive)()
    // eslint-disable-next-line @angular-eslint/directive-class-suffix
], BaseControlValueAccessorComponent);



/***/ }),

/***/ 99623:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/ts-utility/base-classes/base-control-value-accessor-service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseControlValueAccessorService": () => (/* binding */ BaseControlValueAccessorService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 61555);
/* harmony import */ var _base_destroyable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-destroyable */ 70939);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



class BaseControlValueAccessorService extends _base_destroyable__WEBPACK_IMPORTED_MODULE_0__.BaseDestroyable {
    constructor() {
        super(...arguments);
        this._isDisabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(false);
        this.isDisabled$ = this._isDisabled$.asObservable();
        this._modelValue$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.ReplaySubject(1);
        this._onChange = lodash__WEBPACK_IMPORTED_MODULE_1__.noop;
        this._onTouch = lodash__WEBPACK_IMPORTED_MODULE_1__.noop;
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouch = fn;
    }
    setDisabledState(isDisabled) {
        if (this._isDisabled$.value !== !!isDisabled) {
            this._isDisabled$.next(!!isDisabled);
        }
    }
    writeValue(modelValue) {
        this._modelValue$.next(modelValue);
    }
    emitViewValueChanged(newValue) {
        this._onChange(newValue);
        this._onTouch();
    }
}


/***/ }),

/***/ 136:
/*!***************************************************************************************************!*\
  !*** ./src/app/shared/ts-utility/base-classes/base-control-value-accessor-with-custom-control.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseControlValueAccessorWithCustomControl": () => (/* binding */ BaseControlValueAccessorWithCustomControl)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _base_control_value_accessor_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-control-value-accessor-component */ 69909);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 85921);
/* harmony import */ var _rxjs_toPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rxjs/toPromise */ 85937);




class BaseControlValueAccessorWithCustomControl extends _base_control_value_accessor_component__WEBPACK_IMPORTED_MODULE_0__.BaseControlValueAccessorComponent {
    constructor(injector) {
        super(injector);
        this.control = this._getControl();
        this._startModelValueChangeHandler();
        this._startDisabledChangeHandler();
    }
    setInternalViewValue(newValue, skipMarkAsTouched) {
        super.setViewValue(this._internalValueToCVAValue(newValue), skipMarkAsTouched);
    }
    _startModelValueChangeHandler() {
        this.modelValue$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._destroy$))
            .subscribe((modelValue) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            this.control.setValue(yield (0,_rxjs_toPromise__WEBPACK_IMPORTED_MODULE_1__.toPromise)(this._CVAValueToInternalValue(modelValue)));
        }));
    }
    _startDisabledChangeHandler() {
        this.isDisabled$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._destroy$))
            .subscribe(isDisabled => this.control.setIsDisabled(isDisabled));
    }
}


/***/ }),

/***/ 70939:
/*!********************************************************************!*\
  !*** ./src/app/shared/ts-utility/base-classes/base-destroyable.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseDestroyable": () => (/* binding */ BaseDestroyable)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 92218);



let BaseDestroyable = class BaseDestroyable {
    constructor() {
        this._destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        this._onDestroy();
    }
    /**
     * Override this when extending if needs to
     * */
    _onDestroy() {
    }
};
BaseDestroyable = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], BaseDestroyable);



/***/ }),

/***/ 71167:
/*!*********************************************************!*\
  !*** ./src/app/shared/ts-utility/base-classes/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseComponent": () => (/* reexport safe */ _base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent),
/* harmony export */   "BaseControlValueAccessorComponent": () => (/* reexport safe */ _base_control_value_accessor_component__WEBPACK_IMPORTED_MODULE_1__.BaseControlValueAccessorComponent),
/* harmony export */   "BaseControlValueAccessorService": () => (/* reexport safe */ _base_control_value_accessor_service__WEBPACK_IMPORTED_MODULE_2__.BaseControlValueAccessorService),
/* harmony export */   "BaseControlValueAccessorWithCustomControl": () => (/* reexport safe */ _base_control_value_accessor_with_custom_control__WEBPACK_IMPORTED_MODULE_3__.BaseControlValueAccessorWithCustomControl),
/* harmony export */   "BaseDestroyable": () => (/* reexport safe */ _base_destroyable__WEBPACK_IMPORTED_MODULE_4__.BaseDestroyable)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ 3709);
/* harmony import */ var _base_control_value_accessor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-control-value-accessor-component */ 69909);
/* harmony import */ var _base_control_value_accessor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-control-value-accessor-service */ 99623);
/* harmony import */ var _base_control_value_accessor_with_custom_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base-control-value-accessor-with-custom-control */ 136);
/* harmony import */ var _base_destroyable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-destroyable */ 70939);







/***/ }),

/***/ 40352:
/*!********************************************!*\
  !*** ./src/app/shared/ts-utility/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomFromList": () => (/* reexport safe */ _randomFromList__WEBPACK_IMPORTED_MODULE_0__.randomFromList),
/* harmony export */   "timeoutAsPromise": () => (/* reexport safe */ _timeoutAsPromise__WEBPACK_IMPORTED_MODULE_1__.timeoutAsPromise),
/* harmony export */   "toArray": () => (/* reexport safe */ _toArray__WEBPACK_IMPORTED_MODULE_2__.toArray),
/* harmony export */   "isValueTruthy": () => (/* reexport safe */ _isValueTruthy__WEBPACK_IMPORTED_MODULE_3__.isValueTruthy),
/* harmony export */   "publishReplayUntilAndConnect": () => (/* reexport safe */ _rxjs__WEBPACK_IMPORTED_MODULE_6__.publishReplayUntilAndConnect),
/* harmony export */   "toObservable": () => (/* reexport safe */ _rxjs__WEBPACK_IMPORTED_MODULE_6__.toObservable),
/* harmony export */   "BaseComponent": () => (/* reexport safe */ _base_classes__WEBPACK_IMPORTED_MODULE_7__.BaseComponent),
/* harmony export */   "BaseControlValueAccessorComponent": () => (/* reexport safe */ _base_classes__WEBPACK_IMPORTED_MODULE_7__.BaseControlValueAccessorComponent),
/* harmony export */   "BaseControlValueAccessorService": () => (/* reexport safe */ _base_classes__WEBPACK_IMPORTED_MODULE_7__.BaseControlValueAccessorService),
/* harmony export */   "BaseControlValueAccessorWithCustomControl": () => (/* reexport safe */ _base_classes__WEBPACK_IMPORTED_MODULE_7__.BaseControlValueAccessorWithCustomControl),
/* harmony export */   "BaseDestroyable": () => (/* reexport safe */ _base_classes__WEBPACK_IMPORTED_MODULE_7__.BaseDestroyable),
/* harmony export */   "toGetter": () => (/* reexport safe */ _StaticOrGetter__WEBPACK_IMPORTED_MODULE_8__.toGetter),
/* harmony export */   "LogAsyncReturnValue": () => (/* reexport safe */ _LogReturnValue__WEBPACK_IMPORTED_MODULE_9__.LogAsyncReturnValue),
/* harmony export */   "LogReturnValue": () => (/* reexport safe */ _LogReturnValue__WEBPACK_IMPORTED_MODULE_9__.LogReturnValue)
/* harmony export */ });
/* harmony import */ var _randomFromList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomFromList */ 54274);
/* harmony import */ var _timeoutAsPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeoutAsPromise */ 92863);
/* harmony import */ var _toArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toArray */ 71138);
/* harmony import */ var _isValueTruthy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isValueTruthy */ 24009);
/* harmony import */ var _Primitive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Primitive */ 22964);
/* harmony import */ var _ArrayItemType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ArrayItemType */ 71594);
/* harmony import */ var _rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rxjs */ 78562);
/* harmony import */ var _base_classes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base-classes */ 71167);
/* harmony import */ var _StaticOrGetter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./StaticOrGetter */ 6521);
/* harmony import */ var _LogReturnValue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LogReturnValue */ 52550);












/***/ }),

/***/ 24009:
/*!****************************************************!*\
  !*** ./src/app/shared/ts-utility/isValueTruthy.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValueTruthy": () => (/* binding */ isValueTruthy)
/* harmony export */ });
function isValueTruthy(value) {
    return value !== null && value !== undefined;
}


/***/ }),

/***/ 54274:
/*!*****************************************************!*\
  !*** ./src/app/shared/ts-utility/randomFromList.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomFromList": () => (/* binding */ randomFromList)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function randomFromList(list) {
    return list[lodash__WEBPACK_IMPORTED_MODULE_0__.random(0, list.length - 1)];
}


/***/ }),

/***/ 78562:
/*!*************************************************!*\
  !*** ./src/app/shared/ts-utility/rxjs/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "publishReplayUntilAndConnect": () => (/* reexport safe */ _publishReplayUntilAndConnect__WEBPACK_IMPORTED_MODULE_0__.publishReplayUntilAndConnect),
/* harmony export */   "toObservable": () => (/* reexport safe */ _toObservable__WEBPACK_IMPORTED_MODULE_1__.toObservable)
/* harmony export */ });
/* harmony import */ var _publishReplayUntilAndConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./publishReplayUntilAndConnect */ 874);
/* harmony import */ var _toObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toObservable */ 97693);




/***/ }),

/***/ 874:
/*!************************************************************************!*\
  !*** ./src/app/shared/ts-utility/rxjs/publishReplayUntilAndConnect.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "publishReplayUntilAndConnect": () => (/* binding */ publishReplayUntilAndConnect)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 94989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 83910);

function publishReplayUntilAndConnect(notifier) {
    return (source$) => {
        const connectableObservable = source$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.publishReplay)(1));
        const subscription = connectableObservable.connect();
        if (notifier) {
            notifier.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1))
                .subscribe(() => subscription.unsubscribe());
        }
        return connectableObservable;
    };
}


/***/ }),

/***/ 97693:
/*!********************************************************!*\
  !*** ./src/app/shared/ts-utility/rxjs/toObservable.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toObservable": () => (/* binding */ toObservable)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 12378);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 24383);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 64139);

function toObservable(input) {
    if (input instanceof rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return input;
    }
    if (input instanceof Promise) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.from)(input);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(input);
}


/***/ }),

/***/ 85937:
/*!*****************************************************!*\
  !*** ./src/app/shared/ts-utility/rxjs/toPromise.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toPromise": () => (/* binding */ toPromise)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 12378);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 83910);


function toPromise(param) {
    if (param instanceof rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable) {
        return param.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1))
            .toPromise();
    }
    if (param instanceof Promise) {
        return param;
    }
    return Promise.resolve(param);
}


/***/ }),

/***/ 92863:
/*!*******************************************************!*\
  !*** ./src/app/shared/ts-utility/timeoutAsPromise.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutAsPromise": () => (/* binding */ timeoutAsPromise)
/* harmony export */ });
function timeoutAsPromise(ms = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


/***/ }),

/***/ 71138:
/*!**********************************************!*\
  !*** ./src/app/shared/ts-utility/toArray.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toArray": () => (/* binding */ toArray)
/* harmony export */ });
function toArray(param) {
    return Array.isArray(param) ? param : [param];
}


/***/ }),

/***/ 46607:
/*!********************************************!*\
  !*** ./src/app/storage/storage.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageService": () => (/* binding */ StorageService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage-angular */ 80190);



let StorageService = class StorageService {
    constructor(_storage) {
        this._storage = _storage;
        this.storagePromise = this._storage.create();
    }
    get(key) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return (yield this.storagePromise).get(key);
        });
    }
    set(key, value) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            return (yield this.storagePromise).set(key, value);
        });
    }
};
StorageService.ctorParameters = () => [
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_1__.Storage }
];
StorageService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root'
    })
], StorageService);



/***/ }),

/***/ 28370:
/*!************************************!*\
  !*** ./src/app/version.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VersionService": () => (/* binding */ VersionService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ 85209);



let VersionService = class VersionService {
    constructor(_appVersion) {
        this._appVersion = _appVersion;
        this.version$ = this._getVersion();
    }
    _getVersion() {
        return this._appVersion.getVersionNumber()
            .catch((error) => {
            /**
             * TODO: it would be healthier to never call getVersionCode when cordova is not available.
             * Need to figure out how to know that
             * */
            return 'development';
        });
    }
    ;
};
VersionService.ctorParameters = () => [
    { type: _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_0__.AppVersion }
];
VersionService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], VersionService);



/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 68150);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 50863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-action-sheet.entry.js": [
		25593,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		13225,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		4812,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		86655,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		44856,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		13059,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-button_2.entry.js": [
		98308,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		44690,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		64090,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		36214,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		69447,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		79689,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		18840,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		40749,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		69667,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		83288,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		35473,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		53634,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		22855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		495,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		58737,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		99632,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-popover.entry.js": [
		48050,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		18994,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		23592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		35454,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		290,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		92666,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		64816,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		45534,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		94902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		91938,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		78179,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		90668,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		61624,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		19989,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		28902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		70199,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		48395,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		96357,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		38268,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		15269,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		32875,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 50863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 77601:
/*!***********************************************!*\
  !*** ./src/app/app.component.scss?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */";

/***/ }),

/***/ 17112:
/*!****************************************************************************!*\
  !*** ./src/app/release-notes/release-notes-page.component.scss?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "@charset \"UTF-8\";\nul {\n  list-style-type: \"✓  \";\n}\nul li > {\n  margin-left: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbGVhc2Utbm90ZXMtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFDRSxzQkFBQTtBQUVGO0FBQ0k7RUFDRSxnQkFBQTtBQUNOIiwiZmlsZSI6InJlbGVhc2Utbm90ZXMtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbnVsIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBcIuKckyAgXCI7XG59XG51bCBsaSA+IHtcbiAgbWFyZ2luLWxlZnQ6IDhweDtcbn0iXX0= */";

/***/ }),

/***/ 78445:
/*!*******************************************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/collapsible/collapsible.component.scss?ngResource ***!
  \*******************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = ":host {\n  display: block;\n}\n\np {\n  margin-bottom: 0;\n  text-decoration: underline;\n  opacity: 0.7;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxhcHNpYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSwwQkFBQTtFQUNBLFlBQUE7QUFDRiIsImZpbGUiOiJjb2xsYXBzaWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxucCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMDtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICBvcGFjaXR5OiAwLjc7XHJcbn1cclxuIl19 */";

/***/ }),

/***/ 33610:
/*!*****************************************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/info-panel/info-panel.component.scss?ngResource ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = ":host {\n  background-color: rgba(var(--ion-color-primary-rgb), 0.3);\n  padding: 16px;\n  display: block;\n  border-radius: 8px;\n  margin: 16px 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZm8tcGFuZWwuY29tcG9uZW50LnNjc3MiLCIuLlxcLi5cXC4uXFwuLlxcLi5cXHN0eWxlXFxtYWluLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSx5REFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JDTks7RURPTCxjQUFBO0FBREYiLCJmaWxlIjoiaW5mby1wYW5lbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkB1c2UgJ21haW4nIGFzICo7XHJcblxyXG46aG9zdCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjMpO1xyXG4gIHBhZGRpbmc6IDIgKiAkdW5pdDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBib3JkZXItcmFkaXVzOiAkdW5pdDtcclxuICBtYXJnaW46IDIgKiAkdW5pdCAwO1xyXG59XHJcbiIsIiR1bml0OiA4cHg7XHJcbiJdfQ== */";

/***/ }),

/***/ 68606:
/*!********************************************************************************!*\
  !*** ./src/app/shared/modal/modal-frame/modal-frame.component.scss?ngResource ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtb2RhbC1mcmFtZS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 33383:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-app>\r\n  <ion-router-outlet></ion-router-outlet>\r\n</ion-app>\r\n";

/***/ }),

/***/ 69659:
/*!****************************************************************************!*\
  !*** ./src/app/release-notes/release-notes-page.component.html?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<app-modal-frame\r\n  title=\"What's new in OpenEar?\"\r\n  #modal=\"modal\"\r\n>\r\n  <p>\r\n    Version: {{versionService.version$ | async}}\r\n  </p>\r\n  <ul>\r\n    <li *ngFor=\"let releaseNote of (releaseNotesService.relevantReleaseNotes$ | async)\">{{releaseNote}}</li>\r\n  </ul>\r\n  <ion-button expand=\"block\" (click)=\"modal.close()\">Nice! Let's go</ion-button>\r\n</app-modal-frame>\r\n";

/***/ }),

/***/ 22447:
/*!*******************************************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/collapsible/collapsible.component.html?ngResource ***!
  \*******************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<p\r\n  (click)=\"isCollapsed = !isCollapsed\"\r\n>\r\n  {{isCollapsed ? 'Click here to learn more' : 'Hide'}}\r\n</p>\r\n\r\n<div\r\n  *ngIf=\"!isCollapsed\"\r\n  style=\"overflow: hidden\"\r\n  @collapseVertical\r\n>\r\n  <ng-content></ng-content>\r\n</div>\r\n";

/***/ }),

/***/ 79627:
/*!*****************************************************************************************************!*\
  !*** ./src/app/shared/components/shared-components/info-panel/info-panel.component.html?ngResource ***!
  \*****************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ng-content></ng-content>\r\n";

/***/ }),

/***/ 35902:
/*!********************************************************************************!*\
  !*** ./src/app/shared/modal/modal-frame/modal-frame.component.html?ngResource ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-header [translucent]=\"true\">\r\n  <ion-toolbar [color]=\"'primary'\">\r\n    <ion-title>\r\n      {{ title }}\r\n    </ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button (click)=\"close()\">\r\n        <ion-icon slot=\"icon-only\" name=\"close-outline\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content\r\n  [fullscreen]=\"true\"\r\n  [padding]=\"padding\"\r\n>\r\n  <ng-content></ng-content>\r\n</ion-content>\r\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map