document.getElementById("submitButton").addEventListener("click",submit);
document.getElementById('dates').valueAsDate = new Date();

function dates() {
	const date = new Date();
	if (date.getMonth() < 9){
		if (date.getDate() <= 9)
			document.getElementById("dates").value = date.getFullYear() + '-0' + (date.getMonth()+1) + '-0' + date.getDate();
		else
			document.getElementById("dates").value = date.getFullYear() + '-0' + (date.getMonth()+1) + '-' + date.getDate();
	}else {
		if (date.getDate() <= 9)
			document.getElementById("dates").value = date.getFullYear() + '-' + (date.getMonth()+1) + '-0' + date.getDate();
		else
			document.getElementById("dates").value = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
	}
}

function checkInput() {
	submitcheck = true;
	var alertmsg = "";
	if (!document.getElementById("dates").value){
		alertmsg = alertmsg.concat("\nกรุณาเลือกวันที่ให้ถูกต้อง");
		submitcheck = false;
	}
	if (!document.getElementById("fname").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"ชื่อ\"");
		submitcheck = false;
	}
	if (!document.getElementById("lname").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"นามสกุล\"");
		submitcheck = false;
	}
	if (!document.getElementById("id").value || 
		isNaN(document.getElementById("id").value) || 
		parseInt(document.getElementById("id").value) < 5000000000){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"เลขทะเบียน\" ให้ถูกต้อง\n   - ต้องเป็นตัวเลข\n   - ต้องมี 10 ตัวเลขเท่านั้น");
		submitcheck = false;
	}
	if (!document.getElementById("years").value ||
		isNaN(document.getElementById("years").value) ||
		parseInt(document.getElementById("years").value) < 1 || 
		parseInt(document.getElementById("years").value) > 7){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"ชั้นปี\" ให้ถูกต้อง\n   - ต้องเป็นตัวเลข\n   - ต้องอยู่ในระยะ 1-7 ปี");
		submitcheck = false;
	}
	if (!document.getElementById("field").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"สาขาวิชา\"");
		submitcheck = false;
	}
	if (!document.getElementById("addhouseno").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"บ้านเลขที่\"");
		submitcheck = false;
	}
	if (!document.getElementById("addvillageno").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"หมู่บ้าน\"\n   - หากไม่มีให้ใส่ \"-\"");
		submitcheck = false;
	}
	if (!document.getElementById("addsubdistrict").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"ตำบล\"");
		submitcheck = false;
	}
	if (!document.getElementById("adddistrict").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"อำเภอ\"");
		submitcheck = false;
	}
	if (!document.getElementById("addprovince").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"จังหวัด\"");
		submitcheck = false;
	}
	if (!document.getElementById("addpostalcode").value || 
		isNaN(document.getElementById("addpostalcode").value) || 
		parseInt(document.getElementById("addpostalcode").value) < 10000){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"รหัสไปรษณีย์\" ให้ถูกต้อง\n   - ต้องเป็นตัวเลข\n   - ต้องมี 5 ตัวเลขเท่านั้น");
	submitcheck = false;
	}
	if (!document.getElementById("phonenumber").value || 
		isNaN(document.getElementById("phonenumber").value) || 
		(document.getElementById("phonenumber").value).length != 10||
		(document.getElementById("phonenumber").value).charAt(0) != 0){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"เบอร์โทรศัพท์มือถือ\" ให้ถูกต้อง\n   - ต้องเป็นตัวเลข\n   - ต้องมี 10 ตัวเลขเท่านั้น\n   - ต้องขึ้นต้นด้วยเลข \"0\"");
	submitcheck = false;
	}
	if ((document.getElementById("number").value).length > 0 &&
		(isNaN(document.getElementById("number").value) || 
			(document.getElementById("number").value).length != 10||
			((document.getElementById("number").value).charAt(0) != 0) || (document.getElementById("number").value).charAt(1) != 1)){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"เบอร์โทรศัพท์บ้าน\" ให้ถูกต้อง\n   - ต้องเป็นตัวเลข\n   - ต้องมี 10 ตัวเลขเท่านั้น\n   - ต้องขึ้นต้นด้วยเลข \"01\"");
	submitcheck = false;
	}
	if (!document.getElementById("teacher").value){
		alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"ชื่ออาจารย์ที่ปรึกษา\"");
		submitcheck = false;
	}
	if(!document.getElementById('reason').value) {
		alertmsg = alertmsg.concat("\nกรุณากรอกเหตุผลที่ต้องการลาออก");
		submitcheck = false;
	}
	if(submitcheck == false){
		alert(alertmsg);
		document.getElementById('submitcheck').value='false';
	}else 
		document.getElementById('submitcheck').value='true';
}

function printtoconsole(){
	const obj = {
		formtype: "3",
		date: document.getElementById("dates").value, 
		studentFirstName: document.getElementById("fname").value,
		studentLastName: document.getElementById("lname").value,
		studenid: document.getElementById("id").value,
		studenYear: document.getElementById("years").value,
		studenField: document.getElementById("field").value,
		advisor: document.getElementById("teacher").value,
		addressNumber: document.getElementById("addhouseno").value,
		moo: document.getElementById("addvillageno").value,
		tumbol: document.getElementById("addsubdistrict").value,
		amphur: document.getElementById("adddistrict").value,
		province: document.getElementById("addprovince").value,
		postalCode: document.getElementById("addpostalcode").value,
		mobilePhone: document.getElementById("phonenumber").value,
		phone: document.getElementById("number").value,
		cause: document.getElementById("reason").value,
	};
	const myJSON = JSON.stringify(obj, null);
	console.log(myJSON);
}

function submit() {
	checkInput();
	if(submitcheck) {
		localStorage.removeItem(document.getElementById("id").value+'reason3', reason.value);
		alert('ส่งคำร้องสำเร็จ');
	}
}

angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3001/fillForm",
			method: "GET",
		}).then(function (response) {
			data = response.data;
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
		});
	};
	$scope.upload = function () {
		$http({
			url: "http://localhost:3001/upload",
			method: "POST",
		}).then(function (response) {
		});
	};
});

window.onload = function() {
	dates();
	setTimeout(() => {  
	reason.value = localStorage.getItem(document.getElementById("id").value+'reason3');
	reason.oninput = () => {
		localStorage.setItem(document.getElementById("id").value+'reason3', reason.value);
	}; }, 300);
};

