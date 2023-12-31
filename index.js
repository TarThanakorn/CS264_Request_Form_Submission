// importing the dependencies
const express = require('express');
const session = require('express-session');
const { body, validationResult } = require('express-validator');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const cookieSession = require('cookie-session');
const dbConnection = require('./database');

// defining the Express app
const app = express();
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname,'other'));
app.set('view engine','ejs');
app.use(express.static('other'));

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(upload())

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  3600 * 1000 // 60 min
}));

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login');
    }
    next();
}
const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}

app.get('/', ifNotLoggedin, (req,res,next) => {
    return res.redirect('/home');
});

app.post('/', ifLoggedin, [
    body('username').custom((value) => {
        return dbConnection.execute('SELECT userName FROM accounts WHERE userName=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
            }
            return Promise.reject('ชื่อผู้ใช้ไม่ถูกต้อง');
        });
    }),
    body('password','กรุณากรอกรหัสผ่าน').trim().not().isEmpty(),
    ],(req, res) => {
    const validation_result = validationResult(req);
    const {password, username} = req.body;
    if(validation_result.isEmpty()){

        dbConnection.execute("SELECT * FROM `accounts` WHERE `userName`=?",[username])
        .then(([rows]) => {
            if(password == rows[0].userPwd){
                req.session.isLoggedIn = true;
                req.session.userID = rows[0].userName;
                req.session.typeAccount = rows[0].accStatus;
                res.redirect('/home');
            }
            else{
                res.render('login',{
                    login_errors:['รหัสผ่านไม่ถูกต้อง']
                });
            }
        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('login',{
            login_errors:allErrors
        });
    }
});

app.post('/upload', (req, res) => {
    if (req.body.form == '1'){
        if (req.body.submitcheck != 'false'){
            var allstradd = '[';
            var allstrrem = '[';
            if (parseInt(req.body.countaddsubject) == 1){
                for (var i = 0; i < parseInt(req.body.countaddsubject); i++){
                    allstradd = allstradd+'{"subjectCode": "'+req.body.asubject+'","subjectName": "'+req.body.asubjectname+'","subjectSection": "'+req.body.asection+'","subjectDate": "'+req.body.asubdate+'","subjectCredit": "'+req.body.acredit+'","subjectTeacher": "'+req.body.ateachername+'"}';
                }
                allstradd = allstradd+']';
            }else if (parseInt(req.body.countaddsubject) > 1){
                for (var i = 0; i < parseInt(req.body.countaddsubject); i++){
                    allstradd = allstradd+'{"subjectCode": "'+req.body.asubject[i]+'","subjectName": "'+req.body.asubjectname[i]+'","subjectSection": "'+req.body.asection[i]+'","subjectDate": "'+req.body.asubdate[i]+'","subjectCredit": "'+req.body.acredit[i]+'","subjectTeacher": "'+req.body.ateachername[i]+'"}';
                    if(i < parseInt(req.body.countaddsubject)-1)
                        allstradd = allstradd+',';
                }
                allstradd = allstradd+']';
            }
            if (parseInt(req.body.countdelsubject) == 1){
                for (var i = 0; i < parseInt(req.body.countdelsubject); i++){
                    allstrrem = allstrrem+'{"subjectCode": "'+req.body.dsubject+'","subjectName": "'+req.body.dsubjectname+'","subjectSection": "'+req.body.dsection+'","subjectDate": "'+req.body.dsubdate+'","subjectCredit": "'+req.body.dcredit+'","subjectTeacher": "'+req.body.dteachername+'"}';
                }
                allstrrem = allstrrem+']';
            }else if (parseInt(req.body.countdelsubject) > 1){
                for (var i = 0; i < parseInt(req.body.countdelsubject); i++){
                    allstrrem = allstrrem+'{"subjectCode": "'+req.body.dsubject[i]+'","subjectName": "'+req.body.dsubjectname[i]+'","subjectSection": "'+req.body.dsection[i]+'","subjectDate": "'+req.body.dsubdate[i]+'","subjectCredit": "'+req.body.dcredit[i]+'","subjectTeacher": "'+req.body.dteachername[i]+'"}';
                    if(i < parseInt(req.body.countdelsubject)-1)
                        allstrrem = allstrrem+',';
                }
                allstrrem = allstrrem+']';
            }
            dbConnection.execute("INSERT INTO form (id, date, fname, lname, years, field, addhouseno, addvillageno, addsubdistrict, adddistrict, addprovince, addpostalcode, phonenumber, number, teacher, formtype, addsub, remsub, reason) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.id, req.body.date, req.body.fname, req.body.lname, req.body.years, req.body.field, req.body.addhouseno, req.body.addvillageno, req.body.addsubdistrict, req.body.adddistrict, req.body.addprovince, req.body.addpostalcode, req.body.phonenumber, req.body.number, req.body.teacher, req.body.form, allstradd, allstrrem, req.body.reason], function (err) {
                if (err) res.send(err);
            });
            res.redirect('/form/1');
            res.end();
        }else{
            res.redirect('/form/1');
        }
    }
    if (req.body.form == '2'){
        if (req.body.submitcheck != 'false'){
            var allstradd = '[';
            if (parseInt(req.body.countaddsubject) == 1){
                for (var i = 0; i < parseInt(req.body.countaddsubject); i++){
                    allstradd = allstradd+'{"subjectCode": "'+req.body.asubject+'","subjectName": "'+req.body.asubjectname+'","subjectSection": "'+req.body.asection+'","subjectDate": "'+req.body.asubdate+'","subjectCredit": "'+req.body.acredit+'","subjectTeacher": "'+req.body.ateachername+'"}';
                }
                allstradd = allstradd+']';
            }else if (parseInt(req.body.countaddsubject) > 1){
                for (var i = 0; i < parseInt(req.body.countaddsubject); i++){
                    allstradd = allstradd+'{"subjectCode": "'+req.body.asubject[i]+'","subjectName": "'+req.body.asubjectname[i]+'","subjectSection": "'+req.body.asection[i]+'","subjectDate": "'+req.body.asubdate[i]+'","subjectCredit": "'+req.body.acredit[i]+'","subjectTeacher": "'+req.body.ateachername[i]+'"}';
                    if(i < parseInt(req.body.countaddsubject)-1)
                        allstradd = allstradd+',';
                }
                allstradd = allstradd+']';
            }
            dbConnection.execute("INSERT INTO form (id, date, fname, lname, years, field, addhouseno, addvillageno, addsubdistrict, adddistrict, addprovince, addpostalcode, phonenumber, number, teacher, formtype, remsub, reason) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.id, req.body.date, req.body.fname, req.body.lname, req.body.years, req.body.field, req.body.addhouseno, req.body.addvillageno, req.body.addsubdistrict, req.body.adddistrict, req.body.addprovince, req.body.addpostalcode, req.body.phonenumber, req.body.number, req.body.teacher, req.body.form, allstradd, req.body.reason], function (err) {
                if (err) res.send(err);
            });
            res.redirect('/form/1');
            res.end();
        }else{
            res.redirect('/form/1');
        }
    }
    if (req.body.form == '3'){
        if (req.body.submitcheck != 'false'){
            dbConnection.execute("INSERT INTO form (id, date, fname, lname, years, field, addhouseno, addvillageno, addsubdistrict, adddistrict, addprovince, addpostalcode, phonenumber, number, teacher, formtype, reason) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.id, req.body.date, req.body.fname, req.body.lname, req.body.years, req.body.field, req.body.addhouseno, req.body.addvillageno, req.body.addsubdistrict, req.body.adddistrict, req.body.addprovince, req.body.addpostalcode, req.body.phonenumber, req.body.number, req.body.teacher, req.body.form, req.body.reason], function (err) {
                if (err) res.send(err);
            });
            res.redirect('/form/3');
            res.end();
        }else{
            res.redirect('/form/3');
        }
    }
    if (req.body.form == '4'){
        if (req.body.submitcheck != 'false'){
            var filename = ''
            if(req.files){
                const date = new Date();
                var datestr;
                if (date.getMonth() < 9){
                    if (date.getDate() <= 9)
                        datestr = date.getFullYear() + '-0' + (date.getMonth()+1) + '-0' + date.getDate();
                    else
                        datestr = date.getFullYear() + '-0' + (date.getMonth()+1) + '-' + date.getDate();
                }else {
                    if (date.getDate() <= 9)
                        datestr = date.getFullYear() + '-' + (date.getMonth()+1) + '-0' + date.getDate();
                    else
                        datestr = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
                }
                var file = req.files.file
                filename = datestr+"_"+req.session.userID+"_"+file.name
                file.mv('./other/uploads/'+filename, function(err){
                    if(err) res.send(err);
                })
            }
            dbConnection.execute("INSERT INTO form (id, date, fname, lname, years, field, addhouseno, addvillageno, addsubdistrict, adddistrict, addprovince, addpostalcode, phonenumber, number, teacher, formtype, reason, story, filename) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.id, req.body.date, req.body.fname, req.body.lname, req.body.years, req.body.field, req.body.addhouseno, req.body.addvillageno, req.body.addsubdistrict, req.body.adddistrict, req.body.addprovince, req.body.addpostalcode, req.body.phonenumber, req.body.number, req.body.teacher, req.body.form, req.body.reason, req.body.story, filename], function (err) {
                if (err) res.send(err);
            });
            res.redirect('/form/4');
            res.end(); 
        }else{
            res.redirect('/form/4');
        }
    }

})

app.get('/fillForm', (req, res) => {
    dbConnection.execute("SELECT * FROM data WHERE id=?",[req.session.userID])
    .then(([rows]) => {
        res.send(rows[0]);          
    });
});

app.get('/getid', (req, res) => {
    dbConnection.execute("SELECT * FROM accounts WHERE userName=?",[req.session.userID])
    .then(([rows]) => {
        res.send(rows[0]);          
    });
});

app.get('/st', (request, response) => {
    fetchForm(request, response);
});

app.get('/ap', (request, response) => {
    fetchApprove(request, response);
});

function fetchForm (request, response){
    dbConnection.execute("SELECT * FROM form WHERE id=?",[request.session.userID])
    .then((result) => {
        response.send(result);    
    });
}

function fetchApprove (request, response){
    dbConnection.execute("SELECT * FROM form WHERE status=?",[request.session.typeAccount])
    .then((result) => {
        response.send(result);    
    });
}

app.get('/delete/:id', (request, response) => {
    dbConnection.execute("SELECT id FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var uid = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            uid = JSON.parse(x);
        }
        if (uid.id == request.session.userID){
            dbConnection.execute("UPDATE form SET status='9' WHERE formid=?",[request.params.id])
            .then((result) => {
            });
            response.redirect('/status');
            response.end(); 
        }else{
            response.redirect('/status');
            response.end(); 
        }
    });
});

app.get('/apv/:id', (request, response) => {
    dbConnection.execute("SELECT status FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var status = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            status = JSON.parse(x);
        }
        if (status.status == request.session.typeAccount){
            dbConnection.execute("UPDATE form SET status=? WHERE formid=?",[parseInt(request.session.typeAccount)+1,request.params.id])
            .then((result) => {
                response.send(result);
            }); 
        }else{
            response.redirect('/home');
            response.end(); 
        }
    });
});

app.get('/rej/:id', (request, response) => {
    dbConnection.execute("SELECT status FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var status = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            status = JSON.parse(x);
        }
        if (status.status == request.session.typeAccount){
            dbConnection.execute("UPDATE form SET status='0' WHERE formid=?",[request.params.id])
            .then((result) => {
                response.send(result);
            }); 
        }else{
            response.redirect('/home');
            response.end(); 
        }
    });
});

app.get('/approve1/:id', (request, response) => {
    if(request.session.isLoggedIn && request.session.typeAccount != 1)
        response.sendFile(path.join(__dirname + '/other/approve1.html'));
    else
        response.redirect('/home');
});

app.get('/approve1/:id/show', (request, response) => {
    dbConnection.execute("SELECT status FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var status = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            status = JSON.parse(x);
        }
        if (status.status == request.session.typeAccount){
            dbConnection.execute("SELECT * FROM form WHERE formid=?",[request.params.id])
            .then(([rows]) => {
                response.send(rows[0]);          
            });
        }else{
            response.redirect('/logout');
            response.end(); 
        }
    });
});

app.get('/approve2/:id', (request, response) => {
    response.sendFile(path.join(__dirname + '/other/approve2.html'));
});

app.get('/approve2/:id/show', (request, response) => {
    dbConnection.execute("SELECT status FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var status = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            status = JSON.parse(x);
        }
        if (status.status == request.session.typeAccount){
            dbConnection.execute("SELECT * FROM form WHERE formid=?",[request.params.id])
            .then(([rows]) => {
                response.send(rows[0]);          
            });
        }else{
            response.redirect('/logout');
            response.end(); 
        }
    });
});

app.get('/approve3/:id', (request, response) => {
    response.sendFile(path.join(__dirname + '/other/approve3.html'));
});

app.get('/approve3/:id/show', (request, response) => {
    dbConnection.execute("SELECT status FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var status = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            status = JSON.parse(x);
        }
        if (status.status == request.session.typeAccount){
            dbConnection.execute("SELECT * FROM form WHERE formid=?",[request.params.id])
            .then(([rows]) => {
                response.send(rows[0]);          
            });
        }else{
            response.redirect('/logout');
            response.end(); 
        }
    });
});

app.get('/approve4/:id', (request, response) => {
    response.sendFile(path.join(__dirname + '/other/approve4.html'));
});

app.get('/approve4/:id/show', (request, response) => {
    dbConnection.execute("SELECT status FROM form WHERE formid=?",[request.params.id])
    .then((result) => {
        var status = ''
        if(result != null){
            var x = JSON.stringify(result[0]);
            x = x.replace("[", "")
            x = x.replace("]", "")
            status = JSON.parse(x);
        }
        if (status.status == request.session.typeAccount){
            dbConnection.execute("SELECT * FROM form WHERE formid=?",[request.params.id])
            .then(([rows]) => {
                response.send(rows[0]);          
            });
        }else{
            response.redirect('/logout');
            response.end(); 
        }
    });
});

app.get('/home', function(request, response) {
    if(request.session.isLoggedIn )
        if (request.session.typeAccount == '1')
            response.sendFile(path.join(__dirname + '/other/home.html'));
        else if (request.session.typeAccount == '2' || request.session.typeAccount == '3' || request.session.typeAccount == '4')
            response.sendFile(path.join(__dirname + '/other/approver.html'));
        else
            response.redirect('/logout');
    });

app.get('/status', function(request, response) {
    if(request.session.isLoggedIn )
        if (request.session.typeAccount == '1')
            response.sendFile(path.join(__dirname + '/other/status.html'));
        else
            response.redirect('/logout');
    });

app.get('/form/1', function(request, response) {
    if(request.session.isLoggedIn)
        if (request.session.typeAccount == '1')
            response.sendFile(path.join(__dirname + '/other/form1.html'));
        else
            response.redirect('/logout');
    });

app.get('/form/2', function(request, response) {
    if(request.session.isLoggedIn)
        if (request.session.typeAccount == '1')
            response.sendFile(path.join(__dirname + '/other/form2.html'));
        else
            response.redirect('/logout');

    });

app.get('/form/3', function(request, response) {
    if(request.session.isLoggedIn)
        if (request.session.typeAccount == '1')
            response.sendFile(path.join(__dirname + '/other/form3.html'));
        else
            response.redirect('/logout');

    });

app.get('/form/4', function(request, response) {
    if(request.session.isLoggedIn)
        if (request.session.typeAccount == '1')
            response.sendFile(path.join(__dirname + '/other/form4.html'));
        else
            response.redirect('/logout');
    });

app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});