angular.module("formModule", [])
.controller("formController", function ($scope, $http, $sce) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3001/ap",
			method: "GET",
		}).then(function (response) {
			$http({
				url: "http://localhost:3001/getid",
				method: "GET",
			}).then(function (response) {
				$scope.id = response.data.userName;
				if(response.data.accStatus == '2'){
					$scope.userstatus = 'เจ้าหน้าที่มหาวิทยาลัย'
				}else if (response.data.accStatus == '3'){
					$scope.userstatus = 'อาจารย์ที่ปรึกษา'
				}else if (response.data.accStatus == '4'){
					$scope.userstatus = 'คณบดี'
				}
			});
			result = response.data[0];
			var strTable = '<table><tr> <th>เลขคำร้อง</th> <th>วันที่</th> <th>ประเภทคำร้อง</th> <th>สถานะ</th> <th>ดูข้อมูล</th> </tr>';
			for(var row in result){
				strTable = strTable+'<tr>';
				strTable = strTable+'<td><label>#' + result[row].formid + '</label></td>';
				strTable = strTable+'<td><label>' + result[row].date + '</label></td>';
				if (result[row].formtype == '1')
					strTable = strTable+'<td><label>คำร้องเพิ่มถอนล่าช้า</label></td>';
				if (result[row].formtype == '2')
					strTable = strTable+'<td><label>คำร้องถอน W</label></td>';
				if (result[row].formtype == '3')
					strTable = strTable+'<td><label>คำร้องลาออก</label></td>';
				if (result[row].formtype == '4')
					strTable = strTable+'<td><label>คำร้องอื่น ๆ</label></td>';
				if (result[row].status == '9')
					strTable = strTable+'<td><label style = "color : red">ยกเลิก</label></td>';
				if (result[row].status == '0')
					strTable = strTable+'<td><label style = "color : red">ไม่สำเร็จ</label></td>';
				if (result[row].status == '2')
					strTable = strTable+'<td><label style = "color : rgb(0, 149, 255)">กำลังตรวจเอกสาร</label></td>';
				if (result[row].status == '3')
					strTable = strTable+'<td><label style = "color : rgb(0, 149, 255)">รอการอนุมัติจากอาจารย์</label></td>';
				if (result[row].status == '4')
					strTable = strTable+'<td><label style = "color : rgb(0, 149, 255)">รอการอนุมัติจากคณบดี</label></td>';
				if (result[row].status == '5')
					strTable = strTable+'<td><label style = "color : green">สำเร็จ</label></td>';
				if (result[row].status != '0' && result[row].status != '9')
					if(result[row].formtype == '1')
						strTable = strTable+'<td><label><a href="/approve1/'+result[row].formid+'" style = "color : green">ดูข้อมูลคำร้อง</a></label></td>';
					if(result[row].formtype == '2')
						strTable = strTable+'<td><label><a href="/approve2/'+result[row].formid+'" style = "color : green">ดูข้อมูลคำร้อง</a></label></td>';
					if(result[row].formtype == '3')
						strTable = strTable+'<td><label><a href="/approve3/'+result[row].formid+'" style = "color : green">ดูข้อมูลคำร้อง</a></label></td>';
					if(result[row].formtype == '4')
						strTable = strTable+'<td><label><a href="/approve4/'+result[row].formid+'" style = "color : green">ดูข้อมูลคำร้อง</a></label></td>';
				strTable = strTable+'</tr>';
			}
			strTable = strTable+'</table>';
			$scope.test = $sce.trustAsHtml(strTable);
		});
		
	}
});