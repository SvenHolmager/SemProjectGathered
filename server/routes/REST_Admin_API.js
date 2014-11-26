var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');
var semester = mongoose.model('Semester');
var class1 = mongoose.model('Class');

/* GET A User From The DataBase */
router.get('/get/users', function (req, res) {
    user.find({}, function (err, users) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(users));
    });
});

router.get('/get/classes', function (req, res) {
    class1.find({}, function (err, classes) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(classes));
    });
});

router.get('/get/semesters', function (req, res) {
    semester.find({}, function (err, semesters) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(semesters));
    });
});


router.post('/create/user', function (req, res) {
    var createdUser = req.body;
    console.log(createdUser)
    user.create(createdUser, function (err, popUp) {

        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(popUp));
    });
});

router.post('/create/semester', function (req, res) {
    var semesterCreated = req.body;
    console.log(semesterCreated)
    semester.create(semesterCreated, function (err, popUp) {

        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(popUp));
    });
});

router.post('/create/class', function (req, res) {
    var classCreated = req.body;
    var semesterName = classCreated.semesterName;
    var className = classCreated.className;
    class1.create(classCreated, function (err, data) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
       /* semester.findOneAndUpdate({semesterName: semesterName}, {classes: arrOfClasses}, options, function (err, semesterData) {
            if (err) {
                res.status(err.status || 500);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }*/
            res.header("Content-type", "application/json");
            res.end(JSON.stringify(data));
        })
    //});
});

module.exports = router;
