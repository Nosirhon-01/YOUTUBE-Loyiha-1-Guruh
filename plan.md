# YouTube Clone Backend – Jamoa Rejasi

## 👥 Jamoa A'zolari

| Ism        | Mas'uliyat                              |
| ---------- | --------------------------------------- |
| Nosirhon   | Videos moduli                           |
| Salohiddin | Prisma database va schema               |
| Nozima     | Authentication (Register / Login / JWT) |
| Oydin      | Comment va Like tizimi                  |

---

# 📅 1-Bosqich – MVP (Birinchi Versiya)

Maqsad: **YouTube backendining ishlaydigan minimal versiyasini yaratish**

Davomiyligi: **1–2 hafta**

---

# 🗄 Database (Salohiddin)

Vazifalar:

* **Prisma** ni sozlash
* **PostgreSQL** ni ulash
* Asosiy modellarni yaratish

Modellar:

* User
* Video
* Comment
* Like

Bajariladigan ishlar:

* `schema.prisma`
* Prisma migration lar
* PrismaService yaratish
* Database connection qilish

Buyruqlar:

```bash
npx prisma init
npx prisma migrate dev
npx prisma studio
```

---

# 🔐 Auth Tizimi (Nozima)

**Auth modulini yaratish**

Fayllar:

* auth.module.ts
* auth.controller.ts
* auth.service.ts

Endpointlar:

POST /auth/register
POST /auth/login

Funksiyalar:

* Password hashing (bcrypt)
* JWT token yaratish
* User tekshirish (validation)

---

# 🎥 Videos Moduli (Nosirhon)

**Videos modulini yaratish**

Fayllar:

* videos.module.ts
* videos.controller.ts
* videos.service.ts
* dto/create-video.dto.ts
* dto/update-video.dto.ts

Endpointlar:

POST /videos
GET /videos
GET /videos/:id
PUT /videos/:id
DELETE /videos/:id

Funksiyalar:

* Video yaratish
* Videolar ro'yxatini olish
* Video ni ID orqali olish
* Video ni yangilash
* Video ni o‘chirish

---

# 💬 Comment Tizimi (Oydin)

**Comments modulini yaratish**

Fayllar:

* comments.module.ts
* comments.controller.ts
* comments.service.ts

Endpointlar:

POST /videos/:videoId/comments
GET /videos/:videoId/comments
DELETE /comments/:id

Funksiyalar:

* Comment qo‘shish
* Video commentlarini olish
* Commentni o‘chirish

---

# 👍 Like Tizimi (Oydin)

Endpointlar:

POST /videos/:id/like
POST /videos/:id/dislike
DELETE /videos/:id/like

Funksiyalar:

* Video ga like bosish
* Video ga dislike bosish
* Like ni olib tashlash

---

# 📦 Project Strukturasi

```
src
  modules
    auth
    users
    videos
    comments
    likes
  prisma
  common
  main.ts
```

---

# 🔧 Git Ishlash Tartibi

Har bir developer o‘z **branch** ida ishlashi kerak.

Misol:

```
feature/videos-module
feature/auth-module
feature/comments-module
feature/prisma-setup
```

Ishlash tartibi:

1. Eng oxirgi kodni pull qilish
2. Yangi branch yaratish
3. O‘zgarishlar qilish
4. Commit qilish
5. GitHub ga push qilish
6. Pull Request yaratish

---

# 🧪 Test

**Postman** orqali tekshirish.

Test qilish kerak bo‘lganlar:

* Register
* Login
* Video yaratish
* Comment qo‘shish
* Video ga like bosish

---

# 🎯 MVP Maqsadi

MVP oxirida quyidagilar ishlashi kerak:

✔ Register / Login
✔ Video yaratish
✔ Videolarni ko‘rish
✔ Comment tizimi
✔ Like tizimi
✔ PostgreSQL database ishlashi

---

# 🚀 Keyingi Bosqich (MVP dan keyin)

Keyin quyidagilar qo‘shiladi:

* Video upload
* Video streaming
* Redis cache
* FFmpeg video processing
* AWS S3 storage
* Subscription tizimi
* Playlist tizimi
