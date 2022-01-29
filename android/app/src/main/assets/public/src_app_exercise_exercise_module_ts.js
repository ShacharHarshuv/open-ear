"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_exercise_exercise_module_ts"],{

/***/ 58398:
/*!*****************************************************!*\
  !*** ./src/app/exercise/exercise-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseRoutingModule": () => (/* binding */ ExerciseRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _exercise_page_exercise_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercise.page/exercise.page */ 21431);




const routes = [
    {
        path: '',
        component: _exercise_page_exercise_page__WEBPACK_IMPORTED_MODULE_0__.ExercisePage,
    }
];
let ExerciseRoutingModule = class ExerciseRoutingModule {
};
ExerciseRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ExerciseRoutingModule);



/***/ }),

/***/ 6464:
/*!*********************************************!*\
  !*** ./src/app/exercise/exercise.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseModule": () => (/* binding */ ExerciseModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _exercise_page_exercise_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercise.page/exercise.page */ 21431);
/* harmony import */ var _exercise_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exercise-routing.module */ 58398);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _exercise_page_components_exercise_settings_page_exercise_settings_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exercise.page/components/exercise-settings.page/exercise-settings.page */ 62333);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _exercise_page_components_answer_indication_answer_indication_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exercise.page/components/answer-indication/answer-indication.component */ 92613);
/* harmony import */ var _exercise_page_components_exercise_settings_page_components_included_answers_list_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./exercise.page/components/exercise-settings.page/components/included-answers/list-select.component */ 67423);
/* harmony import */ var _shared_components_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/components/shared-components/shared-components.module */ 21264);
/* harmony import */ var _exercise_page_components_exercise_help_exercise_explanation_exercise_explanation_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page */ 21665);
/* harmony import */ var _exercise_page_components_exercise_help_exercise_explanation_exercise_explanation_content_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exercise.page/components/exercise-help/exercise-explanation/exercise-explanation-content.directive */ 97137);
/* harmony import */ var _services_exercise_exercise_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/exercise/exercise.service */ 70174);
/* harmony import */ var _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/modal/modal.module */ 38975);
/* harmony import */ var _shared_ng_utilities_pure_function_pipe_pure_function_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/ng-utilities/pure-function-pipe/pure-function.pipe */ 92566);
/* harmony import */ var _shared_ng_utilities_console_log_component_console_log_component_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/ng-utilities/console-log-component/console-log-component.module */ 8931);

















let ExerciseModule = class ExerciseModule {
};
ExerciseModule = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgModule)({
        declarations: [
            _exercise_page_exercise_page__WEBPACK_IMPORTED_MODULE_0__.ExercisePage,
            _exercise_page_components_exercise_settings_page_exercise_settings_page__WEBPACK_IMPORTED_MODULE_2__.ExerciseSettingsPage,
            _exercise_page_components_exercise_help_exercise_explanation_exercise_explanation_page__WEBPACK_IMPORTED_MODULE_6__.ExerciseExplanationPage,
            _exercise_page_components_answer_indication_answer_indication_component__WEBPACK_IMPORTED_MODULE_3__.AnswerIndicationComponent,
            _exercise_page_components_exercise_settings_page_components_included_answers_list_select_component__WEBPACK_IMPORTED_MODULE_4__.ListSelectComponent,
            _exercise_page_components_exercise_help_exercise_explanation_exercise_explanation_content_directive__WEBPACK_IMPORTED_MODULE_7__.ExerciseExplanationContentDirective,
            ..._services_exercise_exercise_service__WEBPACK_IMPORTED_MODULE_8__.ExerciseService.ngComponents,
            _shared_ng_utilities_pure_function_pipe_pure_function_pipe__WEBPACK_IMPORTED_MODULE_10__.PureFunctionPipe,
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule,
            _exercise_routing_module__WEBPACK_IMPORTED_MODULE_1__.ExerciseRoutingModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonicModule,
            _shared_components_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_5__.SharedComponentsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule,
            _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_9__.ModalModule,
            _shared_ng_utilities_console_log_component_console_log_component_module__WEBPACK_IMPORTED_MODULE_11__.ConsoleLogComponentModule,
        ],
    })
], ExerciseModule);



/***/ }),

/***/ 92613:
/*!****************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/answer-indication/answer-indication.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnswerIndicationComponent": () => (/* binding */ AnswerIndicationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _answer_indication_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./answer-indication.component.html?ngResource */ 86970);
/* harmony import */ var _answer_indication_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./answer-indication.component.scss?ngResource */ 58903);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




let AnswerIndicationComponent = class AnswerIndicationComponent {
    constructor() {
        this.answer = null;
        this.isFocused = false;
        this.wasAnsweredWrong = false;
    }
};
AnswerIndicationComponent.ctorParameters = () => [];
AnswerIndicationComponent.propDecorators = {
    answer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    isFocused: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.HostBinding, args: ['class.--focused',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    wasAnsweredWrong: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.HostBinding, args: ['class.--wrong',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
AnswerIndicationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-answer-indication',
        template: _answer_indication_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_answer_indication_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AnswerIndicationComponent);



/***/ }),

/***/ 97137:
/*!********************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-help/exercise-explanation/exercise-explanation-content.directive.ts ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseExplanationContentDirective": () => (/* binding */ ExerciseExplanationContentDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);


let ExerciseExplanationContentDirective = class ExerciseExplanationContentDirective {
    constructor(_eRef, _viewContainerRef, _cfResolver) {
        this._eRef = _eRef;
        this._viewContainerRef = _viewContainerRef;
        this._cfResolver = _cfResolver;
    }
    set content(content) {
        if (typeof content === 'string') {
            this._eRef.nativeElement.innerHTML = content;
        }
        else {
            this._viewContainerRef.clear();
            this._viewContainerRef.createComponent(this._cfResolver.resolveComponentFactory(content));
        }
    }
    _clearCurrentContent() {
    }
};
ExerciseExplanationContentDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ComponentFactoryResolver }
];
ExerciseExplanationContentDirective.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input, args: ['exerciseExplanationContent',] }]
};
ExerciseExplanationContentDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({
        selector: '[exerciseExplanationContent]'
    })
], ExerciseExplanationContentDirective);



/***/ }),

/***/ 21665:
/*!*******************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseExplanationPage": () => (/* binding */ ExerciseExplanationPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _exercise_explanation_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercise-explanation.page.html?ngResource */ 60846);
/* harmony import */ var _exercise_explanation_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exercise-explanation.page.scss?ngResource */ 22498);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




let ExerciseExplanationPage = class ExerciseExplanationPage {
};
ExerciseExplanationPage.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }],
    exerciseName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.Input }]
};
ExerciseExplanationPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-exercise-explanation',
        template: _exercise_explanation_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_exercise_explanation_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ExerciseExplanationPage);



/***/ }),

/***/ 67423:
/*!*******************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-settings.page/components/included-answers/list-select.component.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListSelectComponent": () => (/* binding */ ListSelectComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _list_select_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-select.component.html?ngResource */ 76530);
/* harmony import */ var _list_select_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-select.component.scss?ngResource */ 32659);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../shared/ts-utility */ 40352);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 83910);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 90587);
var ListSelectComponent_1;







let ListSelectComponent = ListSelectComponent_1 = class ListSelectComponent extends _shared_ts_utility__WEBPACK_IMPORTED_MODULE_2__.BaseControlValueAccessorComponent {
    onChange(answer, isSelected) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const currentValue = [...(yield this.value$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1)).toPromise())];
            let newValue;
            if (currentValue.includes(answer) && !isSelected) {
                newValue = currentValue.filter(value => value !== answer);
            }
            else if (!currentValue.includes(answer) && isSelected) {
                newValue = [
                    ...currentValue,
                    answer,
                ];
            }
            else {
                return;
            }
            this.setViewValue(newValue);
        });
    }
};
ListSelectComponent.propDecorators = {
    allAvailableOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    label: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
ListSelectComponent = ListSelectComponent_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-list-select',
        template: _list_select_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NG_VALUE_ACCESSOR,
                useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.forwardRef)(() => ListSelectComponent_1),
                multi: true,
            },
        ],
        styles: [_list_select_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ListSelectComponent);



/***/ }),

/***/ 62333:
/*!****************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-settings.page/exercise-settings.page.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseSettingsPage": () => (/* binding */ ExerciseSettingsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _exercise_settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercise-settings.page.html?ngResource */ 44443);
/* harmony import */ var _exercise_settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exercise-settings.page.scss?ngResource */ 70623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/reactive-forms */ 91063);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/animations */ 73510);








let ExerciseSettingsPage = class ExerciseSettingsPage {
    constructor(_modalController) {
        this._modalController = _modalController;
        this.generalFormGroup = new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup({
            playCadenceOptions: new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl('ALWAYS'),
            // playCadenceEvery: new FormControl(5),
            adaptive: new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(false),
            bpm: new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(120),
            moveToNextQuestionAutomatically: new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(false),
        });
    }
    set currentGlobalSettings(currentSettings) {
        this.generalFormGroup.reset({
            playCadenceOptions: (() => {
                switch (currentSettings.playCadence) {
                    case true:
                        return 'ALWAYS';
                    case false:
                        return 'NEVER';
                    case 'ONLY_ON_REPEAT':
                        return 'ONLY_ON_REPEAT';
                    // TODO(OE-12)
                    // case 'EVERY_NEW_KEY':
                    //   return 'EVERY_NEW_KEY';
                    default:
                        return 'ALWAYS';
                }
            })(),
            adaptive: currentSettings.adaptive,
            bpm: currentSettings.bpm,
            moveToNextQuestionAutomatically: currentSettings.moveToNextQuestionAutomatically,
        });
    }
    set currentExerciseSettings(currentSettings) {
        this.exerciseFormGroup.reset(currentSettings);
    }
    set exerciseSettingsDescriptorInput(settingsDescriptor) {
        this.exerciseSettingsDescriptor = settingsDescriptor;
        const controls = {};
        for (let settingsControlDescriptor of settingsDescriptor) {
            controls[settingsControlDescriptor.key] = new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
        }
        this.exerciseFormGroup = new _shared_reactive_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup(controls);
    }
    onClose() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const newGlobalSettings = this._getNewSettings();
            const exerciseSettingsData = {
                globalSettings: newGlobalSettings,
                exerciseSettings: this.exerciseFormGroup.getRawValue(),
            };
            return exerciseSettingsData;
        });
    }
    _getNewSettings() {
        const formGroupValue = this.generalFormGroup.getRawValue();
        return {
            playCadence: (() => {
                const valueMapping = {
                    // EVERY_NEW_KEY: 'EVERY_NEW_KEY', // TODO(OE-12)
                    ALWAYS: true,
                    NEVER: false,
                    ONLY_ON_REPEAT: 'ONLY_ON_REPEAT',
                };
                return valueMapping[formGroupValue.playCadenceOptions];
            })(),
            adaptive: formGroupValue.adaptive,
            bpm: formGroupValue.bpm,
            moveToNextQuestionAutomatically: formGroupValue.moveToNextQuestionAutomatically,
        };
    }
    isShowExerciseControl(controlDescriptor) {
        return lodash__WEBPACK_IMPORTED_MODULE_3__.isNil(controlDescriptor.show) ? true : controlDescriptor.show(this.exerciseFormGroup.value);
    }
};
ExerciseSettingsPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController }
];
ExerciseSettingsPage.propDecorators = {
    exerciseName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    currentGlobalSettings: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    currentExerciseSettings: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    allAvailableAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    exerciseSettingsDescriptorInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input, args: ['exerciseSettingsDescriptor',] }]
};
ExerciseSettingsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-exercise-settings.page',
        template: _exercise_settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        animations: [
            _shared_animations__WEBPACK_IMPORTED_MODULE_4__.collapseVertical,
        ],
        styles: [_exercise_settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ExerciseSettingsPage);



/***/ }),

/***/ 21431:
/*!*********************************************************!*\
  !*** ./src/app/exercise/exercise.page/exercise.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExercisePage": () => (/* binding */ ExercisePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _exercise_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercise.page.html?ngResource */ 45722);
/* harmony import */ var _exercise_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exercise.page.scss?ngResource */ 65102);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_exercise_state_exercise_state_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/exercise-state/exercise-state.service */ 56492);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _components_exercise_settings_page_exercise_settings_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/exercise-settings.page/exercise-settings.page */ 62333);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _services_exercise_explanation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/exercise-explanation.service */ 70226);
/* harmony import */ var _Exercise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Exercise */ 51254);










let ExercisePage = class ExercisePage {
    constructor(state, exerciseExplanation, _modalController) {
        this.state = state;
        this.exerciseExplanation = exerciseExplanation;
        this._modalController = _modalController;
        this.isAutoLayout = Array.isArray(this.state.answerList);
        this.wrongAnswers = [];
        this.rightAnswer = null;
        this.normalizeAnswerLayoutCellConfig = _Exercise__WEBPACK_IMPORTED_MODULE_6__.Exercise.normalizeAnswerLayoutCellConfig;
        this._init();
    }
    get isQuestionCompleted() {
        var _a;
        return !!((_a = this.state.currentAnswers[this.state.currentAnswers.length - 1]) === null || _a === void 0 ? void 0 : _a.answer);
    }
    get correctAnswersPercentage() {
        if (!this.state.totalQuestions) {
            return 0;
        }
        return (this.state.totalCorrectAnswers / this.state.totalQuestions) * 100;
    }
    onAnswer(answer) {
        if (this.isQuestionCompleted) {
            // TODO(OE-8) - play the clicked answer
            return;
        }
        const isRight = this.state.answer(answer);
        if (isRight) {
            this.rightAnswer = answer;
            setTimeout(() => {
                this.rightAnswer = null;
            }, 100);
            this.wrongAnswers = [];
        }
        else {
            this.wrongAnswers.push(answer);
        }
    }
    editSettings() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const allAvailableAnswers = typeof this.state.answerList === 'object' ? lodash__WEBPACK_IMPORTED_MODULE_4__.flatMap(this.state.answerList) : this.state.answerList;
            const modal = yield this._modalController.create({
                component: _components_exercise_settings_page_exercise_settings_page__WEBPACK_IMPORTED_MODULE_3__.ExerciseSettingsPage,
                componentProps: {
                    exerciseName: this.state.name,
                    currentGlobalSettings: this.state.globalSettings,
                    exerciseSettingsDescriptorInput: this.state.exerciseSettingsDescriptor,
                    currentExerciseSettings: this.state.exerciseSettings,
                    allAvailableAnswers: allAvailableAnswers,
                }
            });
            yield modal.present();
            this.state.updateSettings((yield modal.onDidDismiss()).data);
        });
    }
    _init() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            yield this.exerciseExplanation.init();
            yield this.state.init();
        });
    }
};
ExercisePage.ctorParameters = () => [
    { type: _services_exercise_state_exercise_state_service__WEBPACK_IMPORTED_MODULE_2__.ExerciseStateService },
    { type: _services_exercise_explanation_service__WEBPACK_IMPORTED_MODULE_5__.ExerciseExplanationService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController }
];
ExercisePage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-exercise-page',
        template: _exercise_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        providers: [
            _services_exercise_state_exercise_state_service__WEBPACK_IMPORTED_MODULE_2__.ExerciseStateService,
            _services_exercise_explanation_service__WEBPACK_IMPORTED_MODULE_5__.ExerciseExplanationService,
        ],
        styles: [_exercise_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ExercisePage);



/***/ }),

/***/ 70226:
/*!*******************************************************************!*\
  !*** ./src/app/exercise/services/exercise-explanation.service.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseExplanationService": () => (/* binding */ ExerciseExplanationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _exercise_state_exercise_state_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exercise-state/exercise-state.service */ 56492);
/* harmony import */ var _exercise_page_components_exercise_help_exercise_explanation_exercise_explanation_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page */ 21665);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _services_exercise_settings_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/exercise-settings-data.service */ 42313);






let ExerciseExplanationService = class ExerciseExplanationService {
    constructor(_state, _modalController, _exerciseSettingsData) {
        this._state = _state;
        this._modalController = _modalController;
        this._exerciseSettingsData = _exerciseSettingsData;
    }
    openExplanation() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this._modalController.create({
                component: _exercise_page_components_exercise_help_exercise_explanation_exercise_explanation_page__WEBPACK_IMPORTED_MODULE_1__.ExerciseExplanationPage,
                componentProps: {
                    content: this._state.exercise.explanation,
                    exerciseName: this._state.name,
                }
            });
            yield modal.present();
            yield modal.onDidDismiss();
        });
    }
    init() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const exerciseSettings = yield this._exerciseSettingsData.getExerciseSettings(this._state.exercise.id);
            if (this._state.exercise.explanation && !(exerciseSettings === null || exerciseSettings === void 0 ? void 0 : exerciseSettings.wasExplanationDisplayed)) {
                yield this.openExplanation();
                yield this._exerciseSettingsData.saveExerciseSettings(this._state.exercise.id, {
                    wasExplanationDisplayed: true,
                });
            }
        });
    }
};
ExerciseExplanationService.ctorParameters = () => [
    { type: _exercise_state_exercise_state_service__WEBPACK_IMPORTED_MODULE_0__.ExerciseStateService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController },
    { type: _services_exercise_settings_data_service__WEBPACK_IMPORTED_MODULE_2__.ExerciseSettingsDataService }
];
ExerciseExplanationService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)()
], ExerciseExplanationService);



/***/ }),

/***/ 2898:
/*!***********************************************************************!*\
  !*** ./src/app/exercise/services/exercise-state/adaptive-exercise.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdaptiveExercise": () => (/* binding */ AdaptiveExercise)
/* harmony export */ });
/* harmony import */ var heap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap-js */ 97901);

class AdaptiveExercise {
    constructor(_exercise) {
        this._exercise = _exercise;
        this.summary = this._exercise.summary;
        this.id = this._exercise.id;
        this.name = this._exercise.name;
        this.explanation = this._exercise.explanation;
        this.settingsDescriptor = this._exercise.settingsDescriptor;
        this._lastQuestion = null;
        this._wrongQuestionsHeap = new heap_js__WEBPACK_IMPORTED_MODULE_0__["default"]((a, b) => a.timeToReAsk - b.timeToReAsk);
        this._questionIndex = -1;
    }
    updateSettings(settings) {
        var _a, _b;
        (_b = (_a = this._exercise).updateSettings) === null || _b === void 0 ? void 0 : _b.call(_a, settings);
    }
    getCurrentSettings() {
        var _a, _b;
        return (_b = (_a = this._exercise).getCurrentSettings) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    getAnswerList() {
        return this._exercise.getAnswerList();
    }
    getQuestion() {
        this._questionIndex++;
        if (!!this._lastQuestion) {
            throw new Error(`New getQuestion was called but previous answer not reported`);
        }
        const nextQuestionToRepeat = this._wrongQuestionsHeap.peek();
        if (nextQuestionToRepeat && nextQuestionToRepeat.timeToReAsk <= this._questionIndex) {
            this._lastQuestion = this._wrongQuestionsHeap.pop();
        }
        else {
            this._lastQuestion = {
                question: this._exercise.getQuestion(),
            };
        }
        return this._lastQuestion.question;
    }
    reportAnswerCorrectness(wasAnswerRight) {
        var _a;
        if (wasAnswerRight === 'SKIPPED') {
            this._lastQuestion = null;
            return;
        }
        if (!this._lastQuestion) {
            throw new Error(`Can't report answer for a question that was never asked`);
        }
        if (wasAnswerRight && !!((_a = this._lastQuestion) === null || _a === void 0 ? void 0 : _a.timeToReAsk) && this._lastQuestion.timeToReAsk < Math.pow(2, 3)) {
            this._wrongQuestionsHeap.push({
                question: this._lastQuestion.question,
                timeToReAsk: this._questionIndex + Math.pow(2, (this._lastQuestion.timesAnsweredCorrectly + 1)),
                timesAnsweredCorrectly: this._lastQuestion.timesAnsweredCorrectly + 1,
            });
        }
        else if (!wasAnswerRight) {
            this._wrongQuestionsHeap.push({
                question: this._lastQuestion.question,
                timeToReAsk: this._questionIndex + 2,
                timesAnsweredCorrectly: 1,
            });
        }
        this._lastQuestion = null;
    }
    reset() {
        this._wrongQuestionsHeap.clear();
    }
}


/***/ }),

/***/ 56492:
/*!****************************************************************************!*\
  !*** ./src/app/exercise/services/exercise-state/exercise-state.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseStateService": () => (/* binding */ ExerciseStateService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _exercise_exercise_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../exercise/exercise.service */ 70174);
/* harmony import */ var _services_player_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/player.service */ 94115);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utility */ 98979);
/* harmony import */ var _services_exercise_settings_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/exercise-settings-data.service */ 42313);
/* harmony import */ var _adaptive_exercise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./adaptive-exercise */ 2898);








const DEFAULT_EXERCISE_SETTINGS = {
    playCadence: true,
    adaptive: false,
    bpm: 120,
    moveToNextQuestionAutomatically: false,
};
let ExerciseStateService = class ExerciseStateService {
    constructor(_activatedRoute, _exerciseService, _player, _exerciseSettingsData) {
        this._activatedRoute = _activatedRoute;
        this._exerciseService = _exerciseService;
        this._player = _player;
        this._exerciseSettingsData = _exerciseSettingsData;
        this._originalExercise = this._exerciseService.getExercise(this._activatedRoute.snapshot.paramMap.get('id'));
        this._globalSettings = DEFAULT_EXERCISE_SETTINGS;
        this.name = this.exercise.name;
        this.answerList = this.exercise.getAnswerList();
        this._adaptiveExercise = new _adaptive_exercise__WEBPACK_IMPORTED_MODULE_4__.AdaptiveExercise(this._originalExercise);
        this._currentQuestion = this.exercise.getQuestion();
        this._currentSegmentToAnswer = 0;
        this._totalCorrectAnswers = 0;
        this._totalQuestions = 0;
        this._currentAnswers = [];
        this._currentlyPlayingSegment = null;
        this._highlightedAnswer = null;
    }
    get globalSettings() {
        return this._globalSettings;
    }
    get totalCorrectAnswers() {
        return this._totalCorrectAnswers;
    }
    get totalQuestions() {
        return this._totalQuestions;
    }
    get currentAnswers() {
        return this._currentAnswers;
    }
    get currentlyPlayingSegment() {
        return this._currentlyPlayingSegment;
    }
    get highlightedAnswer() {
        return this._highlightedAnswer;
    }
    get hasCadence() {
        return !!this._currentQuestion.cadence;
    }
    get exerciseSettingsDescriptor() {
        const settingsDescriptor = this.exercise.settingsDescriptor;
        return settingsDescriptor || [];
    }
    get exerciseSettings() {
        var _a, _b;
        return ((_b = (_a = this.exercise).getCurrentSettings) === null || _b === void 0 ? void 0 : _b.call(_a)) || {};
    }
    get _areAllSegmentsAnswered() {
        return !this._currentAnswers.filter(answer => answer.answer === null).length;
    }
    get exercise() {
        return this._globalSettings.adaptive ? this._adaptiveExercise : this._originalExercise;
    }
    answer(answer) {
        const isRight = this._currentQuestion.segments[this._currentSegmentToAnswer].rightAnswer === answer;
        if (!isRight) {
            this._currentAnswers[this._currentSegmentToAnswer].wasWrong = true;
        }
        else {
            this._totalQuestions++;
            if (!this._currentAnswers[this._currentSegmentToAnswer].wasWrong) {
                this._totalCorrectAnswers++;
            }
            this._currentAnswers[this._currentSegmentToAnswer].answer = answer;
            this._currentSegmentToAnswer++;
            // Last segment was answered
            if (this._currentSegmentToAnswer === this._currentQuestion.segments.length) {
                // if not all answers are correct
                if (this._globalSettings.adaptive) {
                    const areAllSegmentsCorrect = !this._currentAnswers.filter(answerSegment => answerSegment.wasWrong).length;
                    this._adaptiveExercise.reportAnswerCorrectness(areAllSegmentsCorrect);
                }
                this._afterCorrectAnswer()
                    .then(() => {
                    if (this._globalSettings.moveToNextQuestionAutomatically) {
                        // Make sure we are still in the same question (i.e. "Next" wasn't clicked by user)
                        const numberOfAnsweredSegments = this._currentAnswers.filter(answer => !!answer.answer).length;
                        if (numberOfAnsweredSegments === this._currentQuestion.segments.length) {
                            this.nextQuestion();
                        }
                    }
                });
            }
        }
        return isRight;
    }
    playCurrentCadenceAndQuestion() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const partsToPlay = this._getCurrentQuestionPartsToPlay();
            if (this._currentQuestion.cadence && this._globalSettings.playCadence) {
                partsToPlay.unshift({
                    partOrTime: (0,_utility__WEBPACK_IMPORTED_MODULE_2__.toSteadyPart)(this._currentQuestion.cadence),
                    bpm: 120,
                }, {
                    partOrTime: 100,
                });
            }
            if (this._areAllSegmentsAnswered && this._currentQuestion.afterCorrectAnswer) {
                partsToPlay.push(...this._getAfterCorrectAnswerParts());
            }
            yield this._player.playMultipleParts(partsToPlay);
            this._currentlyPlayingSegment = null;
        });
    }
    playCurrentQuestion() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            yield this._player.playMultipleParts(this._getCurrentQuestionPartsToPlay());
            this._currentlyPlayingSegment = null;
        });
    }
    nextQuestion() {
        // if still unanswered questions
        if (this._globalSettings.adaptive && !!this._currentQuestion && !this._areAllSegmentsAnswered) {
            try {
                this._adaptiveExercise.reportAnswerCorrectness(true); // reporting true to ignore it in the future
            }
            catch (e) { }
        }
        this._currentQuestion = this.exercise.getQuestion();
        this._currentAnswers = this._currentQuestion.segments.map(() => ({
            wasWrong: false,
            answer: null,
        }));
        this._currentSegmentToAnswer = 0;
        if (this.globalSettings.playCadence === 'ONLY_ON_REPEAT') {
            return this.playCurrentQuestion();
        }
        else {
            return this.playCurrentCadenceAndQuestion();
        }
    }
    updateSettings(settings) {
        this._exerciseSettingsData.saveExerciseSettings(this.exercise.id, settings);
        this._globalSettings = settings.globalSettings;
        this._player.setBpm(this._globalSettings.bpm);
        this._updateExerciseSettings(settings.exerciseSettings);
        this.nextQuestion();
    }
    init() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const settings = yield this._exerciseSettingsData.getExerciseSettings(this.exercise.id);
            if (settings === null || settings === void 0 ? void 0 : settings.globalSettings) {
                this._globalSettings = settings.globalSettings;
            }
            if (settings === null || settings === void 0 ? void 0 : settings.exerciseSettings) {
                this._updateExerciseSettings(settings.exerciseSettings);
            }
            yield this.nextQuestion();
        });
    }
    _getCurrentQuestionPartsToPlay() {
        return this._currentQuestion.segments.map((segment, i) => ({
            partOrTime: (0,_utility__WEBPACK_IMPORTED_MODULE_2__.toSteadyPart)(segment.partToPlay),
            beforePlaying: () => {
                this._currentlyPlayingSegment = i;
            },
        }));
    }
    _updateExerciseSettings(exerciseSettings) {
        if (!this.exercise.updateSettings) {
            return;
        }
        this.exercise.updateSettings(exerciseSettings);
        this.answerList = this.exercise.getAnswerList();
        this._adaptiveExercise.reset();
    }
    _getAfterCorrectAnswerParts() {
        if (!this._currentQuestion.afterCorrectAnswer) {
            return [];
        }
        return this._currentQuestion.afterCorrectAnswer.map(({ partToPlay, answerToHighlight, }) => ({
            beforePlaying: () => {
                this._highlightedAnswer = answerToHighlight || null;
            },
            partOrTime: partToPlay,
        }));
    }
    _afterCorrectAnswer() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            if (!this._currentQuestion.afterCorrectAnswer) {
                return;
            }
            yield this._player.playMultipleParts(this._getAfterCorrectAnswerParts());
            this._highlightedAnswer = null;
        });
    }
};
ExerciseStateService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _exercise_exercise_service__WEBPACK_IMPORTED_MODULE_0__.ExerciseService },
    { type: _services_player_service__WEBPACK_IMPORTED_MODULE_1__.PlayerService },
    { type: _services_exercise_settings_data_service__WEBPACK_IMPORTED_MODULE_3__.ExerciseSettingsDataService }
];
ExerciseStateService = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)()
], ExerciseStateService);



/***/ }),

/***/ 42313:
/*!************************************************************!*\
  !*** ./src/app/services/exercise-settings-data.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExerciseSettingsDataService": () => (/* binding */ ExerciseSettingsDataService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _storage_storage_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../storage/storage.service */ 46607);



let ExerciseSettingsDataService = class ExerciseSettingsDataService {
    constructor(_storageService) {
        this._storageService = _storageService;
        this._exerciseSettingsKey = 'exerciseSettings';
    }
    saveExerciseSettings(exerciseId, settings) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const currentExercisesSettings = (yield this._storageService.get(this._exerciseSettingsKey)) || {};
            currentExercisesSettings[exerciseId] = Object.assign(Object.assign({}, currentExercisesSettings[exerciseId]), settings);
            yield this._storageService.set(this._exerciseSettingsKey, currentExercisesSettings);
        });
    }
    getExerciseSettings(exerciseId) {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            return (_a = (yield this._storageService.get(this._exerciseSettingsKey))) === null || _a === void 0 ? void 0 : _a[exerciseId];
        });
    }
};
ExerciseSettingsDataService.ctorParameters = () => [
    { type: _storage_storage_service__WEBPACK_IMPORTED_MODULE_0__.StorageService }
];
ExerciseSettingsDataService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root',
    })
], ExerciseSettingsDataService);



/***/ }),

/***/ 8931:
/*!*******************************************************************************************!*\
  !*** ./src/app/shared/ng-utilities/console-log-component/console-log-component.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleLogComponentModule": () => (/* binding */ ConsoleLogComponentModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _console_log_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./console-log.component */ 47945);




let ConsoleLogComponentModule = class ConsoleLogComponentModule {
};
ConsoleLogComponentModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [
            _console_log_component__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogComponent,
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule
        ],
        exports: [
            _console_log_component__WEBPACK_IMPORTED_MODULE_0__.ConsoleLogComponent,
        ]
    })
], ConsoleLogComponentModule);



/***/ }),

/***/ 47945:
/*!************************************************************************************!*\
  !*** ./src/app/shared/ng-utilities/console-log-component/console-log.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleLogComponent": () => (/* binding */ ConsoleLogComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);


/**
 * For debugging purposes only
 * */
let ConsoleLogComponent = class ConsoleLogComponent {
    constructor() {
    }
    set message(msg) {
        console.log(msg);
    }
};
ConsoleLogComponent.ctorParameters = () => [];
ConsoleLogComponent.propDecorators = {
    message: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input, args: ['message',] }]
};
ConsoleLogComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component)({
        selector: 'app-console-log',
        template: '',
    })
], ConsoleLogComponent);



/***/ }),

/***/ 92566:
/*!******************************************************************************!*\
  !*** ./src/app/shared/ng-utilities/pure-function-pipe/pure-function.pipe.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PureFunctionPipe": () => (/* binding */ PureFunctionPipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


let PureFunctionPipe = class PureFunctionPipe {
    transform(pureFunction, ...functionArgs) {
        return pureFunction(...functionArgs);
    }
};
PureFunctionPipe = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Pipe)({
        name: 'pureFunction',
        pure: true,
    })
], PureFunctionPipe);



/***/ }),

/***/ 71953:
/*!***************************************************************!*\
  !*** ./src/app/shared/reactive-forms/ControlValueAccessor.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlValueAccessor": () => (/* binding */ ControlValueAccessor)
/* harmony export */ });
class ControlValueAccessor {
    constructor() {
        this.onChange = (value) => { };
        this.onTouched = () => { };
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}


/***/ }),

/***/ 57603:
/*!**********************************************************!*\
  !*** ./src/app/shared/reactive-forms/control-methods.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlMethods": () => (/* binding */ ControlMethods)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 88623);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 64139);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 19193);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 86942);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 85921);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ts_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ts-utility */ 40352);






function getControlValue(control) {
    if (control.getRawValue) {
        return control.getRawValue();
    }
    return control.value;
}
function getTakeUntilWasNotProvidedError(functionName) {
    return new Error(`${functionName} was called but takeUntil$ was not provided. Please add a takeUntil$ Observable that completes to the control options when creating to avoid memory leak.`);
}
class ControlMethods {
    static getValueStream(control) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.defer)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(getControlValue(control))), control.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => getControlValue(control)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)()));
    }
    static getErrorStream(control, setErrorsWasCalled$) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.defer)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(control.errors)), setErrorsWasCalled$, control.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => control.errors), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)((a, b) => lodash__WEBPACK_IMPORTED_MODULE_0__.isEqual(a, b))))
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
    static getIsValidAndDirtyStream(control) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([
            control.isValid$,
            control.isDirty$,
        ])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(conditions => lodash__WEBPACK_IMPORTED_MODULE_0__.every(conditions)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
    static getStatusStream(control) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.defer)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(control.status)), control.statusChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => control.status), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)()));
    }
    static getIsEnabledStream(control) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.defer)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(control.enabled)), control.statusChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => control.enabled), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)()));
    }
    static getIsDisabledStream(control) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.defer)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(control.disabled)), control.statusChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => control.disabled), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)()));
    }
    static setIsEnabled(control, enabled, opts) {
        if (enabled === control.enabled) {
            return;
        }
        if (enabled) {
            control.enable(opts);
        }
        else {
            control.disable(opts);
        }
    }
    static setIsDisabled(control, disabled, opts) {
        ControlMethods.setIsEnabled(control, !disabled, opts);
    }
    static setErrors(control, getErrorSubject, errors, opts = {}) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.AbstractControl.prototype.setErrors.bind(control)(errors, opts);
            // super.setErrors(errors, opts);
            // in case of async validation - setErrors might be called before the properties of this class
            // are initialized
            if (!getErrorSubject()) {
                yield (0,_ts_utility__WEBPACK_IMPORTED_MODULE_1__.timeoutAsPromise)();
            }
            // make sure that the errors we update on the subject is equal to the errors argument we got
            // to avoid clashing with parallel calls to setErrors
            if (control.errors === errors) {
                getErrorSubject()
                    .next(errors);
            }
        });
    }
    static disableWhile(control, isDisabled$, controlOptions, updateOptions) {
        const takeUntil$ = (controlOptions === null || controlOptions === void 0 ? void 0 : controlOptions.takeUntil$) || (updateOptions === null || updateOptions === void 0 ? void 0 : updateOptions.takeUntil$);
        if (!takeUntil$) {
            throw getTakeUntilWasNotProvidedError(`disableWhile`);
        }
        return isDisabled$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.takeUntil)(takeUntil$))
            .subscribe(isDisabled => ControlMethods.setIsDisabled(control, isDisabled, updateOptions));
    }
    static enableWhile(control, isEnabled$, opts) {
        return isEnabled$.subscribe(isEnabled => ControlMethods.setIsEnabled(control, isEnabled, opts));
    }
    static hasError(control, error, path) {
        return control.hasError(error, !path || path.length === 0 ? undefined : path);
    }
    static hasErrorAndDirty(control, error, path) {
        return control.dirty && ControlMethods.hasError(control, error, path);
    }
    static getIsValidStream(control) {
        return control.status$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => control.valid), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
    static getIsInvalidStream(control) {
        return control.status$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(() => control.invalid), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
    static getErrorRefListStream(control, errorMsgMap) {
        return control.errors$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((errors) => {
            return lodash__WEBPACK_IMPORTED_MODULE_0__.map(errors, (errorData, errorKey) => {
                return {
                    code: errorKey,
                    data: errorData,
                    msg: (errorMsgMap === null || errorMsgMap === void 0 ? void 0 : errorMsgMap[errorKey]) !== undefined ? typeof errorMsgMap[errorKey] === 'string' ? errorMsgMap[errorKey] : errorMsgMap[errorKey](errorData) : 'Unknown error',
                };
            });
        }));
    }
    static getFirstErrorMsgStream(control) {
        return control.errorRefList$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(errorRefList => { var _a, _b; return (_b = (_a = errorRefList[0]) === null || _a === void 0 ? void 0 : _a.msg) !== null && _b !== void 0 ? _b : null; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
    static getAggregatedErrorRefListStream(control) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)([
            control.errorRefList$,
            ...lodash__WEBPACK_IMPORTED_MODULE_0__.map(control.controls, (ctrl) => ctrl.aggregatedErrorRefList$ || ctrl.errorRefList$),
        ])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((errorRefList) => {
            return lodash__WEBPACK_IMPORTED_MODULE_0__.flatMap(errorRefList);
        }));
    }
    static getFirstAggregatedErrorMsgStream(control) {
        return control.aggregatedErrorRefList$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(aggregatedErrorRefList => { var _a, _b; return (_b = (_a = aggregatedErrorRefList[0]) === null || _a === void 0 ? void 0 : _a.msg) !== null && _b !== void 0 ? _b : null; }));
    }
    static getDisabledReasonList(control, disabledReasonConfigList) {
        if (!disabledReasonConfigList) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)([]);
        }
        const disabledReasonList$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.combineLatest)(lodash__WEBPACK_IMPORTED_MODULE_0__.map((0,_ts_utility__WEBPACK_IMPORTED_MODULE_1__.toArray)(disabledReasonConfigList), disabledReason$ => disabledReason$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(disabledReason => disabledReason !== false ? disabledReason : null))))
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((disabledReasonList) => lodash__WEBPACK_IMPORTED_MODULE_0__.filter(disabledReasonList, _ts_utility__WEBPACK_IMPORTED_MODULE_1__.isValueTruthy)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.startWith)([]), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
        control.disableWhile(disabledReasonList$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(reasonList => !lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty(reasonList))));
        return disabledReasonList$;
    }
    static getFirstDisabledReasonStream(control) {
        return control.disabledReasonList$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(disabledReasonList => { var _a; return (_a = disabledReasonList === null || disabledReasonList === void 0 ? void 0 : disabledReasonList[0]) !== null && _a !== void 0 ? _a : null; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
    }
    static getOptions(validatorOrOpts) {
        if (!!validatorOrOpts && typeof validatorOrOpts === 'object' && !Array.isArray(validatorOrOpts)) {
            return validatorOrOpts;
        }
        return undefined;
    }
    static getBaseConstructorSecondParam(validatorOrOpts) {
        var _a, _b;
        if (!!validatorOrOpts && typeof validatorOrOpts === 'object' && !Array.isArray(validatorOrOpts)) {
            return {
                validators: ((_a = validatorOrOpts) === null || _a === void 0 ? void 0 : _a.validators) || undefined,
                asyncValidators: ((_b = validatorOrOpts) === null || _b === void 0 ? void 0 : _b.asyncValidators) || undefined,
            };
        }
        return validatorOrOpts || null;
    }
}


/***/ }),

/***/ 62300:
/*!****************************************************!*\
  !*** ./src/app/shared/reactive-forms/formArray.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormArray": () => (/* binding */ FormArray)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var _control_methods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control-methods */ 57603);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);






class FormArray extends _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormArray {
    constructor(controls, _validatorOrOpts, asyncValidator) {
        var _a, _b;
        super(controls, _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getBaseConstructorSecondParam(_validatorOrOpts), asyncValidator);
        this._validatorOrOpts = _validatorOrOpts;
        this._touchChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this._dirtyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this._errorsSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this._options = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getOptions(this._validatorOrOpts);
        this.isTouched$ = this._touchChanges$.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this.touched), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)());
        this.isDirty$ = this._dirtyChanges$.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this.dirty), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)());
        this.value$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getValueStream(this);
        this.isDisabled$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsDisabledStream(this);
        this.isEnabled$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsEnabledStream(this);
        this.status$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getStatusStream(this);
        this.errors$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getErrorStream(this, this._errorsSubject$.asObservable());
        this.errorRefList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getErrorRefListStream(this, (_a = this._options) === null || _a === void 0 ? void 0 : _a.errorMsgMap);
        this.firstErrorMsg$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstErrorMsgStream(this);
        this.aggregatedErrorRefList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getAggregatedErrorRefListStream(this);
        this.firstAggregatedErrorMsg$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstAggregatedErrorMsgStream(this);
        this.disabledReasonList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getDisabledReasonList(this, (_b = this._options) === null || _b === void 0 ? void 0 : _b.disabledReason$List);
        this.firstDisabledReason$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstDisabledReasonStream(this);
        this.isValid$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsValidStream(this);
        this.isValidAndDirty$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsValidAndDirtyStream(this);
        this.isInvalid$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsInvalidStream(this);
    }
    get asyncValidator() {
        return super.asyncValidator;
    }
    set asyncValidator(asyncValidator) {
        super.asyncValidator = asyncValidator;
    }
    get validator() {
        return super.validator;
    }
    set validator(validator) {
        super.validator = validator;
    }
    get parent() {
        return super.parent;
    }
    _setControlsFromValue(value) {
        var _a;
        const currentControlsLength = this.controls.length;
        const newControlsLength = (value || []).length;
        const controlLengthDiff = currentControlsLength - newControlsLength;
        if (controlLengthDiff > 0) {
            lodash__WEBPACK_IMPORTED_MODULE_1__.times(controlLengthDiff, () => {
                this.removeAt(0);
            });
        }
        else if (controlLengthDiff < 0) {
            let controlsToAdd = -controlLengthDiff;
            const controlFactory = (_a = this._options) === null || _a === void 0 ? void 0 : _a.controlFactory;
            if (controlFactory) {
                while (controlsToAdd) {
                    const valueIndex = newControlsLength - controlsToAdd;
                    controlsToAdd--;
                    this.push(controlFactory(value[valueIndex]));
                }
            }
            else {
                throw new Error(`controlFactory was not provided`);
            }
        }
    }
    getRawValue() {
        return super.getRawValue();
    }
    at(index) {
        return super.at(index);
    }
    setValue(value, options) {
        try {
            this._setControlsFromValue(value);
        }
        catch (e) {
            throw new Error(`FormArray#setValue: ${e.message}`);
        }
        super.setValue(value, options);
    }
    /**
     * @deprecated
     * Preffered to use setValue instead as patchValue delivers unexpected results
     * */
    patchValue(value, options) {
        super.patchValue(value, options);
    }
    push(control) {
        return super.push(control);
    }
    pushValue(value) {
        var _a;
        if (!((_a = this._options) === null || _a === void 0 ? void 0 : _a.controlFactory)) {
            throw new Error(`FormArray#pushValue: controlFactory was not provided`);
        }
        const control = this._options.controlFactory(value);
        control.reset(value);
        this.push(control);
    }
    insert(index, control) {
        return super.insert(index, control);
    }
    setControl(index, control) {
        return super.setControl(index, control);
    }
    /**
     * To use this function you must supply takeUntil$ in the constructor options
     * */
    disableWhile(observable, options) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.disableWhile(this, observable, this._options, options);
    }
    markAsTouched(opts) {
        super.markAsTouched(opts);
        this._touchChanges$.next(true);
    }
    markAsUntouched(opts) {
        super.markAsUntouched(opts);
        this._touchChanges$.next(false);
    }
    markAsPristine(opts) {
        super.markAsPristine(opts);
        this._dirtyChanges$.next(false);
    }
    markAsDirty(opts) {
        super.markAsDirty(opts);
        this._dirtyChanges$.next(true);
    }
    reset(value, options) {
        try {
            this._setControlsFromValue(value);
        }
        catch (e) {
            throw new Error(`FormArray#reset: ${e.message}`);
        }
        super.reset(value, options);
    }
    setValidators(newValidator) {
        super.setValidators(newValidator);
        super.updateValueAndValidity();
    }
    setAsyncValidators(newValidator) {
        super.setAsyncValidators(newValidator);
        super.updateValueAndValidity();
    }
    hasError(errorCode, path) {
        return super.hasError(errorCode, path);
    }
    setErrors(errors, opts = {}) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            yield _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setErrors(this, () => {
                return this._errorsSubject$;
            }, errors, opts);
        });
    }
    getError(errorCode, path) {
        return super.getError(errorCode, path);
    }
    hasErrorAndDirty(errorCode, path) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.hasErrorAndDirty(this, errorCode, path);
    }
    setIsEnabled(enable = true, opts) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setIsEnabled(this, enable, opts);
    }
    setIsDisabled(disable = true, opts) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setIsDisabled(this, disable, opts);
    }
    remove(value) {
        for (let i = this.length - 1; i >= 0; --i) {
            if (this.at(i).value === value) {
                this.removeAt(i);
            }
        }
    }
}


/***/ }),

/***/ 63136:
/*!******************************************************!*\
  !*** ./src/app/shared/reactive-forms/formControl.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormControl": () => (/* binding */ FormControl)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var _control_methods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control-methods */ 57603);





class FormControl extends _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl {
    constructor(formState, _validatorOrOpts, asyncValidator) {
        var _a, _b;
        super(formState, _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getBaseConstructorSecondParam(_validatorOrOpts), asyncValidator);
        this._validatorOrOpts = _validatorOrOpts;
        this._touchChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this._dirtyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this._errorsSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
        this._options = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getOptions(this._validatorOrOpts);
        this.isTouched$ = this._touchChanges$.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.startWith)(this.touched), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)());
        this.isDirty$ = this._dirtyChanges$.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.startWith)(this.dirty), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)());
        this.value$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getValueStream(this);
        this.isDisabled$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsDisabledStream(this);
        this.isEnabled$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsEnabledStream(this);
        this.status$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getStatusStream(this);
        this.errors$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getErrorStream(this, this._errorsSubject$.asObservable());
        this.isValid$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsValidStream(this);
        this.isValidAndDirty$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsValidAndDirtyStream(this);
        this.isInvalid$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsInvalidStream(this);
        this.errorRefList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getErrorRefListStream(this, (_a = this._options) === null || _a === void 0 ? void 0 : _a.errorMsgMap);
        this.firstErrorMsg$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstErrorMsgStream(this);
        this.disabledReasonList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getDisabledReasonList(this, (_b = this._options) === null || _b === void 0 ? void 0 : _b.disabledReason$List);
        this.firstDisabledReason$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstDisabledReasonStream(this);
    }
    get asyncValidator() {
        return super.asyncValidator;
    }
    set asyncValidator(asyncValidator) {
        super.asyncValidator = asyncValidator;
    }
    get validator() {
        return super.validator;
    }
    set validator(validator) {
        super.validator = validator;
    }
    get parent() {
        return super.parent;
    }
    setValue(valueOrObservable, options) {
        super.setValue(valueOrObservable, options);
    }
    patchValue(value, options) {
        super.patchValue(value, options);
    }
    /**
     * To use this function you must supply takeUntil$ in the constructor options
     * */
    disableWhile(observable, options) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.disableWhile(this, observable, this._options, options);
    }
    markAsTouched(opts) {
        super.markAsTouched(opts);
        this._touchChanges$.next(true);
    }
    markAsUntouched(opts) {
        super.markAsUntouched(opts);
        this._touchChanges$.next(false);
    }
    markAsPristine(opts) {
        super.markAsPristine(opts);
        this._dirtyChanges$.next(false);
    }
    markAsDirty(opts) {
        super.markAsDirty(opts);
        this._dirtyChanges$.next(true);
    }
    reset(formState, options) {
        super.reset(formState, options);
    }
    setValidators(newValidator) {
        super.setValidators(newValidator);
        super.updateValueAndValidity();
    }
    setAsyncValidators(newValidator) {
        super.setAsyncValidators(newValidator);
        super.updateValueAndValidity();
    }
    getError(errorCode) {
        return super.getError(errorCode);
    }
    hasError(errorCode) {
        return super.hasError(errorCode);
    }
    setErrors(errors, opts = {}) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            yield _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setErrors(this, () => {
                return this._errorsSubject$;
            }, errors, opts);
        });
    }
    hasErrorAndDirty(error) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.hasErrorAndDirty(this, error);
    }
    setIsEnabled(enable = true, opts) {
        _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setIsEnabled(this, enable, opts);
    }
    setIsDisabled(disable = true, opts) {
        _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setIsDisabled(this, disable, opts);
    }
}


/***/ }),

/***/ 50637:
/*!****************************************************!*\
  !*** ./src/app/shared/reactive-forms/formGroup.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormGroup": () => (/* binding */ FormGroup)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 92218);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 25722);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 53298);
/* harmony import */ var _control_methods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control-methods */ 57603);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 92938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);






class FormGroup extends _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup {
    constructor(controls, _validatorOrOpts, asyncValidator) {
        var _a, _b;
        super(controls, _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getBaseConstructorSecondParam(_validatorOrOpts), asyncValidator || null);
        this._validatorOrOpts = _validatorOrOpts;
        this._touchChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this._dirtyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this._errorsSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this._options = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getOptions(this._validatorOrOpts);
        this.isTouched$ = this._touchChanges$.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this.touched), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)());
        this.isDirty$ = this._dirtyChanges$.asObservable()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.startWith)(this.dirty), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.distinctUntilChanged)());
        this.value$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getValueStream(this);
        this.isDisabled$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsDisabledStream(this);
        this.isEnabled$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsEnabledStream(this);
        this.status$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getStatusStream(this);
        this.errors$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getErrorStream(this, this._errorsSubject$.asObservable());
        this.errorRefList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getErrorRefListStream(this, (_a = this._options) === null || _a === void 0 ? void 0 : _a.errorMsgMap);
        this.firstErrorMsg$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstErrorMsgStream(this);
        this.aggregatedErrorRefList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getAggregatedErrorRefListStream(this);
        this.firstAggregatedErrorMsg$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstAggregatedErrorMsgStream(this);
        this.disabledReasonList$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getDisabledReasonList(this, (_b = this._options) === null || _b === void 0 ? void 0 : _b.disabledReason$List);
        this.firstDisabledReason$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getFirstDisabledReasonStream(this);
        this.isValid$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsValidStream(this);
        this.isValidAndDirty$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsValidAndDirtyStream(this);
        this.isInvalid$ = _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.getIsInvalidStream(this);
    }
    get asyncValidator() {
        return super.asyncValidator;
    }
    set asyncValidator(asyncValidator) {
        super.asyncValidator = asyncValidator;
    }
    get validator() {
        return super.validator;
    }
    set validator(validator) {
        super.validator = validator;
    }
    get parent() {
        return super.parent;
    }
    getRawValue() {
        return super.getRawValue();
    }
    addControl(name, control) {
        super.addControl(name, control);
    }
    removeControl(name) {
        super.removeControl(name);
    }
    contains(controlName) {
        return super.contains(controlName);
    }
    setControl(name, control) {
        super.setControl(name, control);
    }
    setValue(value, options) {
        const normalizedValue = value !== null && value !== void 0 ? value : lodash__WEBPACK_IMPORTED_MODULE_1__.mapValues(this.controls, () => null);
        super.setValue(normalizedValue, options);
    }
    patchValue(valueOrObservable, options) {
        super.patchValue(valueOrObservable, options);
    }
    /**
     * To use this function you must supply takeUntil$ in the constructor options
     * */
    disableWhile(observable, options) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.disableWhile(this, observable, this._options, options);
    }
    markAsTouched(opts) {
        super.markAsTouched(opts);
        this._touchChanges$.next(true);
    }
    markAsUntouched(opts) {
        super.markAsUntouched(opts);
        this._touchChanges$.next(false);
    }
    markAsPristine(opts) {
        super.markAsPristine(opts);
        this._dirtyChanges$.next(false);
    }
    markAsDirty(opts) {
        super.markAsDirty(opts);
        this._dirtyChanges$.next(true);
    }
    reset(formState, options) {
        super.reset(formState, options);
    }
    setValidators(newValidator) {
        super.setValidators(newValidator);
        super.updateValueAndValidity();
    }
    setAsyncValidators(newValidator) {
        super.setAsyncValidators(newValidator);
        super.updateValueAndValidity();
    }
    hasError(errorCode, path) {
        return super.hasError(errorCode, path);
    }
    setErrors(errors, opts = {}) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            yield _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setErrors(this, () => {
                return this._errorsSubject$;
            }, errors, opts);
        });
    }
    getError(errorCode, path) {
        return super.getError(errorCode, path);
    }
    hasErrorAndDirty(error, ...path) {
        return _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.hasErrorAndDirty(this, error, ...path);
    }
    setIsEnabled(enable = true, opts) {
        _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setIsEnabled(this, enable, opts);
    }
    setIsDisabled(disable = true, opts) {
        _control_methods__WEBPACK_IMPORTED_MODULE_0__.ControlMethods.setIsDisabled(this, disable, opts);
    }
}


/***/ }),

/***/ 91063:
/*!************************************************!*\
  !*** ./src/app/shared/reactive-forms/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormControl": () => (/* reexport safe */ _formControl__WEBPACK_IMPORTED_MODULE_0__.FormControl),
/* harmony export */   "FormGroup": () => (/* reexport safe */ _formGroup__WEBPACK_IMPORTED_MODULE_1__.FormGroup),
/* harmony export */   "FormArray": () => (/* reexport safe */ _formArray__WEBPACK_IMPORTED_MODULE_2__.FormArray),
/* harmony export */   "ControlValueAccessor": () => (/* reexport safe */ _ControlValueAccessor__WEBPACK_IMPORTED_MODULE_3__.ControlValueAccessor)
/* harmony export */ });
/* harmony import */ var _formControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formControl */ 63136);
/* harmony import */ var _formGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formGroup */ 50637);
/* harmony import */ var _formArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formArray */ 62300);
/* harmony import */ var _ControlValueAccessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ControlValueAccessor */ 71953);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ 24019);







/***/ }),

/***/ 24019:
/*!************************************************!*\
  !*** ./src/app/shared/reactive-forms/types.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 97901:
/*!**************************************************!*\
  !*** ./node_modules/heap-js/dist/heap-js.es5.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Heap": () => (/* binding */ Heap),
/* harmony export */   "toInt": () => (/* binding */ toInt)
/* harmony export */ });
var __generator = ( false) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = ( false) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = ( false) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var toInt = function (n) { return ~~n; };
/**
 * Heap
 * @type {Class}
 */
var Heap = /** @class */ (function () {
    /**
     * Heap instance constructor.
     * @param  {Function} compare Optional comparison function, defaults to Heap.minComparator<number>
     */
    function Heap(compare) {
        var _this = this;
        if (compare === void 0) { compare = Heap.minComparator; }
        this.compare = compare;
        this.heapArray = [];
        this._limit = 0;
        /**
         * Alias of add
         */
        this.offer = this.add;
        /**
         * Alias of peek
         */
        this.element = this.peek;
        /**
         * Alias of pop
         */
        this.poll = this.pop;
        /**
         * Returns the inverse to the comparison function.
         * @return {Function}
         */
        this._invertedCompare = function (a, b) {
            return -1 * _this.compare(a, b);
        };
    }
    /*
              Static methods
     */
    /**
     * Gets children indices for given index.
     * @param  {Number} idx     Parent index
     * @return {Array(Number)}  Array of children indices
     */
    Heap.getChildrenIndexOf = function (idx) {
        return [idx * 2 + 1, idx * 2 + 2];
    };
    /**
     * Gets parent index for given index.
     * @param  {Number} idx  Children index
     * @return {Number | undefined}      Parent index, -1 if idx is 0
     */
    Heap.getParentIndexOf = function (idx) {
        if (idx <= 0) {
            return -1;
        }
        var whichChildren = idx % 2 ? 1 : 2;
        return Math.floor((idx - whichChildren) / 2);
    };
    /**
     * Gets sibling index for given index.
     * @param  {Number} idx  Children index
     * @return {Number | undefined}      Sibling index, -1 if idx is 0
     */
    Heap.getSiblingIndexOf = function (idx) {
        if (idx <= 0) {
            return -1;
        }
        var whichChildren = idx % 2 ? 1 : -1;
        return idx + whichChildren;
    };
    /**
     * Min heap comparison function, default.
     * @param  {any} a     First element
     * @param  {any} b     Second element
     * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
     */
    Heap.minComparator = function (a, b) {
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**
     * Max heap comparison function.
     * @param  {any} a     First element
     * @param  {any} b     Second element
     * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
     */
    Heap.maxComparator = function (a, b) {
        if (b > a) {
            return 1;
        }
        else if (b < a) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**
     * Min number heap comparison function, default.
     * @param  {Number} a     First element
     * @param  {Number} b     Second element
     * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
     */
    Heap.minComparatorNumber = function (a, b) {
        return a - b;
    };
    /**
     * Max number heap comparison function.
     * @param  {Number} a     First element
     * @param  {Number} b     Second element
     * @return {Number}    0 if they're equal, positive if `a` goes up, negative if `b` goes up
     */
    Heap.maxComparatorNumber = function (a, b) {
        return b - a;
    };
    /**
     * Default equality function.
     * @param  {any} a    First element
     * @param  {any} b    Second element
     * @return {Boolean}  True if equal, false otherwise
     */
    Heap.defaultIsEqual = function (a, b) {
        return a === b;
    };
    /**
     * Prints a heap.
     * @param  {Heap} heap Heap to be printed
     * @returns {String}
     */
    Heap.print = function (heap) {
        function deep(i) {
            var pi = Heap.getParentIndexOf(i);
            return Math.floor(Math.log2(pi + 1));
        }
        function repeat(str, times) {
            var out = '';
            for (; times > 0; --times) {
                out += str;
            }
            return out;
        }
        var node = 0;
        var lines = [];
        var maxLines = deep(heap.length - 1) + 2;
        var maxLength = 0;
        while (node < heap.length) {
            var i = deep(node) + 1;
            if (node === 0) {
                i = 0;
            }
            // Text representation
            var nodeText = String(heap.get(node));
            if (nodeText.length > maxLength) {
                maxLength = nodeText.length;
            }
            // Add to line
            lines[i] = lines[i] || [];
            lines[i].push(nodeText);
            node += 1;
        }
        return lines
            .map(function (line, i) {
            var times = Math.pow(2, maxLines - i) - 1;
            return (repeat(' ', Math.floor(times / 2) * maxLength) +
                line
                    .map(function (el) {
                    // centered
                    var half = (maxLength - el.length) / 2;
                    return repeat(' ', Math.ceil(half)) + el + repeat(' ', Math.floor(half));
                })
                    .join(repeat(' ', times * maxLength)));
        })
            .join('\n');
    };
    /*
              Python style
     */
    /**
     * Converts an array into an array-heap, in place
     * @param  {Array}    arr      Array to be modified
     * @param  {Function} compare  Optional compare function
     * @return {Heap}              For convenience, it returns a Heap instance
     */
    Heap.heapify = function (arr, compare) {
        var heap = new Heap(compare);
        heap.heapArray = arr;
        heap.init();
        return heap;
    };
    /**
     * Extract the peek of an array-heap
     * @param  {Array}    heapArr  Array to be modified, should be a heap
     * @param  {Function} compare  Optional compare function
     * @return {any}               Returns the extracted peek
     */
    Heap.heappop = function (heapArr, compare) {
        var heap = new Heap(compare);
        heap.heapArray = heapArr;
        return heap.pop();
    };
    /**
     * Pushes a item into an array-heap
     * @param  {Array}    heapArr  Array to be modified, should be a heap
     * @param  {any}      item     Item to push
     * @param  {Function} compare  Optional compare function
     */
    Heap.heappush = function (heapArr, item, compare) {
        var heap = new Heap(compare);
        heap.heapArray = heapArr;
        heap.push(item);
    };
    /**
     * Push followed by pop, faster
     * @param  {Array}    heapArr  Array to be modified, should be a heap
     * @param  {any}      item     Item to push
     * @param  {Function} compare  Optional compare function
     * @return {any}               Returns the extracted peek
     */
    Heap.heappushpop = function (heapArr, item, compare) {
        var heap = new Heap(compare);
        heap.heapArray = heapArr;
        return heap.pushpop(item);
    };
    /**
     * Replace peek with item
     * @param  {Array}    heapArr  Array to be modified, should be a heap
     * @param  {any}      item     Item as replacement
     * @param  {Function} compare  Optional compare function
     * @return {any}               Returns the extracted peek
     */
    Heap.heapreplace = function (heapArr, item, compare) {
        var heap = new Heap(compare);
        heap.heapArray = heapArr;
        return heap.replace(item);
    };
    /**
     * Return the `n` most valuable elements of a heap-like Array
     * @param  {Array}    heapArr  Array, should be an array-heap
     * @param  {number}   n        Max number of elements
     * @param  {Function} compare  Optional compare function
     * @return {any}               Elements
     */
    Heap.heaptop = function (heapArr, n, compare) {
        if (n === void 0) { n = 1; }
        var heap = new Heap(compare);
        heap.heapArray = heapArr;
        return heap.top(n);
    };
    /**
     * Return the `n` least valuable elements of a heap-like Array
     * @param  {Array}    heapArr  Array, should be an array-heap
     * @param  {number}   n        Max number of elements
     * @param  {Function} compare  Optional compare function
     * @return {any}               Elements
     */
    Heap.heapbottom = function (heapArr, n, compare) {
        if (n === void 0) { n = 1; }
        var heap = new Heap(compare);
        heap.heapArray = heapArr;
        return heap.bottom(n);
    };
    /**
     * Return the `n` most valuable elements of an iterable
     * @param  {number}   n        Max number of elements
     * @param  {Iterable} Iterable Iterable list of elements
     * @param  {Function} compare  Optional compare function
     * @return {any}               Elements
     */
    Heap.nlargest = function (n, iterable, compare) {
        var heap = new Heap(compare);
        heap.heapArray = __spreadArray([], __read(iterable));
        heap.init();
        return heap.top(n);
    };
    /**
     * Return the `n` least valuable elements of an iterable
     * @param  {number}   n        Max number of elements
     * @param  {Iterable} Iterable Iterable list of elements
     * @param  {Function} compare  Optional compare function
     * @return {any}               Elements
     */
    Heap.nsmallest = function (n, iterable, compare) {
        var heap = new Heap(compare);
        heap.heapArray = __spreadArray([], __read(iterable));
        heap.init();
        return heap.bottom(n);
    };
    /*
              Instance methods
     */
    /**
     * Adds an element to the heap. Aliases: `offer`.
     * Same as: push(element)
     * @param {any} element Element to be added
     * @return {Boolean} true
     */
    Heap.prototype.add = function (element) {
        this._sortNodeUp(this.heapArray.push(element) - 1);
        this._applyLimit();
        return true;
    };
    /**
     * Adds an array of elements to the heap.
     * Similar as: push(element, element, ...).
     * @param {Array} elements Elements to be added
     * @return {Boolean} true
     */
    Heap.prototype.addAll = function (elements) {
        var _a;
        var i = this.length;
        (_a = this.heapArray).push.apply(_a, __spreadArray([], __read(elements)));
        for (var l = this.length; i < l; ++i) {
            this._sortNodeUp(i);
        }
        this._applyLimit();
        return true;
    };
    /**
     * Return the bottom (lowest value) N elements of the heap.
     *
     * @param  {Number} n  Number of elements.
     * @return {Array}     Array of length <= N.
     */
    Heap.prototype.bottom = function (n) {
        if (n === void 0) { n = 1; }
        if (this.heapArray.length === 0 || n <= 0) {
            // Nothing to do
            return [];
        }
        else if (this.heapArray.length === 1) {
            // Just the peek
            return [this.heapArray[0]];
        }
        else if (n >= this.heapArray.length) {
            // The whole heap
            return __spreadArray([], __read(this.heapArray));
        }
        else {
            // Some elements
            var result = this._bottomN_push(~~n);
            return result;
        }
    };
    /**
     * Check if the heap is sorted, useful for testing purposes.
     * @return {Undefined | Element}  Returns an element if something wrong is found, otherwise it's undefined
     */
    Heap.prototype.check = function () {
        var _this = this;
        return this.heapArray.find(function (el, j) { return !!_this.getChildrenOf(j).find(function (ch) { return _this.compare(el, ch) > 0; }); });
    };
    /**
     * Remove all of the elements from this heap.
     */
    Heap.prototype.clear = function () {
        this.heapArray = [];
    };
    /**
     * Clone this heap
     * @return {Heap}
     */
    Heap.prototype.clone = function () {
        var cloned = new Heap(this.comparator());
        cloned.heapArray = this.toArray();
        cloned._limit = this._limit;
        return cloned;
    };
    /**
     * Returns the comparison function.
     * @return {Function}
     */
    Heap.prototype.comparator = function () {
        return this.compare;
    };
    /**
     * Returns true if this queue contains the specified element.
     * @param  {any}      o   Element to be found
     * @param  {Function} fn  Optional comparison function, receives (element, needle)
     * @return {Boolean}
     */
    Heap.prototype.contains = function (o, fn) {
        if (fn === void 0) { fn = Heap.defaultIsEqual; }
        return this.heapArray.findIndex(function (el) { return fn(el, o); }) >= 0;
    };
    /**
     * Initialise a heap, sorting nodes
     * @param  {Array} array Optional initial state array
     */
    Heap.prototype.init = function (array) {
        if (array) {
            this.heapArray = __spreadArray([], __read(array));
        }
        for (var i = Math.floor(this.heapArray.length); i >= 0; --i) {
            this._sortNodeDown(i);
        }
        this._applyLimit();
    };
    /**
     * Test if the heap has no elements.
     * @return {Boolean} True if no elements on the heap
     */
    Heap.prototype.isEmpty = function () {
        return this.length === 0;
    };
    /**
     * Get the leafs of the tree (no children nodes)
     */
    Heap.prototype.leafs = function () {
        if (this.heapArray.length === 0) {
            return [];
        }
        var pi = Heap.getParentIndexOf(this.heapArray.length - 1);
        return this.heapArray.slice(pi + 1);
    };
    Object.defineProperty(Heap.prototype, "length", {
        /**
         * Length of the heap.
         * @return {Number}
         */
        get: function () {
            return this.heapArray.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Heap.prototype, "limit", {
        /**
         * Get length limit of the heap.
         * @return {Number}
         */
        get: function () {
            return this._limit;
        },
        /**
         * Set length limit of the heap.
         * @return {Number}
         */
        set: function (_l) {
            this._limit = ~~_l;
            this._applyLimit();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Top node. Aliases: `element`.
     * Same as: `top(1)[0]`
     * @return {any} Top node
     */
    Heap.prototype.peek = function () {
        return this.heapArray[0];
    };
    /**
     * Extract the top node (root). Aliases: `poll`.
     * @return {any} Extracted top node, undefined if empty
     */
    Heap.prototype.pop = function () {
        var last = this.heapArray.pop();
        if (this.length > 0 && last !== undefined) {
            return this.replace(last);
        }
        return last;
    };
    /**
     * Pushes element(s) to the heap.
     * @param  {...any} elements Elements to insert
     * @return {Boolean} True if elements are present
     */
    Heap.prototype.push = function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        if (elements.length < 1) {
            return false;
        }
        else if (elements.length === 1) {
            return this.add(elements[0]);
        }
        else {
            return this.addAll(elements);
        }
    };
    /**
     * Same as push & pop in sequence, but faster
     * @param  {any} element Element to insert
     * @return {any}  Extracted top node
     */
    Heap.prototype.pushpop = function (element) {
        var _a;
        if (this.compare(this.heapArray[0], element) < 0) {
            _a = __read([this.heapArray[0], element], 2), element = _a[0], this.heapArray[0] = _a[1];
            this._sortNodeDown(0);
        }
        return element;
    };
    /**
     * Remove an element from the heap.
     * @param  {any}   o      Element to be found
     * @param  {Function} fn  Optional function to compare
     * @return {Boolean}      True if the heap was modified
     */
    Heap.prototype.remove = function (o, fn) {
        if (fn === void 0) { fn = Heap.defaultIsEqual; }
        if (this.length > 0) {
            if (o === undefined) {
                this.pop();
                return true;
            }
            else {
                var idx = this.heapArray.findIndex(function (el) { return fn(el, o); });
                if (idx >= 0) {
                    if (idx === 0) {
                        this.pop();
                    }
                    else if (idx === this.length - 1) {
                        this.heapArray.pop();
                    }
                    else {
                        this.heapArray.splice(idx, 1, this.heapArray.pop());
                        this._sortNodeUp(idx);
                        this._sortNodeDown(idx);
                    }
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Pop the current peek value, and add the new item.
     * @param  {any} element  Element to replace peek
     * @return {any}         Old peek
     */
    Heap.prototype.replace = function (element) {
        var peek = this.heapArray[0];
        this.heapArray[0] = element;
        this._sortNodeDown(0);
        return peek;
    };
    /**
     * Size of the heap
     * @return {Number}
     */
    Heap.prototype.size = function () {
        return this.length;
    };
    /**
     * Return the top (highest value) N elements of the heap.
     *
     * @param  {Number} n  Number of elements.
     * @return {Array}    Array of length <= N.
     */
    Heap.prototype.top = function (n) {
        if (n === void 0) { n = 1; }
        if (this.heapArray.length === 0 || n <= 0) {
            // Nothing to do
            return [];
        }
        else if (this.heapArray.length === 1 || n === 1) {
            // Just the peek
            return [this.heapArray[0]];
        }
        else if (n >= this.heapArray.length) {
            // The whole peek
            return __spreadArray([], __read(this.heapArray));
        }
        else {
            // Some elements
            var result = this._topN_push(~~n);
            return result;
        }
    };
    /**
     * Clone the heap's internal array
     * @return {Array}
     */
    Heap.prototype.toArray = function () {
        return __spreadArray([], __read(this.heapArray));
    };
    /**
     * String output, call to Array.prototype.toString()
     * @return {String}
     */
    Heap.prototype.toString = function () {
        return this.heapArray.toString();
    };
    /**
     * Get the element at the given index.
     * @param  {Number} i Index to get
     * @return {any}       Element at that index
     */
    Heap.prototype.get = function (i) {
        return this.heapArray[i];
    };
    /**
     * Get the elements of these node's children
     * @param  {Number} idx Node index
     * @return {Array(any)}  Children elements
     */
    Heap.prototype.getChildrenOf = function (idx) {
        var _this = this;
        return Heap.getChildrenIndexOf(idx)
            .map(function (i) { return _this.heapArray[i]; })
            .filter(function (e) { return e !== undefined; });
    };
    /**
     * Get the element of this node's parent
     * @param  {Number} idx Node index
     * @return {any}     Parent element
     */
    Heap.prototype.getParentOf = function (idx) {
        var pi = Heap.getParentIndexOf(idx);
        return this.heapArray[pi];
    };
    /**
     * Iterator interface
     */
    Heap.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.length) return [3 /*break*/, 2];
                    return [4 /*yield*/, this.pop()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    /**
     * Returns an iterator. To comply with Java interface.
     */
    Heap.prototype.iterator = function () {
        return this;
    };
    /**
     * Limit heap size if needed
     */
    Heap.prototype._applyLimit = function () {
        if (this._limit && this._limit < this.heapArray.length) {
            var rm = this.heapArray.length - this._limit;
            // It's much faster than splice
            while (rm) {
                this.heapArray.pop();
                --rm;
            }
        }
    };
    /**
     * Return the bottom (lowest value) N elements of the heap, without corner cases, unsorted
     *
     * @param  {Number} n  Number of elements.
     * @return {Array}     Array of length <= N.
     */
    Heap.prototype._bottomN_push = function (n) {
        // Use an inverted heap
        var bottomHeap = new Heap(this.compare);
        bottomHeap.limit = n;
        bottomHeap.heapArray = this.heapArray.slice(-n);
        bottomHeap.init();
        var startAt = this.heapArray.length - 1 - n;
        var parentStartAt = Heap.getParentIndexOf(startAt);
        var indices = [];
        for (var i = startAt; i > parentStartAt; --i) {
            indices.push(i);
        }
        var arr = this.heapArray;
        while (indices.length) {
            var i = indices.shift();
            if (this.compare(arr[i], bottomHeap.peek()) > 0) {
                bottomHeap.replace(arr[i]);
                if (i % 2) {
                    indices.push(Heap.getParentIndexOf(i));
                }
            }
        }
        return bottomHeap.toArray();
    };
    /**
     * Move a node to a new index, switching places
     * @param  {Number} j First node index
     * @param  {Number} k Another node index
     */
    Heap.prototype._moveNode = function (j, k) {
        var _a;
        _a = __read([this.heapArray[k], this.heapArray[j]], 2), this.heapArray[j] = _a[0], this.heapArray[k] = _a[1];
    };
    /**
     * Move a node down the tree (to the leaves) to find a place where the heap is sorted.
     * @param  {Number} i Index of the node
     */
    Heap.prototype._sortNodeDown = function (i) {
        var _this = this;
        var moveIt = i < this.heapArray.length - 1;
        var self = this.heapArray[i];
        var getPotentialParent = function (best, j) {
            if (_this.heapArray.length > j && _this.compare(_this.heapArray[j], _this.heapArray[best]) < 0) {
                best = j;
            }
            return best;
        };
        while (moveIt) {
            var childrenIdx = Heap.getChildrenIndexOf(i);
            var bestChildIndex = childrenIdx.reduce(getPotentialParent, childrenIdx[0]);
            var bestChild = this.heapArray[bestChildIndex];
            if (typeof bestChild !== 'undefined' && this.compare(self, bestChild) > 0) {
                this._moveNode(i, bestChildIndex);
                i = bestChildIndex;
            }
            else {
                moveIt = false;
            }
        }
    };
    /**
     * Move a node up the tree (to the root) to find a place where the heap is sorted.
     * @param  {Number} i Index of the node
     */
    Heap.prototype._sortNodeUp = function (i) {
        var moveIt = i > 0;
        while (moveIt) {
            var pi = Heap.getParentIndexOf(i);
            if (pi >= 0 && this.compare(this.heapArray[pi], this.heapArray[i]) > 0) {
                this._moveNode(i, pi);
                i = pi;
            }
            else {
                moveIt = false;
            }
        }
    };
    /**
     * Return the top (highest value) N elements of the heap, without corner cases, unsorted
     * Implementation: push.
     *
     * @param  {Number} n  Number of elements.
     * @return {Array}     Array of length <= N.
     */
    Heap.prototype._topN_push = function (n) {
        // Use an inverted heap
        var topHeap = new Heap(this._invertedCompare);
        topHeap.limit = n;
        var indices = [0];
        var arr = this.heapArray;
        while (indices.length) {
            var i = indices.shift();
            if (i < arr.length) {
                if (topHeap.length < n) {
                    topHeap.push(arr[i]);
                    indices.push.apply(indices, __spreadArray([], __read(Heap.getChildrenIndexOf(i))));
                }
                else if (this.compare(arr[i], topHeap.peek()) < 0) {
                    topHeap.replace(arr[i]);
                    indices.push.apply(indices, __spreadArray([], __read(Heap.getChildrenIndexOf(i))));
                }
            }
        }
        return topHeap.toArray();
    };
    /**
     * Return the top (highest value) N elements of the heap, without corner cases, unsorted
     * Implementation: init + push.
     *
     * @param  {Number} n  Number of elements.
     * @return {Array}     Array of length <= N.
     */
    Heap.prototype._topN_fill = function (n) {
        // Use an inverted heap
        var heapArray = this.heapArray;
        var topHeap = new Heap(this._invertedCompare);
        topHeap.limit = n;
        topHeap.heapArray = heapArray.slice(0, n);
        topHeap.init();
        var branch = Heap.getParentIndexOf(n - 1) + 1;
        var indices = [];
        for (var i = branch; i < n; ++i) {
            indices.push.apply(indices, __spreadArray([], __read(Heap.getChildrenIndexOf(i).filter(function (l) { return l < heapArray.length; }))));
        }
        if ((n - 1) % 2) {
            indices.push(n);
        }
        while (indices.length) {
            var i = indices.shift();
            if (i < heapArray.length) {
                if (this.compare(heapArray[i], topHeap.peek()) < 0) {
                    topHeap.replace(heapArray[i]);
                    indices.push.apply(indices, __spreadArray([], __read(Heap.getChildrenIndexOf(i))));
                }
            }
        }
        return topHeap.toArray();
    };
    /**
     * Return the top (highest value) N elements of the heap, without corner cases, unsorted
     * Implementation: heap.
     *
     * @param  {Number} n  Number of elements.
     * @return {Array}     Array of length <= N.
     */
    Heap.prototype._topN_heap = function (n) {
        var topHeap = this.clone();
        var result = [];
        for (var i = 0; i < n; ++i) {
            result.push(topHeap.pop());
        }
        return result;
    };
    /**
     * Return index of the top element
     * @param list
     */
    Heap.prototype._topIdxOf = function (list) {
        if (!list.length) {
            return -1;
        }
        var idx = 0;
        var top = list[idx];
        for (var i = 1; i < list.length; ++i) {
            var comp = this.compare(list[i], top);
            if (comp < 0) {
                idx = i;
                top = list[i];
            }
        }
        return idx;
    };
    /**
     * Return the top element
     * @param list
     */
    Heap.prototype._topOf = function () {
        var list = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            list[_i] = arguments[_i];
        }
        var heap = new Heap(this.compare);
        heap.init(list);
        return heap.peek();
    };
    return Heap;
}());

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Heap);



/***/ }),

/***/ 58903:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/answer-indication/answer-indication.component.scss?ngResource ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = ":host {\n  width: 40px;\n  height: 40px;\n  border-radius: 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n:host.--focused {\n  border: 4px solid #c6ddff;\n}\n:host.--wrong {\n  color: var(--ion-color-danger);\n}\n.no-answer {\n  opacity: 0.7;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuc3dlci1pbmRpY2F0aW9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBREY7QUFHRTtFQUNFLHlCQUFBO0FBREo7QUFJRTtFQUNFLDhCQUFBO0FBRko7QUFNQTtFQUNFLFlBQUE7QUFIRiIsImZpbGUiOiJhbnN3ZXItaW5kaWNhdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJ21haW4nO1xyXG5cclxuOmhvc3Qge1xyXG4gIHdpZHRoOiA1ICogJHVuaXQ7XHJcbiAgaGVpZ2h0OiA1ICogJHVuaXQ7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgJi4tLWZvY3VzZWQge1xyXG4gICAgYm9yZGVyOiA0cHggc29saWQgI2M2ZGRmZjtcclxuICB9XHJcblxyXG4gICYuLS13cm9uZyB7XHJcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhbmdlcik7XHJcbiAgfVxyXG59XHJcblxyXG4ubm8tYW5zd2VyIHtcclxuICBvcGFjaXR5OiAwLjc7XHJcbn1cclxuIl19 */";

/***/ }),

/***/ 22498:
/*!********************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page.scss?ngResource ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

module.exports = ".exercise-explanation__content {\n  flex-grow: 1;\n  margin-bottom: 16px;\n}\n\nion-content::part(scroll) {\n  display: flex;\n  flex-direction: column;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZXJjaXNlLWV4cGxhbmF0aW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQUZKOztBQU9FO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBSkoiLCJmaWxlIjoiZXhlcmNpc2UtZXhwbGFuYXRpb24ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnbWFpbicgYXMgKjtcclxuXHJcbi5leGVyY2lzZS1leHBsYW5hdGlvbiB7XHJcbiAgJl9fY29udGVudCB7XHJcbiAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyICogJHVuaXQ7XHJcbiAgfVxyXG59XHJcblxyXG5pb24tY29udGVudCB7XHJcbiAgJjo6cGFydChzY3JvbGwpIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxufVxyXG4iXX0= */";

/***/ }),

/***/ 32659:
/*!********************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-settings.page/components/included-answers/list-select.component.scss?ngResource ***!
  \********************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsaXN0LXNlbGVjdC5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 70623:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-settings.page/exercise-settings.page.scss?ngResource ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = "ion-range {\n  flex: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZXJjaXNlLXNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLE9BQUE7QUFDRiIsImZpbGUiOiJleGVyY2lzZS1zZXR0aW5ncy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tcmFuZ2Uge1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuIl19 */";

/***/ }),

/***/ 65102:
/*!**********************************************************************!*\
  !*** ./src/app/exercise/exercise.page/exercise.page.scss?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = ".exercise {\n  /**\n  * CSS here is complicated due to the fact that we want to animate --right, --wrong and --highlighted out,\n  * But the button can be both --highlighted and --right at the same time,\n  * and we need to avoid overriding the transition property incorrectly\n  */\n}\n.exercise__content-container {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.exercise__answers-container {\n  min-height: 160px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.exercise__answers-row {\n  display: flex;\n}\n.exercise__answers-row > * {\n  min-width: 0;\n  flex: 1;\n}\n.exercise__answer-button::part(native) {\n  border: 0 solid rgba(0, 0, 0, 0);\n}\n.exercise__answer-button.--right::part(native) {\n  background-color: var(--ion-color-success);\n}\n.exercise__answer-button:not(.--right):not(.--wrong).--highlighted::part(native) {\n  transition: background-color 700ms ease-in;\n}\n.exercise__answer-button:not(.--right):not(.--wrong):not(.--highlighted)::part(native) {\n  transition: background-color 700ms ease-in, border-color 300ms ease-in-out, border-width 300ms ease-in-out;\n}\n.exercise__answer-button:not(.--highlighted).--right::part(native), .exercise__answer-button:not(.--highlighted).--wrong::part(native) {\n  transition: border-color 300ms ease-in;\n}\n.exercise__answer-button:not(.--highlighted):not(.--right):not(.--wrong)::part(native) {\n  transition: background-color 700ms ease-in, border-color 300ms ease-in-out, border-width 300ms ease-in-out;\n}\n.exercise__answer-button.--wrong::part(native) {\n  background-color: var(--ion-color-danger);\n}\n.exercise__answer-button.--highlighted::part(native) {\n  border-color: rgba(0, 0, 0, 0.2);\n  border-width: 4px;\n  transition: border-color 10ms ease-in-out, border-width 10ms ease-in-out;\n}\n.exercise__answers-rows-container, .exercise__answers-buttons-auto-layout-container {\n  flex-grow: 1;\n}\n.exercise__answers-buttons-auto-layout-container {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start;\n}\n.exercise__answers-buttons-auto-layout-container ion-button {\n  flex: 1;\n}\n.exercise__actions-container {\n  display: flex;\n  min-height: 80px;\n}\n.exercise__actions-container ion-button {\n  flex-grow: 1;\n}\nion-title {\n  padding: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4ZXJjaXNlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQXVCRTs7OztHQUFBO0FBbkJGO0FBSEU7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBS0o7QUFGRTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFJSjtBQURFO0VBQ0UsYUFBQTtBQUdKO0FBREk7RUFDRSxZQUFBO0VBQ0EsT0FBQTtBQUdOO0FBT0k7RUFDRSxnQ0FBQTtBQUxOO0FBU007RUFDRSwwQ0FBQTtBQVBSO0FBYVE7RUFDRSwwQ0FBQTtBQVhWO0FBZ0JRO0VBQ0UsMEdBQUE7QUFkVjtBQXNCUTtFQUNFLHNDQUFBO0FBcEJWO0FBeUJRO0VBQ0UsMEdBQUE7QUF2QlY7QUE2Qk07RUFDRSx5Q0FBQTtBQTNCUjtBQWdDTTtFQUNFLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSx3RUFBQTtBQTlCUjtBQW1DRTtFQUVFLFlBQUE7QUFsQ0o7QUFxQ0U7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBbkNKO0FBcUNJO0VBQ0UsT0FBQTtBQW5DTjtBQXVDRTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtBQXJDSjtBQXVDSTtFQUNFLFlBQUE7QUFyQ047QUEwQ0E7RUFDRSxVQUFBO0FBdkNGIiwiZmlsZSI6ImV4ZXJjaXNlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJ21haW4nO1xyXG5cclxuLmV4ZXJjaXNlIHtcclxuICAmX19jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcblxyXG4gICZfX2Fuc3dlcnMtY29udGFpbmVyIHtcclxuICAgIG1pbi1oZWlnaHQ6IDIwICogJHVuaXQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgJl9fYW5zd2Vycy1yb3cge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuXHJcbiAgICA+ICoge1xyXG4gICAgICBtaW4td2lkdGg6IDA7XHJcbiAgICAgIGZsZXg6IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENTUyBoZXJlIGlzIGNvbXBsaWNhdGVkIGR1ZSB0byB0aGUgZmFjdCB0aGF0IHdlIHdhbnQgdG8gYW5pbWF0ZSAtLXJpZ2h0LCAtLXdyb25nIGFuZCAtLWhpZ2hsaWdodGVkIG91dCxcclxuICAqIEJ1dCB0aGUgYnV0dG9uIGNhbiBiZSBib3RoIC0taGlnaGxpZ2h0ZWQgYW5kIC0tcmlnaHQgYXQgdGhlIHNhbWUgdGltZSxcclxuICAqIGFuZCB3ZSBuZWVkIHRvIGF2b2lkIG92ZXJyaWRpbmcgdGhlIHRyYW5zaXRpb24gcHJvcGVydHkgaW5jb3JyZWN0bHlcclxuICAqL1xyXG4gICZfX2Fuc3dlci1idXR0b24ge1xyXG4gICAgJjo6cGFydChuYXRpdmUpIHtcclxuICAgICAgYm9yZGVyOiAwIHNvbGlkIHJnYmEoMCwwLDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgICYuLS1yaWdodCB7XHJcbiAgICAgICY6OnBhcnQobmF0aXZlKSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI3t2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyl9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJjpub3QoLi0tcmlnaHQpOm5vdCguLS13cm9uZykge1xyXG4gICAgICAmLi0taGlnaGxpZ2h0ZWQge1xyXG4gICAgICAgICY6OnBhcnQobmF0aXZlKSB7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDcwMG1zIGVhc2UtaW47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAmOm5vdCguLS1oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICY6OnBhcnQobmF0aXZlKSB7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDcwMG1zIGVhc2UtaW4sIGJvcmRlci1jb2xvciAzMDBtcyBlYXNlLWluLW91dCwgYm9yZGVyLXdpZHRoIDMwMG1zIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICY6bm90KC4tLWhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICYuLS1yaWdodCxcclxuICAgICAgJi4tLXdyb25nIHtcclxuICAgICAgICAmOjpwYXJ0KG5hdGl2ZSkge1xyXG4gICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDMwMG1zIGVhc2UtaW47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAmOm5vdCguLS1yaWdodCk6bm90KC4tLXdyb25nKSB7XHJcbiAgICAgICAgJjo6cGFydChuYXRpdmUpIHtcclxuICAgICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgNzAwbXMgZWFzZS1pbiwgYm9yZGVyLWNvbG9yIDMwMG1zIGVhc2UtaW4tb3V0LCBib3JkZXItd2lkdGggMzAwbXMgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJi4tLXdyb25nIHtcclxuICAgICAgJjo6cGFydChuYXRpdmUpIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAje3ZhcigtLWlvbi1jb2xvci1kYW5nZXIpfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICYuLS1oaWdobGlnaHRlZCB7XHJcbiAgICAgICY6OnBhcnQobmF0aXZlKSB7XHJcbiAgICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgICAgICAgYm9yZGVyLXdpZHRoOiA0cHg7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDEwbXMgZWFzZS1pbi1vdXQsIGJvcmRlci13aWR0aCAxMG1zIGVhc2UtaW4tb3V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmX19hbnN3ZXJzLXJvd3MtY29udGFpbmVyLFxyXG4gICZfX2Fuc3dlcnMtYnV0dG9ucy1hdXRvLWxheW91dC1jb250YWluZXIge1xyXG4gICAgZmxleC1ncm93OiAxO1xyXG4gIH1cclxuXHJcbiAgJl9fYW5zd2Vycy1idXR0b25zLWF1dG8tbGF5b3V0LWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcclxuXHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgZmxleDogMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICZfX2FjdGlvbnMtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBtaW4taGVpZ2h0OiAgMTAgKiAkdW5pdDtcclxuXHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuaW9uLXRpdGxlIHtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcbiJdfQ== */";

/***/ }),

/***/ 86970:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/answer-indication/answer-indication.component.html?ngResource ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = "<span\r\n  *ngIf=\"answer\"\r\n  class=\"answer\"\r\n>\r\n  {{answer}}\r\n</span>\r\n<span\r\n  *ngIf=\"!answer\"\r\n  class=\"no-answer\"\r\n>\r\n  ?\r\n</span>\r\n";

/***/ }),

/***/ 60846:
/*!********************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-help/exercise-explanation/exercise-explanation.page.html?ngResource ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<app-modal-frame\r\n  [title]=\"exerciseName\"\r\n  #modal=\"modal\"\r\n>\r\n  <div\r\n    class=\"exercise-explanation__content\"\r\n  >\r\n    <ng-template [exerciseExplanationContent]=\"content\"></ng-template>\r\n  </div>\r\n\r\n  <ion-button expand=\"block\" (click)=\"modal.close()\">Got It!</ion-button>\r\n</app-modal-frame>\r\n";

/***/ }),

/***/ 76530:
/*!********************************************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-settings.page/components/included-answers/list-select.component.html?ngResource ***!
  \********************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "<ion-list *ngIf=\"modelValue$ | async as modelValue\">\r\n  <ion-list-header>\r\n    {{label}}\r\n  </ion-list-header>\r\n  <ion-item *ngFor=\"let answer of allAvailableOptions\">\r\n    <ion-label>{{answer.label}}</ion-label>\r\n    <ion-checkbox\r\n      (ionChange)=\"onChange(answer.value, $event.detail.checked)\"\r\n      [checked]=\"modelValue.includes(answer.value)\"\r\n      slot=\"start\"\r\n    ></ion-checkbox>\r\n  </ion-item>\r\n</ion-list>\r\n";

/***/ }),

/***/ 44443:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/exercise/exercise.page/components/exercise-settings.page/exercise-settings.page.html?ngResource ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = "<app-modal-frame\r\n  title=\"{{exerciseName}} Settings\"\r\n  [padding]=\"false\"\r\n  [onClose]=\"onClose.bind(this)\"\r\n>\r\n  <ion-list>\r\n    <ion-item>\r\n      <ion-label>Play Cadence</ion-label>\r\n      <ion-select\r\n        [formControl]=\"generalFormGroup.controls.playCadenceOptions\"\r\n        [interface]=\"'popover'\"\r\n      >\r\n        <ion-select-option [value]=\"'ALWAYS'\">Always</ion-select-option>\r\n        <!--TODO(OE-13)-->\r\n        <!--<ion-select-option value=\"'EVERY'\">Every...</ion-select-option>-->\r\n        <!--TODO(OE-12)-->\r\n        <!--<ion-select-option [value]=\"'EVERY_NEW_KEY'\">Once for a new key</ion-select-option>-->\r\n        <ion-select-option [value]=\"'NEVER'\">Never</ion-select-option>\r\n        <ion-select-option [value]=\"'ONLY_ON_REPEAT'\">Only on repeat</ion-select-option>\r\n      </ion-select>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label>Move to next question automatically</ion-label>\r\n      <ion-toggle\r\n        [formControl]=\"generalFormGroup.controls.moveToNextQuestionAutomatically\"\r\n      >\r\n      </ion-toggle>\r\n    </ion-item>\r\n    <ion-item\r\n      class=\"exercise-settings__item --label-above\"\r\n    >\r\n      <ion-label>BPM</ion-label>\r\n      <ion-range\r\n        [formControl]=\"generalFormGroup.controls.bpm\"\r\n        [max]=\"200\"\r\n        [min]=\"40\"\r\n        [snaps]=\"true\"\r\n        [step]=\"1\"\r\n        pin\r\n      >\r\n      </ion-range>\r\n    </ion-item>\r\n    <ion-item>\r\n      <ion-label>Adaptive</ion-label>\r\n      <ion-toggle\r\n        [formControl]=\"generalFormGroup.controls.adaptive\"\r\n        slot=\"end\"\r\n      ></ion-toggle>\r\n    </ion-item>\r\n  </ion-list>\r\n\r\n  <ion-list *ngIf=\"exerciseFormGroup\">\r\n    <ng-container *ngFor=\"let exerciseControlSettings of exerciseSettingsDescriptor\">\r\n      <ng-container\r\n        *ngIf=\"isShowExerciseControl(exerciseControlSettings)\"\r\n        [ngSwitch]=\"exerciseControlSettings.descriptor.controlType\"\r\n      >\r\n        <ion-item\r\n          *ngSwitchCase=\"'SELECT'\"\r\n          @collapseVertical\r\n        >\r\n          <ion-label>{{exerciseControlSettings.descriptor.label}}</ion-label>\r\n          <ion-select\r\n            [formControl]=\"exerciseFormGroup.controls[exerciseControlSettings.key]\"\r\n            [interface]=\"'popover'\"\r\n          >\r\n            <ion-select-option\r\n              *ngFor=\"let option of exerciseControlSettings.descriptor.options\"\r\n              [value]=\"option.value\"\r\n            >\r\n              {{option.label}}\r\n            </ion-select-option>\r\n          </ion-select>\r\n        </ion-item>\r\n        <ion-item\r\n          *ngSwitchCase=\"'SLIDER'\"\r\n          class=\"exercise-settings__item --label-above\"\r\n          @collapseVertical\r\n        >\r\n          <ion-label>{{exerciseControlSettings.descriptor.label}}</ion-label>\r\n          <ion-range\r\n            [formControl]=\"exerciseFormGroup.controls[exerciseControlSettings.key]\"\r\n            [max]=\"exerciseControlSettings.descriptor.max\"\r\n            [min]=\"exerciseControlSettings.descriptor.min\"\r\n            [snaps]=\"true\"\r\n            [step]=\"exerciseControlSettings.descriptor.step\"\r\n            pin\r\n          >\r\n          </ion-range>\r\n        </ion-item>\r\n        <app-list-select\r\n          *ngSwitchCase=\"'LIST_SELECT'\"\r\n          [allAvailableOptions]=\"exerciseControlSettings.descriptor.allOptions\"\r\n          [formControl]=\"exerciseFormGroup.controls[exerciseControlSettings.key]\"\r\n          [label]=\"exerciseControlSettings.descriptor.label\"\r\n          @collapseVertical\r\n        ></app-list-select>\r\n        <ion-item\r\n          *ngSwitchCase=\"'CHECKBOX'\"\r\n          @collapseVertical\r\n        >\r\n          <ion-label>{{exerciseControlSettings.descriptor.label}}</ion-label>\r\n          <ion-toggle\r\n            [formControl]=\"exerciseFormGroup.controls[exerciseControlSettings.key]\"\r\n            slot=\"end\"\r\n          ></ion-toggle>\r\n        </ion-item>\r\n      </ng-container>\r\n    </ng-container>\r\n  </ion-list>\r\n</app-modal-frame>\r\n";

/***/ }),

/***/ 45722:
/*!**********************************************************************!*\
  !*** ./src/app/exercise/exercise.page/exercise.page.html?ngResource ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<ion-header [translucent]=\"true\">\r\n  <ion-toolbar [color]=\"'primary'\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      {{state.name}}\r\n    </ion-title>\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button\r\n        *ngIf=\"state.exercise.explanation\"\r\n        (click)=\"exerciseExplanation.openExplanation()\"\r\n      >\r\n        <ion-icon slot=\"icon-only\" name=\"help-outline\"></ion-icon>\r\n      </ion-button>\r\n      <ion-button (click)=\"editSettings()\">\r\n        <ion-icon slot=\"icon-only\" name=\"settings-outline\"></ion-icon>\r\n      </ion-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]=\"true\" [padding]=\"true\">\r\n  <div class=\"exercise__content-container\">\r\n    <p class=\"exercise__stats-container\">\r\n      Correct answers: {{state.totalCorrectAnswers}}/{{state.totalQuestions}}\r\n      ({{correctAnswersPercentage | number: '1.0-2'}}%)\r\n    </p>\r\n    <div class=\"exercise__answers-container\">\r\n      <app-answer-indication\r\n        *ngFor=\"let answer of state.currentAnswers; let i = index\"\r\n        [answer]=\"answer.answer\"\r\n        [isFocused]=\"state.currentlyPlayingSegment === i\"\r\n        [wasAnsweredWrong]=\"answer.wasWrong\"\r\n      ></app-answer-indication>\r\n    </div>\r\n    <div\r\n      *ngIf=\"!isAutoLayout\"\r\n      class=\"exercise__answers-rows-container\"\r\n    >\r\n      <div\r\n        *ngFor=\"let row of state.answerList.rows\"\r\n        class=\"exercise__answers-row\"\r\n      >\r\n        <ng-container\r\n          *ngFor=\"let answerCellConfig of row\"\r\n          [ngTemplateOutlet]=\"answerButton\"\r\n          [ngTemplateOutletContext]=\"{$implicit: normalizeAnswerLayoutCellConfig | pureFunction: answerCellConfig}\"\r\n        ></ng-container>\r\n      </div>\r\n    </div>\r\n    <div\r\n      *ngIf=\"isAutoLayout\"\r\n      class=\"exercise__answers-buttons-auto-layout-container\"\r\n    >\r\n      <ng-container\r\n        *ngFor=\"let answer of state.answerList\"\r\n        [ngTemplateOutlet]=\"answerButton\"\r\n        [ngTemplateOutletContext]=\"{$implicit: normalizeAnswerLayoutCellConfig | pureFunction: answer}\"\r\n      ></ng-container>\r\n    </div>\r\n    <ng-template\r\n      let-answerLayoutCellConfig\r\n      #answerButton\r\n    >\r\n      <ion-button\r\n        *ngIf=\"answerLayoutCellConfig.answer as answer\"\r\n        (click)=\"onAnswer(answer)\"\r\n        [class.--right]=\"answer === rightAnswer\"\r\n        [class.--highlighted]=\"answer === state.highlightedAnswer\"\r\n        [class.--wrong]=\"wrongAnswers.includes(answer)\"\r\n        [color]=\"'light'\"\r\n        [style.flex]=\"answerLayoutCellConfig.space\"\r\n        class=\"exercise__answer-button\"\r\n      >\r\n        {{answer}}\r\n      </ion-button>\r\n      <div\r\n        *ngIf=\"!answerLayoutCellConfig.answer\"\r\n        [style.flex]=\"answerLayoutCellConfig.space\"\r\n      ></div>\r\n    </ng-template>\r\n    <div class=\"exercise__actions-container\">\r\n      <ion-button\r\n        (click)=\"state.playCurrentCadenceAndQuestion()\"\r\n      >\r\n        <ion-icon name=\"repeat\"></ion-icon>\r\n        Repeat\r\n      </ion-button>\r\n      <ion-button\r\n        *ngIf=\"state.hasCadence\"\r\n        (click)=\"state.playCurrentQuestion()\"\r\n      >\r\n        <ion-icon name=\"musical-note\"></ion-icon>\r\n      </ion-button>\r\n      <ion-button\r\n        [disabled]=\"!isQuestionCompleted\"\r\n        (click)=\"state.nextQuestion()\"\r\n      >\r\n        Next\r\n      </ion-button>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_exercise_exercise_module_ts.js.map