describe('การรายงานอุปกรณ์เสียหาย', () => {
    beforeEach(() => {
      cy.visit('https://booking-front-three.vercel.app/roomdetail/cm6zci5b90001zsrlrpc8j12c');
      cy.contains('button', 'รายงานอุปกรณ์เสียหาย', { timeout: 10000 }).click();
      cy.get('.w-full.max-w-md.bg-white.p-6.shadow-xl', { timeout: 10000 }).should('be.visible');
    });
  
    it('1) คลิกปุ่ม "รายงานอุปกรณ์เสียหาย" จะแสดง Pop-up/Form รายงาน', () => {
      cy.get('.w-full.max-w-md.bg-white.p-6.shadow-xl').should('be.visible');
      cy.get('h3').contains('รายงานอุปกรณ์ที่เสียหาย').should('be.visible');
    });
  
    it('2) รายงานอุปกรณ์เสียหายโดย กรอกข้อมูลถูกต้องครบถ้วน', () => {
      const selectedEquipmentText = 'com'; 
      const damageDetails = 'หน้าจอแตก เปิดไม่ติด';
  
      cy.get('select.mt-1.block.w-full.px-3.py-2.bg-white.border.border-gray-300.rounded-md.shadow-sm.focus\\:outline-none.focus\\:ring-blue-500.focus\\:border-blue-500.sm\\:text-sm', { timeout: 10000 })
        .should('be.visible')
        .select(selectedEquipmentText, { timeout: 10000 }); 
  
      cy.get('textarea.mt-1.block.w-full.px-3.py-2.border.border-gray-300.rounded-md.shadow-sm.focus\\:outline-none.focus\\:ring-blue-500.focus\\:border-blue-500.sm\\:text-sm', { timeout: 10000 })
        .type(damageDetails);
  
      cy.get('button').contains('รายงาน', { timeout: 10000 }).click({ force: true });
  
    });
  
    it('3) รายงานอุปกรณ์เสียหายโดย เลือกอุปกรณ์แต่ไม่กรอกรายละเอียดที่เสียหาย', () => {
      const selectedEquipmentText = 'com';
  
      cy.get('select.mt-1.block.w-full.px-3.py-2.bg-white.border.border-gray-300.rounded-md.shadow-sm.focus\\:outline-none.focus\\:ring-blue-500.focus\\:border-blue-500.sm\\:text-sm', { timeout: 10000 })
        .should('be.visible')
        .select(selectedEquipmentText, { timeout: 10000 });
  
      cy.get('button').contains('รายงาน', { timeout: 10000 }).click({ force: true });
  
      cy.contains('กรุณากรอกรายละเอียดความเสียหาย', { timeout: 10000 }).should('be.visible');
    });
  
    it('4) รายงานอุปกรณ์เสียหายโดย ไม่เลือกอุปกรณ์แต่กรอกรายละเอียดที่เสียหาย', () => {
      const damageDetails = 'สาย HDMI ชำรุด';
  
      cy.get('textarea.mt-1.block.w-full.px-3.py-2.border.border-gray-300.rounded-md.shadow-sm.focus\\:outline-none.focus\\:ring-blue-500.focus\\:border-blue-500.sm\\:text-sm', { timeout: 10000 })
        .type(damageDetails);
  
      cy.get('button').contains('รายงาน', { timeout: 10000 }).click({ force: true });
  
      cy.contains('กรุณาเลือกอุปกรณ์ที่เสียหาย', { timeout: 10000 }).should('be.visible');
    });
  
    it('5) รายงานอุปกรณ์เสียหายโดยไม่กรอกข้อมูล', () => {
      cy.get('button').contains('รายงาน', { timeout: 10000 }).click({ force: true });
  
      cy.contains('กรุณาเลือกอุปกรณ์และกรอกรายละเอียด', { timeout: 10000 }).should('be.visible');
    });
  
    it('6) คลิกปุ่ม “ยกเลิก” จะปิด Pop-up/Form รายงาน', () => {
        cy.get('button').contains('ยกเลิก', { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
    
      });
  });