const btn = document.getElementById("loadBtn");
const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const gradeSelect = document.getElementById("grade");
const gradeControls = document.getElementById("gradeControls");

let isShowingGrades = false;

async function loadData() {
    errorDiv.textContent = "";

    if (isShowingGrades) {
        gradeControls.style.display = "none";
        output.innerHTML = "";
        btn.textContent = "Check Other Grades";
        isShowingGrades = false;

        return;
    }

    gradeControls.style.display = "block";

    btn.textContent = "Hide Other Grades";

    isShowingGrades = true;
    
    await fetchSelectedGrade();
} 

async function fetchSelectedGrade() {
    output.textContent = "Loading...";

    try {
        const selectedGrade = gradeSelect.value;
        const response = await fetch(`http://localhost:3000/students?grade=${encodeURIComponent(selectedGrade)}`);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const students = await response.json();
        displayStudents(students);
    } catch (err) {
        output.textContent = "";
        errorDiv.textContent = "Something went wrong:" + err.message;
    }
}

function displayStudents(students) {
    output.innerHTML = "";

    if (students.length === 0) {
        output.textContent = "No students found for this grade.";
        return;
    }

    students.forEach(function(student) {
        const p = document.createElement("p");
        p.textContent = `${student.name} - ${student.grade} - Class ${student.class}`;

        output.appendChild(p);
    });
}

gradeSelect.addEventListener("change", fetchSelectedGrade);

btn.addEventListener("click", loadData);