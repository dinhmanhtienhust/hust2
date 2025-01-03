import promptSync from "prompt-sync";
import fs from 'fs';

// Sử dụng thư viện prompt-sync để nhận đầu vào từ người dùng
const prompt = promptSync();

export function modify(mssv, cpa) {
  // Đường dẫn tới tệp JSON
  const filePath = './dataStudent.json';

  // Đọc dữ liệu từ file JSON
  try {
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


    console.clear();

    let found = false;

    // Hàm tìm kiếm nhị phân (Binary Search) để tìm sinh viên theo MSSV
    function binarySearch(arr, mssv) {
      let low = 0;
      let high = arr.length - 1;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        // So sánh MSSV dưới dạng chuỗi
        if (arr[mid].mssv.toString() === mssv.toString()) {
          return mid; // Tìm thấy sinh viên
        } else if (arr[mid].mssv.toString() < mssv.toString()) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      return -1; // Không tìm thấy
    }

    // Tìm kiếm sinh viên theo MSSV
    const index = binarySearch(students, mssv);

    if (index !== -1) {
      // Cập nhật CPA
      students[index].cpa = cpa;

      // Cập nhật giá trị canhcao dựa trên CPA
      if (cpa <= 0.5) students[index].canhcao = 3;
      else if (cpa <= 1.0) students[index].canhcao = 2;
      else if (cpa <= 1.5) students[index].canhcao = 1;
      else students[index].canhcao = 0;

      console.log("Cập nhật điểm CPA thành công");
      console.log("Dữ liệu đã được lưu vào file: dataStudent.json");

      // Lưu lại dữ liệu sau khi sửa
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2), 'utf-8');
    } else {
      console.log(`Không tìm thấy sinh viên nào có MSSV: ${mssv}`);
    }
  } catch (error) {
    console.error("Lỗi khi đọc hoặc ghi tệp:", error);
  }

  // Nhấn phím Enter để tiếp tục
  prompt("Nhấn phím Enter để tiếp tục");
}
