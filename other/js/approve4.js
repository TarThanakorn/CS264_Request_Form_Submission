angular.module("formModule", [])
.controller("formController", function ($scope, $http, $location, $window) {
	$scope.approve = function () {
		var path = window.location.pathname.replace("/approve4/","");
		path = '/apv/'+path;
		$http({
			url: "http://localhost:3001"+path,
			method: "GET",
		}).then(function (response) {
			var url = "http://" + $window.location.host + "/home";
        	$window.location.href = url;
		});
	}
	$scope.reject = function () {
		var path = window.location.pathname.replace("/approve4/","");
		path = '/rej/'+path;
		$http({
			url: "http://localhost:3001"+path,
			method: "GET",
		}).then(function (response) {
			var url = "http://" + $window.location.host + "/home";
        	$window.location.href = url;
		});
	}
	$scope.init = function () {
		var path = window.location.pathname+'/show';
		$http({
			url: "http://localhost:3001"+path,
			method: "GET",
		}).then(function (response) {
			$http({
				url: "http://localhost:3001/getid",
				method: "GET",
			}).then(function (response) {
				$scope.uid = response.data.userName;
				if(response.data.accStatus == '2'){
					$scope.userstatus = 'เจ้าหน้าที่มหาวิทยาลัย';
				}else if (response.data.accStatus == '3'){
					$scope.userstatus = 'อาจารย์ที่ปรึกษา';
				}else if (response.data.accStatus == '4'){
					$scope.userstatus = 'คณบดี';
				}
			});
			data = response.data;
			if(data.formtype == '1'){
				$scope.formtype = 'คำร้องเพิ่มถอนล่าช้า';
			}else if (data.formtype == '2'){
				$scope.formtype = 'คำร้องถอน W';
			}else if (data.formtype == '3'){
				$scope.formtype = 'คำร้องลาออก';
			}else if (data.formtype == '4'){
				$scope.formtype = 'คำร้องอื่น ๆ';
			}
			$scope.formid = data.formid;
			$scope.date = data.date;
			$scope.id = data.id;
			$scope.fname = data.fname;
			$scope.lname = data.lname;
			$scope.years = data.years;
			$scope.field = data.field;
			$scope.addhouseno = data.addhouseno;
			$scope.addvillageno = data.addvillageno;
			$scope.addsubdistrict = data.addsubdistrict;
			$scope.adddistrict = data.adddistrict;
			$scope.addprovince = data.addprovince;
			$scope.addpostalcode = data.addpostalcode;
			$scope.phonenumber = data.phonenumber;
			$scope.number = data.number;
			$scope.teacher = data.teacher;
			$scope.story = data.story;
			$scope.reason = data.reason;
			$scope.file = data.filename;
		});

}
});
