angular.module('myApp',[])
    .run(function ($rootScope) {
        function doc_keyUp(e) {
            if (e.ctrlKey && e.keyCode == 40) {
                $rootScope.takeSnapshot();
            }
        }
        document.addEventListener('keyup', doc_keyUp, false);
    })
    .controller('myCtrl',function ($scope, $rootScope, $http) {
        $rootScope.takeSnapshot = function () {
            html2canvas(document.body, {
                onrendered: function(canvas) {
                    if (navigator.userAgent.indexOf("MSIE ") > 0 ||
                        navigator.userAgent.match(/Trident.*rv\:11\./))
                    {
                        var blob = canvas.msToBlob();
                        window.navigator.msSaveBlob(blob,'Test file.png');
                    }
                    else {
                        $('#test').attr('href', canvas.toDataURL("image/png"));
                        $('#test').attr('download','Test file.png');
                        $('#test')[0].click();
                    }
                    $http.post('/saveImage64',{baseData:canvas.toDataURL("image/png")})
                        .success(function (data) {
                            console.log(data);
                            $scope.url= data;
                        })
                        .error(function (err) {
                            console.log(err);
                        })
                }
            });
        };
    });