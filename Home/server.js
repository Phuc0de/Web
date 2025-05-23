const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

// Phục vụ file tĩnh từ thư mục "public"
app.use(express.static(path.join(__dirname, "public")));

// Cấu hình kết nối database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fallinlove123",
    database: "Sql_Server",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Lỗi kết nối CSDL:", err);
        return;
    }
    console.log("✅ Đã kết nối MySQL");
});

// Route đăng ký
app.post("/submit", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("⚠️ Thiếu thông tin");
    }

    const sql = "INSERT INTO new_table (username, gmail, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error("❌ Lỗi khi chèn:", err);
            return res.status(500).send("❌ Lỗi máy chủ");
        }
        console.log("✅ Đăng ký thành công:", result.insertId);
        res.status(200).send("Đăng ký thành công!");
    });
});

// Route đăng nhập (nếu cần)
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM new_table WHERE gmail = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false });

        if (results.length > 0) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false });
        }
    });
});

app.listen(port, () => {
    console.log(`🚀 Server chạy tại http://localhost:${port}`);
});
