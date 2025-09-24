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

---

## ⚙️ Flow การทำงาน
1. **Register**
   - cl: ผู้ใช้กรอก `username`, `password`, `confirmPassword`
   - sv:
     1. ตรวจสอบ username
     2. hash รหัสผ่าน
     3. บันทึกลงฐานข้อมูล
     4. ตอบกลับด้วย `message`

2. **Login**
   - cl: ผู้ใช้กรอก `username`, `password`
   - sv:
     1. ดึงข้อมูล **user** จากฐานข้อมูลด้วย username
     2. ตรวจสอบรหัสผ่าน
     3. สร้าง **Access Token** และ **Refresh Token**
     4. ตอบกลับพร้อม `user` + `accessToken` + `message`

3. **Logout**
   - sv:
     1. ลบ **Refresh Token** ที่ httpOnly cookie
     2. ตอบกลับด้วย `message`

---

## 🔐 Security
- `refreshToken` เก็บไว้ที่ **httpOnly cookie**
- `accessToken` เก็บไว้ที่ memory
- ใช้ **bcrypt** สำหรับ hash password
- Middleware ตรวจสอบ JWT เพื่อยืนยันสิทธิ์
