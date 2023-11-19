document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
});

function addStudent() {
    var name = document.getElementById('name').value;
    var rollNo = document.getElementById('rollNo').value;
    var regNo = document.getElementById('regNo').value;
    var section = document.getElementById('section').value;
    var report = document.getElementById('report').value;

    if (!name || !rollNo || !regNo || !section || !report) {
        alert('Please fill in all fields.');
        return;
    }

    var student = {
        name: name,
        rollNo: rollNo,
        regNo: regNo,
        section: section,
        report: report
    };

    var students = getStudents();
    students.push(student);
    saveStudents(students);

    displayStudents();
    clearForm();
}

function clearForm() {
    document.getElementById('studentForm').reset();
}

function displayStudents() {
    var students = getStudents();
    var studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    students.forEach(function(student, index) {
        var studentEntry = document.createElement('div');
        studentEntry.classList.add('student-entry');
        studentEntry.innerHTML = `
            <strong>${student.name}</strong> -
            Roll No.: ${student.rollNo}, 
            Reg No.: ${student.regNo}, 
            Section: ${student.section}, 
            Report: ${student.report}
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
        studentList.appendChild(studentEntry);
    });
}

function editStudent(index) {
    var students = getStudents();
    var student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('rollNo').value = student.rollNo;
    document.getElementById('regNo').value = student.regNo;
    document.getElementById('section').value = student.section;
    document.getElementById('report').value = student.report;

    students.splice(index, 1); // Remove the existing entry
    saveStudents(students);

    displayStudents();
}

function deleteStudent(index) {
    var students = getStudents();
    students.splice(index, 1);
    saveStudents(students);
    displayStudents();
}

function getStudents() {
    var studentsJSON = localStorage.getItem('students');
    return studentsJSON ? JSON.parse(studentsJSON) : [];
}

function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudents() {
    displayStudents();
}
