import promptSync from "prompt-sync";
// Sử dụng thư viện prompt-sync để nhận đầu vào từ người dùng
const prompt = promptSync();
import fs from 'fs';
export function classify() {
class Student {
    constructor(id, name, cpa) {
        this.id = id;
        this.name = name;
        this.cpa = parseFloat(cpa);
    }

    getAcademicPerformance() {
        // Phân loại sinh viên dựa trên CPA
        if (this.cpa >= 3.6) {
            return 'Xuất sắc';
        } else if (this.cpa >= 3.2) {
            return 'Giỏi';
        } else if (this.cpa >= 2.5) {
            return 'Khá';
        } else if (this.cpa >= 2.0) {
            return 'Trung bình';
        } else {
            return 'Yếu';
        }
    }
}

class StudentManager {
    constructor(students) {
        this.students = students;
    }

    getAcademicPerformanceCounts() {
        // Tính số lượng sinh viên theo học lực
        const counts = {
            'Xuất sắc': 0,    // Xuất sắc: CPA ≥ 3.6
            'Giỏi': 0,        // Giỏi: 3.2 ≤ CPA < 3.6
            'Khá': 0,         // Khá: 2.5 ≤ CPA < 3.2
            'Trung bình': 0,  // Trung bình: 2.0 ≤ CPA < 2.5
            'Yếu': 0          // Yếu: CPA < 2.0
        };

        this.students.forEach(student => {
            const performance = student.getAcademicPerformance();
            counts[performance]++;
        });

        return counts;
    }

    static fromJSON(jsonData) {
        // Chuyển đổi dữ liệu JSON thành danh sách đối tượng sinh viên
        const students = jsonData.map(data => new Student(data.id, data.name, data.cpa));
        return new StudentManager(students);
    }
}
console.clear();
// Đọc dữ liệu từ tệp JSON được cung cấp
try {
    const rawData = fs.readFileSync('dataStudent.json', 'utf-8');
    const jsonData = JSON.parse(rawData);

    // Khởi tạo StudentManager
    const studentManager = StudentManager.fromJSON(jsonData);

    // Tính số lượng sinh viên theo học lực
    const performanceCounts = studentManager.getAcademicPerformanceCounts();

    // In kết quả
    console.log('Số lượng sinh viên theo học lực:');
    console.log('Xuất sắc:', performanceCounts['Xuất sắc']);
    console.log('Giỏi:', performanceCounts['Giỏi']);
    console.log('Khá:', performanceCounts['Khá']);
    console.log('Trung bình:', performanceCounts['Trung bình']);
    console.log('Yếu:', performanceCounts['Yếu']);
} catch (error) {
    console.error('Lỗi khi đọc hoặc xử lý dữ liệu JSON:', error);
}
prompt("Nhấn phím Enter để tiếp tục..."); // Chờ người dùng nhấn Enter để tiếp tục
return;
}