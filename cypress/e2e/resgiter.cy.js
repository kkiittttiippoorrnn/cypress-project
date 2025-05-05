describe('การสมัครสมาชิก', () => {
    beforeEach(() => {
      cy.visit('https://booking-front-three.vercel.app/login'); 
      cy.contains('สมัครสมาชิก').click(); 
      cy.url().should('include', '/register'); 
    });
  
    it('1) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType); 
        cy.get('select.w-full').eq(1).select(user.department); 
        cy.get('button').contains('สมัครสมาชิก').click();

      });
    });
  
    it('2) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่เพิ่ม รูป', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();

      });
    });
  
    it('3) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่กรอก อีเมล', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('Registration failed. Please check the information.').should('be.visible'); 
      });
    });
  
    it('4) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่กรอก ชื่อ', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('โปรดกรอกชื่อ').should('be.visible'); 

      });
    });
  
    it('5) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่กรอก เบอร์โทร', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('โปรดกรอกเบอร์โทร').should('be.visible');

      });
    });
  
    it('6) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่กรอก รหัสผ่าน', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('โปรดกรอกรหัสผ่าน').should('be.visible'); 
      });
    });
  
    it('7) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่กรอก ยืนยันรหัสผ่าน', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('รหัสผ่านไม่ตรงกัน').should('be.visible'); 

      });
    });
  
    it('8) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่กรอก ยืนยันรหัสผ่าน ไม่ตรงกับ รหัสผ่าน', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type('wrongpassword');
        cy.get('select.w-full').eq(0).select(user.userType);
        cy.get('select.w-full').eq(1).select(user.department);
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('รหัสผ่านไม่ตรงกัน').should('be.visible'); 

      });
    });
  
    it('9) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่เลือก ประเภทผู้ใช้', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(1).select(user.department); 
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('โปรดเลือกประเภทผู้ใช้').should('be.visible');

      });
    });
  
    it('10) การสมัครสมาชิกโดยกรอกข้อมูลถูกต้องครบถ้วน แต่ไม่เลือก หน่วยงาน', () => {
      cy.fixture('db.json').then((data) => {
        const user = data.registration.validUser;
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${user.profilePicture}`);
        cy.get('input[placeholder="อีเมล"]').type(user.email);
        cy.get('input[placeholder="ชื่อ"]').type(user.username);
        cy.get('input[placeholder="เบอร์โทร"]').type('0812345678');
        cy.get('input[placeholder="รหัสผ่าน"]').type(user.password);
        cy.get('input[placeholder="ยืนยันรหัสผ่าน"]').type(user.confirmPassword);
        cy.get('select.w-full').eq(0).select(user.userType); 
        cy.get('button').contains('สมัครสมาชิก').click();
        cy.contains('โปรดเลือกหน่วยงาน').should('be.visible');

      });
    });
  
    it('11) การสมัครสมาชิกโดยไม่กรอกข้อมูล', () => {
      cy.get('button').contains('สมัครสมาชิก').click();
      cy.contains('โปรดกรอกอีเมล').should('be.visible');
      cy.contains('โปรดกรอกชื่อ').should('be.visible');
      cy.contains('โปรดกรอกเบอร์โทร').should('be.visible');
      cy.contains('โปรดกรอกรหัสผ่าน').should('be.visible');
      cy.contains('โปรดยืนยันรหัสผ่าน').should('be.visible');
      cy.get('select.w-full').eq(0).should('have.value', ''); 
      cy.get('select.w-full').eq(1).should('have.value', ''); 

    });
  });