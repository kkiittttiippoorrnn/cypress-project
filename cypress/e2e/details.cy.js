describe('การดูรายละเอียดอุปกรณ์', () => {
  it('1) คลิกปุ่ม “ดูรายละเอียดอุปกรณ์” จะแสดง Pop-up รายละเอียด', () => {
    cy.visit('https://booking-front-three.vercel.app/roomdetail/cm6zci5b90001zsrlrpc8j12c'); 

    cy.contains('button', 'ดูรายละเอียด', { timeout: 10000 }).click();

    cy.get('div.relative.w-11\\/12.max-w-lg.bg-white.p-8.rounded-lg.shadow-lg', { timeout: 10000 })
      .should('be.visible');

    
  });
});