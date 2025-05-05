describe('การจองห้องประชุม (พร้อมล็อกอิน)', () => {
    beforeEach(() => {
      // ขั้นตอนการล็อกอิน
      cy.visit('https://booking-front-three.vercel.app/login');
     
  
      cy.fixture('db.json').then((data) => {
        const validUser = data.users.find(user => user.username === 'kittiporn' && user.exists);
        if (validUser) {
          cy.get('input[placeholder="อีเมล"]').type(validUser.email);
          cy.get('input[placeholder="รหัสผ่าน"]').type(validUser.password);
          cy.get('button[type="button"]').contains('เข้าสู่ระบบ').click();
        } else {
          cy.log('ไม่พบผู้ใช้งานที่ถูกต้องใน db.json สำหรับการทดสอบนี้');
          assert.fail('ไม่พบผู้ใช้งานที่ถูกต้องใน db.json');
        }
      });
  
      
      cy.get('div.inline-block.px-4.py-2.text-white.bg-indigo-600.hover\\:bg-indigo-700.rounded-md.text-sm.font-medium.transition.duration-200.ease-in-out.cursor-pointer', { timeout: 10000 })
        .contains('ดูรายละเอียด')
        .click();
      cy.url().should('include', '/roomdetail/'); 
    });
  
    it('1) จากหน้ารายละเอียดห้องพัก คลิกปุ่ม “จองห้อง” แล้วควรนำไปยังหน้าฟอร์มจอง', () => {
      cy.get('button').contains('จองห้อง').click();
    });
  
    it('2) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนและสำเร็จ', () => {
      cy.get('button').contains('จองห้อง').click();
  
      cy.get('#reason').type('ประชุมทีม');
      cy.get('#AmountOfPeople').type('5');
      cy.get('#date').type('2025-05-22');
      cy.get('#startTime').type('09:00');
      cy.get('#endTime').type('10:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('การจองห้องประชุมสำเร็จ')
    });
  
    it('3) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่ไม่กรอก เหตุผลการจอง ', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#AmountOfPeople').type('5');
      cy.get('#date').type('2025-05-23');
      cy.get('#startTime').type('09:00');
      cy.get('#endTime').type('10:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('กรุณากรอกเหตุผลการจอง').should('be.visible');
    });
  
    it('4) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่ไม่กรอก จำนวนผู้เข้าร่วม ', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#reason').type('ประชุมทีม');
      cy.get('#date').type('2025-05-24');
      cy.get('#startTime').type('09:00');
      cy.get('#endTime').type('10:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('กรุณากรอกจำนวนผู้เข้าร่วม').should('be.visible');
    });
  
    it('5) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่ไม่กรอก วันที่ ', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#reason').type('ประชุมทีม');
      cy.get('#AmountOfPeople').type('5');
      cy.get('#startTime').type('09:00');
      cy.get('#endTime').type('10:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('กรุณาเลือกวันที่').should('be.visible'); 
    });
  
    it('6) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่ไม่กรอก เวลาเริ่มต้น ', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#reason').type('ประชุมทีม');
      cy.get('#AmountOfPeople').type('5');
      cy.get('#date').type('2025-05-25');
      cy.get('#endTime').type('10:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('กรุณาเลือกเวลาเริ่มต้น').should('be.visible'); 
    });
  
    it('7) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่ไม่กรอก เวลาสิ้นสุด ', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#reason').type('ประชุมทีม');
      cy.get('#AmountOfPeople').type('5');
      cy.get('#date').type('2025-05-26');
      cy.get('#startTime').type('09:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('กรุณาเลือกเวลาสิ้นสุด').should('be.visible'); // ปรับข้อความตามจริง
    });
  
    it('8) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่กรอก วันที่ย้อนหลัง ', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#reason').type('ประชุมทีม');
      cy.get('#AmountOfPeople').type('5');
      cy.get('#date').type('2025-04-27'); 
      cy.get('#startTime').type('09:00');
      cy.get('#endTime').type('10:00');
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('ไม่สามารถจองวันย้อนหลังได้').should('be.visible');
    });
  
    it('9) จองห้องประชุมโดยกรอกข้อมูลถูกต้องครบถ้วนแต่กรอก จองเวลาเกิน 8 ชั่วโมง', () => {
      cy.get('button').contains('จองห้อง').click();

  
      cy.get('#reason').type('ประชุมทีมยาว');
      cy.get('#AmountOfPeople').type('5');
      cy.get('#date').type('2025-05-28');
      cy.get('#startTime').type('09:00');
      cy.get('#endTime').type('18:01'); 
  
      cy.get('button[type="submit"]').contains('ส่งคำขอจอง').click();
  
      cy.contains('ไม่สามารถจองเวลาเกิน 8 ชั่วโมงได้').should('be.visible');
    });
  });