# mkdir "ชื่อ Folder" --> คำสั่งสร้าง Folder
    - mkdir ts-node-express-auth

# สร้างไฟล์ package.json
    - yarn init -y

# ติดตั้ง dependency
    ทั่วไป
        - yarn add express morgan cors dotenv jsonwebtoken @types/jsonwebtoken @prisma/client

    สำหรับ dev
        - yarn add -D typescript ts-node @types/node @types/express nodemon @types/cors prettier prisma

# สร้างไฟล์ tsconfig.json
    - yarn run tsc --init

# สร้างไฟล์ schema prisma
    - yarn run prisma init

# สร้างและ Migrate ฐานข้อมูล (name "ชื่อ")
    - yarn prisma migrate dev --name init

