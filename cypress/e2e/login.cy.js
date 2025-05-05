describe('การเข้าสู่ระบบ', () => {
  beforeEach(() => {
    cy.visit('https://booking-front-three.vercel.app/login');
  });

  it('1) การเข้าสู่ระบบโดย Username และ Password ที่ถูกต้อง', () => {
    cy.fixture('db.json').then((data) => {
      const validUser = data.users.find(user => user.username === 'kittiporn' && user.exists);
      if (validUser) {
        cy.get('input[placeholder="อีเมล"]').type(validUser.email);
        cy.get('input[placeholder="รหัสผ่าน"]').type(validUser.password);
        cy.get('button[type="button"]').contains('เข้าสู่ระบบ').click();
        //cy.get('nav').should('be.visible'); 
        cy.contains('kittiporn').should('be.visible');
      } else {
        cy.log('ไม่พบผู้ใช้งานที่ถูกต้องใน db.json สำหรับการทดสอบนี้');
        assert.fail('ไม่พบผู้ใช้งานที่ถูกต้องใน db.json');
      }
    });
  });

  it('2) การเข้าสู่ระบบโดย Username ที่ไม่มีอยู่จริง แต่ Password ถูกต้อง', () => {
    cy.fixture('db.json').then((data) => {
      const invalidUser = data.users.find(user => user.username === 'nonexistentuser' && !user.exists);
      const validUserForPassword = data.users.find(user => user.exists); 
      if (invalidUser && validUserForPassword) {
        cy.get('input[placeholder="อีเมล"]').type(invalidUser.email);
        cy.get('input[placeholder="รหัสผ่าน"]').type(validUserForPassword.password);
        cy.get('button[type="button"]').contains('เข้าสู่ระบบ').click();
        //cy.contains('การเข้าสู่ระบบล้มเหลว โปรดตรวจสอบอีเมลหรือรหัสผ่านของคุณ').should('be.visible'); // ตรวจสอบข้อความผิดพลาด
        cy.get('nav').should('not.exist'); 
      } else {
        cy.log('ไม่พบผู้ใช้งานที่ไม่มีอยู่จริง หรือผู้ใช้งานที่ถูกต้องใน db.json สำหรับการทดสอบนี้');
        assert.fail('ไม่พบข้อมูลผู้ใช้งานที่จำเป็นใน db.json');
      }
    });
  });

  it('3) การเข้าสู่ระบบโดย Username ที่ถูกต้อง แต่ Password ไม่ถูกต้อง', () => {
    cy.fixture('db.json').then((data) => {
      const validUser = data.users.find(user => user.username === 'kittiporn' && user.exists);
      const invalidPasswordUser = data.users.find(user => user.username === 'testuser' && user.exists);
      if (validUser && invalidPasswordUser) {
        cy.get('input[placeholder="อีเมล"]').type(validUser.email);
        cy.get('input[placeholder="รหัสผ่าน"]').type(invalidPasswordUser.password);
        cy.get('button[type="button"]').contains('เข้าสู่ระบบ').click();
        //cy.contains('การเข้าสู่ระบบล้มเหลว โปรดตรวจสอบอีเมลหรือรหัสผ่านของคุณ').should('be.visible'); 
        cy.get('nav').should('not.exist'); 
      } else {
        cy.log('ไม่พบผู้ใช้งานที่ถูกต้อง หรือผู้ใช้งานที่มีรหัสผ่านไม่ถูกต้องใน db.json สำหรับการทดสอบนี้');
        assert.fail('ไม่พบข้อมูลผู้ใช้งานที่จำเป็นใน db.json');
      }
    });
  });

  it('4) การเข้าสู่ระบบโดยไม่กรอก Username และ Password ', () => {
    cy.get('button[type="button"]').contains('เข้าสู่ระบบ').click();
    
    cy.get('nav').should('not.exist'); 
  });
});