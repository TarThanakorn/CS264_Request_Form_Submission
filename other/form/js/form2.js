document.getElementById("submitButton").addEventListener("click",submit);
document.getElementById("buttonaddSubject").addEventListener("click",addSubject);
document.getElementById("buttondelSubject").addEventListener("click",delSubject);
var num = parseInt(document.getElementById("countaddsubject").value);

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

function addSubject() {	
	if (num < '10' && document.getElementById("countaddsubject").value > 0){
		document.getElementById("countaddsubject").value = parseInt(countaddsubject.value) + 1;
		num = parseInt(document.getElementById("countaddsubject").value);
		var table = document.getElementById('addsubject');
		var rowCount = table.rows.length;
		var cellCount = table.rows[0].cells.length; 
		var row = table.insertRow(rowCount);
		for(var i =0; i <= cellCount; i++){
			cell = 'cell'+i;
			cell = row.insertCell(i);
			cell.innerHTML = ((document.getElementById("add" + i)||{}).innerHTML)||"";
			document.getElementsByName("addnum")[rowCount - 1].value = rowCount;
		}
	}
	else if (num < '10' && document.getElementById("countaddsubject").value == 0){
		document.getElementById("countaddsubject").value = parseInt(countaddsubject.value) + 1;
		num = parseInt(document.getElementById("countaddsubject").value);
		var table = document.getElementById('addsubject');
		var rowCount = table.rows.length;
		var cellCount = table.rows[0].cells.length; 
		var row = table.insertRow(rowCount);
		for (var i = 0; i <= cellCount; i++){
			cell = 'cell'+i;
			cell = row.insertCell(i);
		}
		cell1 = row.insertCell(0);
		cell2 = row.insertCell(1);
		cell3 = row.insertCell(2);
		cell4 = row.insertCell(3);
		cell5 = row.insertCell(4);
		cell6 = row.insertCell(5);
		cell7 = row.insertCell(6);
		cell1.id = "add0";
		cell2.id = "add1";
		cell3.id = "add2";
		cell4.id = "add3";
		cell5.id = "add4";
		cell6.id = "add5";
		cell7.id = "add6";
		cell1.innerHTML = '<input type="button" class="displaycount" name="addnum" value="1" style="width: 100%;">';
		cell2.innerHTML = '<input type="text" name="asubject" maxlength="5" value="" style="width: 100%;">';
		cell3.innerHTML = '<input type="text" name="asubjectname" value="" style="width: 100%;">';
		cell4.innerHTML = '<input type="text" name="asection" maxlength="6" value="" style="width: 100%;">';
		cell5.innerHTML = '<input type="text" name="asubdate" value="" style="width: 100%;">';
		cell6.innerHTML = '<input type="text" name="acredit" maxlength="1" value="" style="width: 100%;">';
		cell7.innerHTML = '<input type="text" name="ateachername" value="" style="width: 100%;">';
	}
}

function delSubject() {
	var table = document.getElementById('addsubject');
	var rowCount = table.rows.length;
	if(rowCount > '1' && num > '1'){
		var row = table.deleteRow(rowCount-1);
		document.getElementById("countaddsubject").value = parseInt(countaddsubject.value) - 1;
		num = parseInt(document.getElementById("countaddsubject").value);
		rowCount--;
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
	
	if(num == 0) {
		alertmsg = alertmsg.concat("\nต้องมีรายการถอนอย่างน้อย 1 วิชา");
		submitcheck = false;
	}
	
	for (var i = 0 ; i < (document.getElementById('addsubject')).rows.length - 1; i++){
		if (!document.getElementsByName("asubject")[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"รหัสวิชาที่ต้องการจะถอน\" หรือลบตารางช่องที่ " + (i+1));
			submitcheck = false;
		}
		if (!document.getElementsByName("asubjectname")[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"ชื่อวิชาที่ต้องการจะถอน\" หรือลบตารางช่องที่ " + (i+1));
			submitcheck = false;
		}
		if (!document.getElementsByName("asection")[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"Section ที่ต้องการจะถอน\" หรือลบตารางช่องที่ " + (i+1));
			submitcheck = false;
		}
		if (!document.getElementsByName("asubdate")[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"วัน/เวลา ที่เรียนของวิชาที่ต้องการจะถอน\" หรือลบตารางช่องที่ " + (i+1));
			submitcheck = false;
		}
		if (!document.getElementsByName("acredit")[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"หน่วยกิตของวิชาที่ต้องการจะถอน\" หรือลบตารางช่องที่ " + (i+1));
			submitcheck = false;
		}
		if (!document.getElementsByName("ateachername")[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"ชื่อผู้สอนของวิชาที่ต้องการจะถอน\" หรือลบตารางช่องที่ " + (i+1));
			submitcheck = false;
		}
				
		if (isNaN(document.getElementsByName("acredit")[i].value) && document.getElementsByName('acredit')[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"หน่วยกิตของวิชาที่ต้องการจะถอน\" ช่องที่ " + (i+1) + " ให้ถูกต้อง\n   - ต้องเป็นตัวเลข");
			submitcheck = false;
		}

		if (document.getElementsByName("asubject")[i].value.length != 5 && document.getElementsByName('asubject')[i].value){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"รหัสวิชาที่ต้องการจะถอน\" ช่องที่ " + (i+1) + " ให้ถูกต้อง\n   - ต้องมี 5 ตัวอักษรเท่านั้น");
			submitcheck = false;
		}
		if (isNaN(document.getElementsByName("asection")[i].value)||
			(document.getElementsByName("asection")[i].value).length != 6 && (document.getElementsByName('asection')[i].value)){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"Section ที่ต้องการจะถอน\" ช่องที่ " + (i+1) + " ให้ถูกต้อง\n   - ต้องเป็นตัวเลข\n   - ต้องมี 6 ตัวเลขเท่านั้น");
			submitcheck = false;
		}
		if (isNaN(document.getElementsByName("acredit")[i].value)){
			alertmsg = alertmsg.concat("\nกรุณากรอกข้อมูล \"หน่วยกิตของวิชาที่ต้องการจะถอน\" ช่องที่ " + (i+1) + " ให้ถูกต้อง\n   - ต้องเป็นตัวเลข");
			submitcheck = false;
		}
	}

	if(!document.getElementById('reason').value) {
		alertmsg = alertmsg.concat("\nกรุณากรอกเหตุผลที่ต้องการขอถอนรายวิชา");
		submitcheck = false;
	}
	if(submitcheck == false){
		alert(alertmsg);
		document.getElementById('submitcheck').value='false';
	}else 
		document.getElementById('submitcheck').value='true';
}

function printtoconsole(){
	const alljsondel = [];
	for (var i = 0; i < parseInt(document.getElementById("countaddsubject").value); i++){
		jsondropsub = {
			dropNo: i+1,
			subjectCode: document.getElementsByName("asubject")[i].value,
			subjectName: document.getElementsByName("asubjectname")[i].value,
			subjectSection: document.getElementsByName("asection")[i].value,
			subjectDate: document.getElementsByName("asubdate")[i].value,
			subjectCredit: document.getElementsByName("acredit")[i].value,
			subjectTeacher: document.getElementsByName("ateachername")[i].value
		}
		alljsondel.push(jsondropsub);
	}
	const obj = {
		formtype: "2",
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
		dropWSubjectList: alljsondel
	};
	const myJSON = JSON.stringify(obj, null);
	console.log(myJSON);
}

function submit() {
	checkInput();
	if(submitcheck) {
		localStorage.removeItem(document.getElementById("id").value+'reason2', reason.value);
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
		
	}
});

window.onload = function() {
	dates();
	setTimeout(() => {  
	reason.value = localStorage.getItem(document.getElementById("id").value+'reason2');
	reason.oninput = () => {
		localStorage.setItem(document.getElementById("id").value+'reason2', reason.value);
	}; }, 300);
};