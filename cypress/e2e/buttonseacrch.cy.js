import moment from 'moment';

describe('การค้นหาห้องประชุมว่าง', () => {
  beforeEach(() => {
    cy.visit('https://booking-front-three.vercel.app/'); // ไปยังหน้าหลัก
    cy.get('button').contains('ค้นหาห้องประชุมว่าง').as('showSearchFormButton');
  });

  it('1) คลิกที่ปุ่ม “ค้นหาห้องประชุมว่าง” และแสดงฟอร์มค้นหา', () => {
    cy.get('@showSearchFormButton').click();
    cy.get('input[type="date"]').should('be.visible').as('dateInput');
    cy.get('input[type="time"]').eq(0).should('be.visible').as('startTimeInput');
    cy.get('input[type="time"]').eq(1).should('be.visible').as('endTimeInput');
    cy.get('button[type="submit"]').contains('ค้นหา').should('be.visible').as('searchButton');
  });

  describe('การค้นหาโดยกรอกข้อมูล', () => {
    beforeEach(() => {
      cy.visit('https://booking-front-three.vercel.app/'); 
      cy.get('@showSearchFormButton').click(); 
      cy.get('input[type="date"]').as('dateInput');
      cy.get('input[type="time"]').eq(0).as('startTimeInput');
      cy.get('input[type="time"]').eq(1).as('endTimeInput');
      cy.get('button[type="submit"]').contains('ค้นหา').as('searchButton');
    });

    const fillSearchForm = (date, startTime, endTime) => {
      if (date) cy.get('@dateInput').type(date);
      if (startTime) cy.get('@startTimeInput').type(startTime);
      if (endTime) cy.get('@endTimeInput').type(endTime);
    };

    it('2) ค้นหาห้องประชุมว่างโดยกรอกข้อมูลครบถ้วน และตรวจสอบข้อมูลห้องที่ได้รับ', () => {
        const currentDate = moment().format('YYYY-MM-DD');
        const startTime = '09:00';
        const endTime = '10:00';
      
        fillSearchForm(currentDate, startTime, endTime);
      
        cy.intercept('POST', 'https://cmru-booking-back.vercel.app/api/room/search').as('searchRequest');
      
        cy.get('@searchButton').click();
      
        cy.wait('@searchRequest').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          expect(interception.response.body).to.be.an('object');
      
          const responseBody = interception.response.body;
          cy.log('API Response Body:', responseBody); 
      
          if (responseBody && responseBody.rooms && Array.isArray(responseBody.rooms)) {
            const rooms = responseBody.rooms;
            cy.log('Available Rooms:', rooms); 
      
            const foundMatchingRoom = rooms.some(room => room.meeting_date === currentDate);
            cy.log('Found Matching Room:', foundMatchingRoom);
            expect(foundMatchingRoom).to.be.true;
      
            cy.get('.room-item').should('be.visible');
            cy.contains(currentDate).should('be.visible');
          } else {
            cy.log('Error: API Response Body ไม่มี Property "rooms" ที่เป็น Array');
            expect(false).to.be.true;
          }
        });
      });

    it('3) ค้นหาห้องประชุมว่างโดยไม่กรอก วันเดือนปี', () => {
      fillSearchForm(null, '09:00', '10:00');
      cy.get('@searchButton').click();
      cy.contains('โปรดระบุวันเดือนปี').should('be.visible'); 
      cy.url().should('not.include', '/available-rooms'); 
    });

    it('4) ค้นหาห้องประชุมว่างโดยไม่กรอก เวลาเริ่มต้น', () => {
      const currentDate = moment().format('YYYY-MM-DD');
      fillSearchForm(currentDate, null, '10:00');
      cy.get('@searchButton').click();
      cy.contains('โปรดระบุเวลาเริ่มต้น').should('be.visible');
      cy.url().should('not.include', '/available-rooms'); 
    });

    it('5) ค้นหาห้องประชุมว่างโดยไม่กรอก เวลาสิ้นสุด', () => {
      const currentDate = moment().format('YYYY-MM-DD');
      fillSearchForm(currentDate, '09:00', null);
      cy.get('@searchButton').click();
      cy.contains('โปรดระบุเวลาสิ้นสุด').should('be.visible');
      cy.url().should('not.include', '/available-rooms'); 
    });

    it('6) ค้นหาห้องประชุมว่างโดยเลือกช่วงเวลาสิ้นสุดก่อนเวลาเริ่มต้น', () => {
      const currentDate = moment().format('YYYY-MM-DD');
      fillSearchForm(currentDate, '10:00', '09:00');
      cy.get('@searchButton').click();
      cy.contains('เวลาสิ้นสุดต้องหลังเวลาเริ่มต้น').should('be.visible');
      cy.url().should('not.include', '/available-rooms'); 
    });

    it('7) ค้นหาห้องประชุมว่างโดยเลือกวันเดือนปีที่ย้อนหลังจากปัจจุบัน', () => {
      const pastDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
      fillSearchForm(pastDate, '09:00', '10:00');
      cy.get('@searchButton').click();
      cy.contains('ไม่สามารถเลือกวันที่ย้อนหลังได้').should('be.visible'); 
      cy.url().should('not.include', '/available-rooms'); 
    });

    it('8) ค้นหาห้องประชุมว่างโดยเลือกช่วงเวลาเกิน 8 ชั่วโมง', () => {
      const currentDate = moment().format('YYYY-MM-DD');
      fillSearchForm(currentDate, '09:00', '17:01'); 
      cy.get('@searchButton').click();
      cy.contains('ไม่สามารถเลือกช่วงเวลาเกิน 8 ชั่วโมงได้').should('be.visible'); 
      cy.url().should('not.include', '/available-rooms'); 
    });
  });
});