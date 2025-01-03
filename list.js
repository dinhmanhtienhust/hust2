// Import module fs
import promptSync from 'prompt-sync';
import fs from 'fs';
const prompt = promptSync();
export function list() {
  // Đường dẫn tới tệp JSON
  const filePath = './dataStudent.json';

  try {
    // Đọc dữ liệu từ file JSON (đồng bộ)
    const data = fs.readFileSync(filePath, 'utf8'); // Đọc tệp dưới dạng chuỗi

    // Chuyển đổi JSON thành đối tượng JavaScript mà không dùng JSON.parse
    const students = [];
    let temp = '';
    let inObject = false;

    for (let i = 0; i < data.length; i++) {
      if (data[i] === '{') {
        inObject = true;
        temp = '';
      }
      if (inObject) {
        temp += data[i];
      }
      if (data[i] === '}') {
        inObject = false;
        students.push(eval('(' + temp + ')'));
      }
    }

    // Thuật toán lọc sinh viên bằng cách duyệt từng phần tử
    const filteredStudents = [];

    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      // Trích xuất năm từ MSSV của sinh viên
      let year = '';
      for (let j = 0; j < 4; j++) {
        year += student.mssv.toString()[j];
      }

      // Chuyển đổi chuỗi năm thành số và kiểm tra điều kiện
      const studentYear = parseInt(year);
      if (studentYear >= 2019 && studentYear <= 2023) {
        filteredStudents.push(student);
      }
    }

    // In danh sách sinh viên đã lọc
    console.log("Danh sách sinh viên từ năm 2019 đến 2023:");
    for (let i = 0; i < filteredStudents.length; i++) {
      const student = filteredStudents[i];
      console.log(`MSSV: ${student.mssv}, họ và tên: ${student.name}`);
    }

  } catch (err) {
    console.error("Lỗi khi đọc hoặc phân tích cú pháp tệp JSON:", err.message);
    process.exit(1); // Thoát chương trình nếu có lỗi
  } 
  prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
  return;
}
