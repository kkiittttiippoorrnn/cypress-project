describe('การยกเลิกการจอง (พร้อมล็อกอิน)', () => {
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
      cy.wait(1000);

    });
  
    it('1) คลิกปุ่ม “ยกเลิก” บนรายการคำร้อง แล้วควรแสดง Pop-up ยกเลิก', () => {
        cy.get('button.px-4.py-2.bg-red-600').first().as('cancelButton');
        cy.get('@cancelButton').should('be.visible').click();
    
        cy.on('window:prompt', (str) => {
          expect(str).to.equal('กรุณาใส่เหตุผลในการยกเลิก:');
          return null; 
        });
    
    
        cy.contains('กรุณาใส่เหตุผลในการยกเลิก:').should('not.exist');
      });
    
      it('2) ยกเลิกการจองห้องประชุมโดยกรอกเหตุผลและคลิก "OK" บน Pop-up', () => {
        cy.get('button.px-4.py-2.bg-red-600').first().as('cancelButton');
        cy.get('@cancelButton').click();
    
        cy.window().then((win) => {
          cy.stub(win, 'prompt').callsFake((message) => {
            expect(message).to.equal('กรุณาใส่เหตุผลในการยกเลิก:');
            return 'เหตุผลที่ต้องการยกเลิก';
          });
    
          cy.contains('ยกเลิกการจองสำเร็จ').should('be.visible');
          cy.get('@cancelButton').should('not.exist');
        });
      });
    
      it('3) พยายามยกเลิกโดยไม่กรอกเหตุผลและคลิก "OK" บน Pop-up', () => {
        cy.get('button.px-4.py-2.bg-red-600').first().as('cancelButton');
        cy.get('@cancelButton').click();
    
        cy.window().then((win) => {
          cy.stub(win, 'prompt').callsFake((message) => {
            expect(message).to.equal('กรุณาใส่เหตุผลในการยกเลิก:');
            return ''; 
          });
    
          cy.contains('กรุณาใส่เหตุผลในการยกเลิก').should('be.visible'); 
          cy.get('@cancelButton').should('be.visible'); 
        });
      });
    
      it('4) คลิกปุ่ม “Cancel” บน Pop-up ยกเลิก', () => {
        cy.get('button.px-4.py-2.bg-red-600').first().as('cancelButton');
        cy.get('@cancelButton').click();
    
        cy.on('window:prompt', (str) => {
          expect(str).to.equal('กรุณาใส่เหตุผลในการยกเลิก:');
          return null; 
        });

        cy.contains('กรุณาใส่เหตุผลในการยกเลิก:').should('not.exist');
        cy.get('@cancelButton').should('be.visible'); 
      });
    });