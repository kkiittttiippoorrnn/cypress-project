Cypress.Commands.add('login', (usernameKey) => {
    cy.fixture('db.json').then((data) => {
      const user = data.users.find(user => user.username === usernameKey);
      if (user) {
        cy.visit('/login'); 
        cy.get('input[placeholder="อีเมล"]').type(user.email); 
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password); 
        cy.get('button').contains('เข้าสู่ระบบ').click(); 
      } else {
        throw new Error(`ไม่พบผู้ใช้งานที่มี username: ${usernameKey} ใน db.json`);
      }
    });
  });