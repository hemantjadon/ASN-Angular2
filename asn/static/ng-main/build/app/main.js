System.register(['@angular/platform-browser-dynamic', '@angular/http', 'angular2-jwt', './api-endpoints', './components/app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, angular2_jwt_1, api_endpoints_1, app_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (api_endpoints_1_1) {
                api_endpoints_1 = api_endpoints_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, angular2_jwt_1.AUTH_PROVIDERS, api_endpoints_1.APIEndpoints]);
        }
    }
});
