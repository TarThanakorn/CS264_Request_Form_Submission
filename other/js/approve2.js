angular.module("formModule", [])
.controller("formController", function ($scope, $http, $location, $window) {
	$scope.approve = function () {
		var path = window.location.pathname.replace("/approve2/","");
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
		var path = window.location.pathname.replace("/approve2/","");
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
			if(data.remsub.length > 2){
				remsubject = JSON.parse(data.remsub);
				$scope.remc = remsubject.length;
				console.log(remsubject[0].subjectTeacher);
				$scope.remsubjectCode1= remsubject[0].subjectCode;
				$scope.remsubjectName1= remsubject[0].subjectName;
				$scope.remsubjectSection1= remsubject[0].subjectSection;
				$scope.remsubjectDate1= remsubject[0].subjectDate;
				$scope.remsubjectCredit1= remsubject[0].subjectCredit;
				$scope.remsubjectTeacher1= remsubject[0].subjectTeacher;

				if(remsubject.length > 1){
					$scope.remsubjectCode2= remsubject[1].subjectCode;
					$scope.remsubjectName2= remsubject[1].subjectName;
					$scope.remsubjectSection2= remsubject[1].subjectSection;
					$scope.remsubjectDate2= remsubject[1].subjectDate;
					$scope.remsubjectCredit2= remsubject[1].subjectCredit;
					$scope.remsubjectTeacher2= remsubject[1].subjectTeacher;
				}

				if(remsubject.length > 2){
					$scope.remsubjectCode3= remsubject[2].subjectCode;
					$scope.remsubjectName3= remsubject[2].subjectName;
					$scope.remsubjectSection3= remsubject[2].subjectSection;
					$scope.remsubjectDate3= remsubject[2].subjectDate;
					$scope.remsubjectCredit3= remsubject[2].subjectCredit;
					$scope.remsubjectTeacher3= remsubject[2].subjectTeacher;
				}

				if(remsubject.length > 3){
					$scope.remsubjectCode4= remsubject[3].subjectCode;
					$scope.remsubjectName4= remsubject[3].subjectName;
					$scope.remsubjectSection4= remsubject[3].subjectSection;
					$scope.remsubjectDate4= remsubject[3].subjectDate;
					$scope.remsubjectCredit4= remsubject[3].subjectCredit;
					$scope.remsubjectTeacher4= remsubject[3].subjectTeacher;
				}

				if(remsubject.length > 4){
					$scope.remsubjectCode5= remsubject[4].subjectCode;
					$scope.remsubjectName5= remsubject[4].subjectName;
					$scope.remsubjectSection5= remsubject[4].subjectSection;
					$scope.remsubjectDate5= remsubject[4].subjectDate;
					$scope.remsubjectCredit5= remsubject[4].subjectCredit;
					$scope.remsubjectTeacher5= remsubject[4].subjectTeacher;
				}

				if(remsubject.length > 5){
					$scope.remsubjectCode6= remsubject[5].subjectCode;
					$scope.remsubjectName6= remsubject[5].subjectName;
					$scope.remsubjectSection6= remsubject[5].subjectSection;
					$scope.remsubjectDate6= remsubject[5].subjectDate;
					$scope.remsubjectCredit6= remsubject[5].subjectCredit;
					$scope.remsubjectTeacher6= remsubject[5].subjectTeacher;
				}

				if(remsubject.length > 6){
					$scope.remsubjectCode7= remsubject[6].subjectCode;
					$scope.remsubjectName7= remsubject[6].subjectName;
					$scope.remsubjectSection7= remsubject[6].subjectSection;
					$scope.remsubjectDate7= remsubject[6].subjectDate;
					$scope.remsubjectCredit7= remsubject[6].subjectCredit;
					$scope.remsubjectTeacher7= remsubject[6].subjectTeacher;
				}

				if(remsubject.length > 7){
					$scope.remsubjectCode8= remsubject[7].subjectCode;
					$scope.remsubjectName8= remsubject[7].subjectName;
					$scope.remsubjectSection8= remsubject[7].subjectSection;
					$scope.remsubjectDate8= remsubject[7].subjectDate;
					$scope.remsubjectCredit8= remsubject[7].subjectCredit;
					$scope.remsubjectTeacher8= remsubject[7].subjectTeacher;
				}

				if(remsubject.length > 8){
					$scope.remsubjectCode9= remsubject[8].subjectCode;
					$scope.remsubjectName9= remsubject[8].subjectName;
					$scope.remsubjectSection9= remsubject[8].subjectSection;
					$scope.remsubjectDate9= remsubject[8].subjectDate;
					$scope.remsubjectCredit9= remsubject[8].subjectCredit;
					$scope.remsubjectTeacher9= remsubject[8].subjectTeacher;
				}

				if(remsubject.length > 9){
					$scope.remsubjectCode10= remsubject[9].subjectCode;
					$scope.remsubjectName10= remsubject[9].subjectName;
					$scope.remsubjectSection10= remsubject[9].subjectSection;
					$scope.remsubjectDate10= remsubject[9].subjectDate;
					$scope.remsubjectCredit10= remsubject[9].subjectCredit;
					$scope.remsubjectTeacher10= remsubject[9].subjectTeacher;
				}
			}else{
				$scope.remc = 0;
			}
			$scope.reason = data.reason;
		});

}
});
