import promptSync from "prompt-sync";
import fs from "fs";

const prompt = promptSync();
console.clear();

export function findBottom(n) {
  class Student {
    constructor(mssv, name, cpa) {
      this.mssv = mssv;
      this.name = name;
      this.cpa = parseFloat(cpa);
    }
  }

  class StudentManager {
    constructor(students) {
      this.students = students;
    }

    quickSort(arr, low, high) {
      if (low < high) {
        const pi = this.partition(arr, low, high);
        this.quickSort(arr, low, pi - 1);
        this.quickSort(arr, pi + 1, high);
      }
    }

    partition(arr, low, high) {
      const pivot = arr[high].cpa; // Lấy phần tử chốt là phần tử cuối cùng
      let i = low - 1; // Chỉ số của phần tử nhỏ hơn chốt

      for (let j = low; j < high; j++) {
        if (arr[j].cpa < pivot) {
          i++;
          // Hoán đổi arr[i] và arr[j]
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }

      // Hoán đổi phần tử chốt với phần tử lớn hơn chốt đầu tiên
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      return i + 1;
    }

    getTopNLowestCPA(n) {
      // Sắp xếp sinh viên theo CPA tăng dần bằng Quick Sort
      this.quickSort(this.students, 0, this.students.length - 1);

      // Lấy n phần tử đầu tiên
      const result = [];
      for (let i = 0; i < n && i < this.students.length; i++) {
        result.push(this.students[i]);
      }

      return result;
    }

    static fromJSON(jsonData) {
      // Chuyển đổi dữ liệu JSON thành danh sách đối tượng sinh viên
      const students = [];
      for (let data of jsonData) {
        students.push(new Student(data.mssv, data.name, data.cpa));
      }
      return new StudentManager(students);
    }
  }

  // Đọc dữ liệu từ tệp JSON
  const rawData = fs.readFileSync("dataStudent.json", "utf-8");
  const jsonData = JSON.parse(rawData);

  // Khởi tạo StudentManager từ dữ liệu JSON
  const studentManager = StudentManager.fromJSON(jsonData);

  // Tìm n sinh viên có CPA thấp nhất
  const topNLowestCPAStudents = studentManager.getTopNLowestCPA(n);

  // In kết quả ra màn hình
  console.log(`\nDanh sách ${n} sinh viên có CPA thấp nhất:`);
  for (let i = 0; i < topNLowestCPAStudents.length; i++) {
    const student = topNLowestCPAStudents[i];
    console.log(`${i + 1}. MSSV: ${student.mssv}, Tên: ${student.name}, CPA: ${student.cpa}`);
  }

  prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
  return;
}
