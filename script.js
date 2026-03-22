let students = [];

function calculateAverage(scores) {
    let sum = scores.reduce((a, b) => a + b, 0);
    return (sum / scores.length).toFixed(2);
}

function assignGrade(avg) {
    if (avg >= 80) return "A";
    if (avg >= 70) return "B";
    if (avg >= 60) return "C";
    if (avg >= 50) return "D";
    return "F";
}

function addStudent() {
    let name = document.getElementById("name").value;
    let scores = document.getElementById("scores").value
        .split(",")
        .map(Number);

    let avg = calculateAverage(scores);
    let grade = assignGrade(avg);

    students.push({ name, scores, average: avg, grade });

    displayStudents(students);
    clearInputs();
}

function displayStudents(data) {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    data.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.scores.join(", ")}</td>
                <td>${student.average}</td>
                <td>${student.grade}</td>
                <td>
                    <button onclick="removeStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    calculateStats();
}

function filterStudents() {
    let grade = document.getElementById("gradeFilter").value;

    if (grade === "all") {
        displayStudents(students);
    } else {
        let filtered = students.filter(s => s.grade === grade);
        displayStudents(filtered);
    }
}

function searchStudent() {
    let search = document.getElementById("search").value.toLowerCase();

    let result = students.filter(s =>
        s.name.toLowerCase().includes(search)
    );

    displayStudents(result);
}

function removeStudent(index) {
    students.splice(index, 1);
    displayStudents(students);
}

function calculateStats() {
    if (students.length === 0) {
        document.getElementById("stats").innerText = "";
        return;
    }

    let averages = students.map(s => parseFloat(s.average));
    let total = averages.reduce((a, b) => a + b, 0);

    let classAvg = (total / students.length).toFixed(2);
    let highest = Math.max(...averages);
    let lowest = Math.min(...averages);

    document.getElementById("stats").innerText =
        `Class Average: ${classAvg}, Highest: ${highest}, Lowest: ${lowest}`;
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("scores").value = "";
}
