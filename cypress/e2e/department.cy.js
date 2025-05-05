describe('การเลือกหน่วยงาน', () => {
    beforeEach(() => {
      cy.visit('https://booking-front-three.vercel.app/'); 
      cy.get('select.w-full').as('departmentDropdown'); 
    });
  
    it('1) เลือกหน่วยงานจาก Drop-down', () => {
      const selectedDepartment = 'Digital'; 

      cy.get('@departmentDropdown').select(selectedDepartment);
      cy.get('@departmentDropdown').should('have.value', 'cm6zche2j0000utuje1iy0hrn');
      cy.get('@departmentDropdown').should('contain', selectedDepartment);
    });
  
    it('2) เปลี่ยนหน่วยงาน', () => {
      const firstDepartment = 'Digital'; 
      const secondDepartment = 'Cat'; 
  
      cy.get('@departmentDropdown').select(firstDepartment);
      cy.get('@departmentDropdown').should('have.value', 'cm6zche2j0000utuje1iy0hrn');
      cy.get('@departmentDropdown').should('contain', firstDepartment);
  
      cy.get('@departmentDropdown').select(secondDepartment);
      cy.get('@departmentDropdown').should('have.value', 'cm75x9gh40000coqpiyadth76');
      cy.get('@departmentDropdown').should('contain', secondDepartment);
    });
  });