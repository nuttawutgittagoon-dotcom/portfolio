# Portfolio Website

พอร์ตโฟลิโอส่วนตัวสไตล์ Vercel - สร้างด้วย HTML, CSS, JavaScript และ PHP

## คุณสมบัติ

- ✨ ดีไซน์สไตล์ Vercel (minimal, modern, clean)
- 🌙 Dark/Light Mode พร้อม localStorage
- 📱 Responsive Design (Mobile, Tablet, Desktop)
- 🎵 เครื่องเล่นเพลงพื้นหลัง
- 💌 ฟอร์มติดต่อพร้อม PHP Backend
- 🎨 แอนิเมชั่นและ Transitions ที่ลื่นไหล
- 💭 ส่วนความทรงจำกับเพื่อน

## โครงสร้างโปรเจกต์

```
portfolio/
├── index.html              # หน้าหลัก
├── assets/
│   ├── images/            # รูปภาพ
│   ├── icons/             # ไอคอน
│   └── music/             # ไฟล์เพลง MP3
├── styles/
│   ├── variables.css      # ตัวแปร CSS
│   ├── reset.css          # CSS reset
│   ├── main.css           # สไตล์หลัก
│   ├── navigation.css     # สไตล์เมนู
│   ├── cards.css          # สไตล์การ์ด
│   ├── animations.css     # แอนิเมชั่น
│   ├── music-player.css   # สไตล์เครื่องเล่นเพลง
│   └── responsive.css     # responsive design
├── js/
│   ├── main.js            # JavaScript หลัก
│   ├── navigation.js      # ฟังก์ชันเมนู
│   ├── theme.js           # dark/light mode
│   ├── animations.js      # แอนิเมชั่น
│   ├── form.js            # ฟอร์มติดต่อ
│   └── music-player.js    # เครื่องเล่นเพลง
├── php/
│   ├── contact.php        # ประมวลผลฟอร์ม
│   └── config.php         # การตั้งค่า
└── .htaccess              # Apache config
```

## การติดตั้ง

1. **คัดลอกโฟลเดอร์ไปยัง XAMPP**
   ```
   C:\xampp\htdocs\portfolio\
   ```

2. **เปิด Apache ใน XAMPP Control Panel**

3. **เปิดเว็บเบราว์เซอร์**
   ```
   http://localhost/portfolio
   ```

## การปรับแต่ง

### 1. แก้ไขข้อมูลส่วนตัว

เปิดไฟล์ `index.html` และแก้ไข:
- ชื่อและคำบรรยาย (Hero Section)
- ข้อมูลเกี่ยวกับตัวเอง (About Section)
- รายละเอียดโปรเจกต์ (Projects Section)
- ข้อมูลเพื่อน (Memories Section)
- ลิงก์ Social Media

### 2. เพิ่มเพลง

1. วางไฟล์ MP3 ในโฟลเดอร์ `assets/music/`
2. แก้ไขไฟล์ `js/music-player.js`:
   ```javascript
   const playlist = [
       {
           name: 'ชื่อเพลง',
           artist: 'ศิลปิน',
           file: 'assets/music/song.mp3'
       }
   ];
   ```

### 3. ตั้งค่าอีเมล

แก้ไขไฟล์ `php/config.php`:
```php
define('CONTACT_EMAIL', 'your-email@example.com');
```

### 4. เปลี่ยนสี

แก้ไขไฟล์ `styles/variables.css`:
```css
:root {
  --color-accent: #0070F3;
  --gradient-primary: linear-gradient(135deg, #7928CA 0%, #FF0080 100%);
}
```

## เทคโนโลยีที่ใช้

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP
- **Fonts**: Inter (Google Fonts)
- **Server**: Apache (XAMPP)

## ฟีเจอร์เครื่องเล่นเพลง

- ▶️ เล่น/หยุดเพลง
- ⏭ เปลี่ยนเพลง (ถัดไป/ก่อนหน้า)
- 📋 แสดงรายการเพลง
- 🔊 ปรับระดับเสียง
- 📊 แถบความคืบหน้า
- 💾 จำค่าที่ตั้งไว้ (localStorage)
- ➖ ย่อ/ขยายตัวเล่น

## การทดสอบ

1. ทดสอบ Responsive Design บนหน้าจอขนาดต่างๆ
2. ทดสอบ Dark/Light Mode
3. ทดสอบ Navigation และ Smooth Scroll
4. ทดสอบเครื่องเล่นเพลง
5. ทดสอบฟอร์มติดต่อ

## หมายเหตุ

- ฟังก์ชันส่งอีเมลอาจไม่ทำงานบน localhost โดยไม่มีการตั้งค่า SMTP
- สามารถแก้ไขโค้ดใน `contact.php` เพื่อบันทึกลง database แทน
- เพิ่มรูปภาพของคุณเองในโฟลเดอร์ `assets/images/`

## License

Free to use for personal projects

---

สร้างด้วย ❤️ | 2026
