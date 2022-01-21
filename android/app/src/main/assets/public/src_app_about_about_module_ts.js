"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_about_about_module_ts"],{

/***/ 46985:
/*!***************************************!*\
  !*** ./src/app/about/about.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutModule": () => (/* binding */ AboutModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _about_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.page */ 44518);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 34362);
/* harmony import */ var _shared_components_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/shared-components/shared-components.module */ 21264);
/* harmony import */ var _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/modal/modal.module */ 38975);








let AboutModule = class AboutModule {
};
AboutModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        declarations: [
            _about_page__WEBPACK_IMPORTED_MODULE_0__.AboutPage,
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _shared_components_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild([
                {
                    path: '',
                    component: _about_page__WEBPACK_IMPORTED_MODULE_0__.AboutPage,
                }
            ]),
            _shared_modal_modal_module__WEBPACK_IMPORTED_MODULE_2__.ModalModule
        ],
    })
], AboutModule);



/***/ }),

/***/ 44518:
/*!*************************************!*\
  !*** ./src/app/about/about.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutPage": () => (/* binding */ AboutPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 34929);
/* harmony import */ var _about_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.page.html?ngResource */ 4687);
/* harmony import */ var _about_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about.page.scss?ngResource */ 20298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _version_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../version.service */ 28370);





let AboutPage = class AboutPage {
    constructor(versionService) {
        this.versionService = versionService;
    }
};
AboutPage.ctorParameters = () => [
    { type: _version_service__WEBPACK_IMPORTED_MODULE_2__.VersionService }
];
AboutPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-about',
        template: _about_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_about_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], AboutPage);



/***/ }),

/***/ 20298:
/*!**************************************************!*\
  !*** ./src/app/about/about.page.scss?ngResource ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 4687:
/*!**************************************************!*\
  !*** ./src/app/about/about.page.html?ngResource ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "<ion-header [translucent]=\"true\">\r\n  <ion-toolbar [color]=\"'primary'\">\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      About OpenEar\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content\r\n  [fullscreen]=\"true\"\r\n  [padding]=\"true\"\r\n>\r\n  <p>Version: {{versionService.version$ | async}}</p>\r\n  <p>\r\n    <b>OpenEar</b> is a free and open-source application for musical hearing training.\r\n    In contains many useful and effective exercise anyone can do on the go, which do not exists in any other app.\r\n    This is just a beta version and we hope that the app will continue to grow with more features and exercises.\r\n  </p>\r\n\r\n  <h1>Feedback</h1>\r\n  <p>To report bugs or request features please visit <a href=\"https://github.com/ShacharHarshuv/open-ear/issues/new\"\r\n                                                        target=\"_blank\">our github page</a></p>\r\n  <p>Alternatively you can <a href=\"mailto:shachar.harshuv@gmail.com\">write an email</a></p>\r\n\r\n  <h1>Contribution</h1>\r\n  <p>\r\n    If you have some basic programming skills, you can contribute your time by expanding the app features!\r\n    Any contribution is very much welcome.\r\n    Check out this <a href=\"\" target=\"_blank\">readme</a> to get started.\r\n  </p>\r\n  <p>Don't know what to contribute? Have a quick look at our <a href=\"https://github.com/ShacharHarshuv/open-ear/issues\"\r\n                                                                target=\"_blank\">open issues</a> list.</p>\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_about_about_module_ts.js.map