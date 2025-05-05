describe('การค้นหาห้องประชุม', () => {
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
      
    });
    it('1) ค้นหาห้องประชุมโดยใช้ชื่อห้องที่มีอยู่ในระบบ', () => {
        const existingRoomName = 'INC-202'; 
        cy.get('input[placeholder="ค้นหาห้องประชุม..."]').type(existingRoomName).type('{enter}');
        //cy.contains(existingRoomName)
      });
    
      it('2) ค้นหาห้องประชุมโดยใช้ชื่อห้องที่ไม่มีอยู่ในระบบ', () => {
        const nonExistingRoomName = 'NonExistentRoom'; 
        cy.get('input[placeholder="ค้นหาห้องประชุม..."]').type(nonExistingRoomName).type('{enter}');
        cy.contains('ไม่พบห้องประชุมที่คุณค้นหา').should('be.visible'); 
        cy.get('.room-item').should('not.exist');
      });
    
      it('3) ค้นหาห้องประชุมโดยไม่กรอกข้อมูล', () => {
        cy.get('input[placeholder="ค้นหาห้องประชุม..."]').type('{enter}');
      
      });
    });