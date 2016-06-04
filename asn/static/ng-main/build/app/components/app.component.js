System.register(['@angular/core', '@angular/router-deprecated', '../services/auth.service', './navbar.component', './home-page/home-page.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, auth_service_1, navbar_component_1, home_page_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (home_page_component_1_1) {
                home_page_component_1 = home_page_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(AUTH) {
                    this.AUTH = AUTH;
                }
                AppComponent.prototype.ngOnInit = function () {
                    // this.AUTH.login('admin','admin1234')
                    // 		 .then((response) => {
                    // 			 console.log(response);
                    // 		 })
                    // 		 .catch((error)=>{ 
                    // 			 console.error(error) 
                    // 		 });
                    this.AUTH.logout();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'ng-app',
                        templateUrl: "static/ng-main/build/app/templates/app.component.html",
                        styleUrls: ["static/ng-main/build/app/styles/app.component.css"],
                        directives: [
                            navbar_component_1.NavbarComponent,
                            router_deprecated_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            auth_service_1.AUTH,
                            router_deprecated_1.ROUTER_PROVIDERS
                        ],
                    }),
                    router_deprecated_1.RouteConfig([
                        {
                            path: '/',
                            name: 'HomePage',
                            component: home_page_component_1.HomePageComponent,
                            useAsDefault: true
                        }
                    ]), 
                    __metadata('design:paramtypes', [auth_service_1.AUTH])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
