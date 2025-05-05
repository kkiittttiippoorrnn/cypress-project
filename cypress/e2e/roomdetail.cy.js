describe('การดูรายละเอียดห้องประชุม', () => {
    it('1) จากหน้าหลัก คลิกปุ่ม “ดูรายละเอียด” ระบบจะพายังหน้า https://booking-front-three.vercel.app/roomdetail/', () => {
      cy.visit('https://booking-front-three.vercel.app/'); // ไปยังหน้าหลัก
  
      cy.get('div.inline-block.px-4.py-2.text-white.bg-indigo-600.hover\\:bg-indigo-700.rounded-md.text-sm.font-medium.transition.duration-200.ease-in-out.cursor-pointer', { timeout: 10000 })
        .contains('ดูรายละเอียด')
        .click();
      cy.wait(1000);
      cy.url({ timeout: 10000 }).should('include', '/roomdetail/');
    });
  });