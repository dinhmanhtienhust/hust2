import promptSync from "prompt-sync";
import fs from "fs";

const prompt = promptSync();
console.clear();

export function findWarning() {
  class Student {
    constructor(mssv, name, cpa) {
      this.mssv = mssv;
      this.name = name;
      this.cpa = parseFloat(cpa);
    }

    
    getWarningLevel() {
      // Xác định mức cảnh cáo dựa trên CPA
      if (this.cpa <= 0.5) {
        return 3; // Mức cảnh cáo 3
      } else if (this.cpa > 0.5 && this.cpa <= 1.0) {
        return 2; // Mức cảnh cáo 2
      } else if (this.cpa > 1.0 && this.cpa <= 1.5) {
        return 1; // Mức cảnh cáo 1
      } else {
        return 0; // Không bị cảnh cáo
      }
    }
  }

  class StudentManager {
    constructor(students) {
      this.students = students;
    }

    getWarningStudents() {
      // Lấy danh sách sinh viên bị cảnh cáo kèm mức cảnh cáo
      const warningStudents = [];
      for (let i = 0; i < this.students.length; i++) {
        const student = this.students[i];
        const warningLevel = student.getWarningLevel();
        if (warningLevel > 0) {
          warningStudents.push({
            mssv: student.mssv,
            name: student.name,
            cpa: student.cpa,
            warningLevel: warningLevel,
          });
        }
      }

      // Sắp xếp danh sách sinh viên bị cảnh cáo theo mức cảnh cáo giảm dần
      this.quickSort(warningStudents, 0, warningStudents.length - 1);
      return warningStudents;
    }

    quickSort(arr, low, high) {
      if (low < high) {
        const pi = this.partition(arr, low, high);

        this.quickSort(arr, low, pi - 1);
        this.quickSort(arr, pi + 1, high);
      }
    }

    partition(arr, low, high) {
      const pivot = arr[high].warningLevel;
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j].warningLevel > pivot) { // Sắp xếp giảm dần
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    }

    static fromJSON(jsonData) {
      // Chuyển đổi dữ liệu JSON thành danh sách đối tượng sinh viên
      const students = [];
      for (let i = 0; i < jsonData.length; i++) {
        const data = jsonData[i];
        students.push(new Student(data.mssv, data.name, data.cpa));
      }
      return new StudentManager(students);
    }
  }

  // Đọc dữ liệu từ tệp JSON thủ công
  const rawData = fs.readFileSync("dataStudent.json", "utf-8");
  let jsonData = "";
  for (let i = 0; i < rawData.length; i++) {
    jsonData += rawData[i];
  }
  jsonData = JSON.parse(jsonData);

  // Khởi tạo StudentManager
  const studentManager = StudentManager.fromJSON(jsonData);

  // Tìm danh sách các sinh viên bị cảnh cáo kèm mức cảnh cáo
  const warningStudents = studentManager.getWarningStudents();

  // Hiển thị danh sách sinh viên bị cảnh cáo và mức cảnh cáo
  console.log("Danh sách sinh viên bị cảnh cáo:");
  for (let i = 0; i < warningStudents.length; i++) {
    const student = warningStudents[i];
    console.log(
      `- MSSV: ${student.mssv}, Tên: ${student.name}, CPA: ${student.cpa}, Mức cảnh cáo: ${student.warningLevel}`
    );
  }

  prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
  return;
}

