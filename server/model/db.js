var mongoose = require('mongoose');

/*

 Note:
 To this test project as it is:

 Start your MongoDB database.
 Start mongo.exe and do:
 use testdb
 db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
 db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
 db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
 db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})
 db.userSchema.insert({})

 */
var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != "undefined") {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = 'mongodb://localhost/test';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
var usersSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    email: String,
    password: String,
    created: {type: Date, default: new Date()}
});


var teacherSchema = new mongoose.Schema({
    teachesAt: [{class: String}]
});

var studentSchema = new mongoose.Schema({
    class: String
});

var classSchema = new mongoose.Schema({
    className: {type: String, unique: true},
    students: [{studentsInClass: String}],
    teachers: [{teachersInClass: String}],
    semesterName: String
})

var semesterSchema = new mongoose.Schema({
    semesterName: String,
    dateFrom: {type: Date, default: new Date()},
    dateTo: {type: Date, default: new Date()},
    classes: [{allClasses: String}],
    maxPoints: String,
    reqPoints: String,
    periods: [{
        name: String, maxPoints: String,
        tasks: [{name: String, maxPoints: String}]
    }]
});

var pointsSchema = new mongoose.Schema({
    studentName: String
})

mongoose.model('User', usersSchema, "usersSchema");
mongoose.model('Teacher', teacherSchema, "teacherSchema");
mongoose.model('Student', studentSchema, "studentSchema");
mongoose.model('Class', classSchema, "classSchema");
mongoose.model('Semester', semesterSchema, "semesterSchema");
mongoose.model('Points', pointsSchema, "pointsSchema");
