const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const DB_FILE = "./backend/db.json";

// قراءة البيانات
function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}

// حفظ البيانات
function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// تسجيل مستخدم
app.post("/register", (req, res) => {
    const db = readDB();
    db.users.push(req.body);
    saveDB(db);

    res.json({ message: "User registered" });
});

// تسجيل تحويل وهمي
app.post("/transfer", (req, res) => {
    const db = readDB();
    db.transfers.push(req.body);
    saveDB(db);

    res.json({ message: "Transfer saved (demo)" });
});

// تشغيل السيرفر
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
