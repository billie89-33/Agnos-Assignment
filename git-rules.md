# 🌿 Git Workflow Rules

กฏเหล็กสำหรับการทำงานร่วมกันในโปรเจกต์นี้ (เพื่อป้องกันข้อผิดพลาดและทำงานเป็นระบบ):

**ทุกครั้งที่มีการเพิ่มฟีเจอร์ใหม่ (Feature) หรือแก้ไขบั๊ก (Fix):**

1. **Branch Out:** แตก Branch ใหม่จาก `main` เสมอ 
   `git checkout -b feature/<feature-name>` (หรือ `fix/<bug-name>`)
2. **Develop & Commit:** ทำงานและ Commit โค้ดใน Branch นั้น
3. **Push Branch:** พุช Branch ไปยัง Remote (GitHub)
   `git push origin feature/<feature-name>`
4. **Merge & Pull:**
   - สลับกลับไปที่ `main`: `git checkout main`
   - ดึงข้อมูลล่าสุด (กันเหนียว): `git pull origin main`
   - นำ Branch มา Merge: `git merge feature/<feature-name>`
5. **Push Main:** พุชโค้ดที่อัปเดตแล้วขึ้น `main`
   `git push origin main`
