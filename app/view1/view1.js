'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngDialog'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
        $scope.searchText = '';
        $scope.categoryTypes = {
            'years': {
                text: 'Годы сотрудничества',
                attr: [2012,2013,2014,2015,2016,2017]
            },
            'geo': {
                text: 'География: РФ и мир',
                attr: [
                    {
                        name: 'russia',
                        text: 'Россия'
                    },
                    {
                        name: 'usa',
                        text: 'Америка'
                    }
                ]
            },
            'companyType': {
                text: 'Типы деятельности компании',
                attr: [
                    {
                        name: 'gos',
                        text: 'Государственная структура'
                    },
                    {
                        name: 'develop',
                        text: 'Девелопер'
                    },
                    {
                        name: 'project',
                        text: 'Проектировщик'
                    },
                    {
                        name: 'arch',
                        text: 'Архитектурная мастерская'
                    },
                    {
                        name: 'soft',
                        text: 'Разработка и продажа ПО, обучение'
                    },
                    {
                        name: 'Manufacture',
                        text: 'Производство строительных материалов'
                    },
                    {
                        name: 'other',
                        text: 'Другие компании'
                    }
                ]
            },
            'companyName': {
                text: 'Название компании'
            },
            'workType': {
                text: 'Тип работ',
                attr: [
                    {
                        name: 'learn',
                        text: 'Обучение'
                    },
                    {
                        name: 'modeling',
                        text: 'Моделирование'
                    },
                    {
                        name: 'introduction',
                        text: 'Внедрение'
                    },
                    {
                        name: 'consult',
                        text: 'Консультирование'
                    }
                ]
            }
        };

        $http.get('https://pltnm239.github.io/bimvc_clients/app/content/clients.json')
            .then(function(res){
                $scope.companies = res.data;
                ratingSort($scope.companies);
            });

        $scope.currentType = $scope.categoryTypes.years;

        $scope.setCurrentType = (name) => {
            $scope.currentType = name;
            $scope.searchText = '';
        }

        $scope.setCurrentAttr = (attr) => {
            $scope.searchText = attr;
        }

        $scope.openCompanyDescription = (item) => {
            $scope.openCompanyDescriptionItem = item;
            ngDialog.open({
                template: 'companyDescription',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        function ratingSort(arr) {
            arr.sort(function (a, b) {
                return b['Важность'] - a['Важность'];
            });
            console.log(arr);
        }
    }]);

