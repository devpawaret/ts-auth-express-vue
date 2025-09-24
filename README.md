# 🔐 Authentication System

---

## 📖 เกี่ยวกับ

โปรเจกต์นี้พัฒนาขึ้นมาเพื่อแสดงการทำงานของระบบ Login/Register โดยใช้ **JWT** เพื่อให้ผู้ใช้สามารถเข้าสู่ระบบได้อย่างปลอดภัย

---

## 🛠 เทคโนโลยีที่ใช้

### Front-end
  - Vue 3
  - TailwindCSS

### Back-end
  - Express.js
  - Prisma
  - JWT (JsonWebToken)

### Database
  - MySQL (MariaDB)

---

## ⚙️ Flow การทำงาน
1. **Register**
   - cl: ผู้ใช้กรอก `username`, `password`, `confirmPassword`
   - sv:
     - ตรวจสอบ username
     - hash รหัสผ่าน
     - บันทึกลงฐานข้อมูล
     - ตอบกลับด้วย `message`

2. **Login**
   - cl: ผู้ใช้กรอก `username`, `password`
   - sv:
     - ดึงข้อมูล **user** จากฐานข้อมูลด้วย username
     - ตรวจสอบรหัสผ่าน
     - สร้าง **Access Token** และ **Refresh Token**
     - ตอบกลับพร้อม `user` + `accessToken` + `message`

3. **Logout**
   - sv:
     - ลบ **Refresh Token** ที่ httpOnly cookie
     - ตอบกลับด้วย `message`

---

## 🔐 Security
- `refreshToken` เก็บไว้ที่ **httpOnly cookie**
- `accessToken` และ `user` เก็บไว้ที่ memory
- ใช้ **bcrypt** สำหรับ hash รหัสผ่าน
- Middleware ตรวจสอบ JWT เพื่อยืนยันสิทธิ์
