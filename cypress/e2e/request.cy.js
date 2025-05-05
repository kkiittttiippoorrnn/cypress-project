describe('การตรวจสอบคำร้อง (พร้อมล็อกอิน)', () => {
    beforeEach(() => {

      cy.visit('https://booking-front-three.vercel.app/login');
     
  
      cy.fixture('db.json').then((data) => {
        const validUser = data.users.find(user => user.username === 'kittiporn' && user.exists);
        if (validUser) {
          cy.get('input[placeholder="อีเมล"]').type(validUser.email);
          cy.get('input[placeholder="รหัสผ่าน"]').type(validUser.password);
          cy.get('button[type="button"]').contains('เข้าสู่ระบบ').click();
  
          cy.contains(`คุณ: ${validUser.username}`)
          cy.contains('ออกจากระบบ')
        } else {
          cy.log('ไม่พบผู้ใช้งานที่ถูกต้องใน db.json สำหรับการทดสอบนี้');
          assert.fail('ไม่พบผู้ใช้งานที่ถูกต้องใน db.json');
        }
      });
      cy.get('a.text-gray-800').contains('ตรวจสอบคำร้อง').click(); 
    });
  
    it('1) คลิกปุ่ม “ตรวจสอบคำร้อง” แล้วควรนำไปยังหน้าตรวจสอบคำร้อง', () => {
      cy.get('h1').contains('ตรวจสอบสถานะการจอง').should('be.visible'); 
    });
  });