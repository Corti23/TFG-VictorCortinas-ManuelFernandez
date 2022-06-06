describe('test-end-to-end', () => {
  it('Registrarte y casos de error', () => {
    cy.visit('http://localhost/TFG/index.php');
    cy.viewport(749, 700);

    cy.get('#registrarse').click();
    cy.get('#nombre').type(' 23');
    cy.get('#apellidos').type(' 23 56 ');
    cy.get('#correo').type('usuario@gmail.com');
    cy.get('#direccion').type(' C/ Calle');
    cy.get('#clave_registro').type(' Uu123*');
    cy.get('#clave_confirma').type(' Uu123*');
    cy.get('#registrar').click();
    cy.get('#boton_continuar_error').click();

    cy.get('#nombre').clear();
    cy.get('#apellidos').clear();
    cy.get('#correo').clear();
    cy.get('#direccion').clear();
    cy.get('#clave_registro').clear();
    cy.get('#clave_confirma').clear();
    cy.get('#nombre').type('Usuario');
    cy.get('#apellidos').type(' Usuario Usuario');
    cy.get('#correo').type('usuario@gmail');
    cy.get('#direccion').type(' C/ Calle');
    cy.get('#clave_registro').type('Uu123*');
    cy.get('#clave_confirma').type('u123*');
    cy.get('#registrar').click();
    cy.get('#boton_continuar_error').click();

    cy.get('#nombre').clear();
    cy.get('#apellidos').clear();
    cy.get('#correo').clear();
    cy.get('#direccion').clear();
    cy.get('#clave_registro').clear();
    cy.get('#clave_confirma').clear();
    cy.get('#nombre').type('Usuario23');
    cy.get('#apellidos').type(' Usuario Usuario');
    cy.get('#correo').type('usuario@gmail.com');
    cy.get('#direccion').type(' C/ Calle');
    cy.get('#clave_registro').type('Uu123*');
    cy.get('#clave_confirma').type('Uu123');
    cy.get('#registrar').click();
    cy.get('#boton_continuar_error').click();

    cy.get('#nombre').clear();
    cy.get('#apellidos').clear();
    cy.get('#correo').clear();
    cy.get('#direccion').clear();
    cy.get('#clave_registro').clear();
    cy.get('#clave_confirma').clear();
    cy.get('#nombre').type('Usuario23');
    cy.get('#apellidos').type(' Usuario Usuario');
    cy.get('#correo').type('usuario@gmail.com');
    cy.get('#direccion').type(' C/ Calle');
    cy.get('#clave_registro').type('Uu123*');
    cy.get('#clave_confirma').type('Uu123**');
    cy.get('#registrar').click();
    cy.get('#boton_continuar_error').click();

    cy.get('#nombre').clear();
    cy.get('#apellidos').clear();
    cy.get('#correo').clear();
    cy.get('#direccion').clear();
    cy.get('#clave_registro').clear();
    cy.get('#clave_confirma').clear();
    cy.get('#nombre').type('Usuario');
    cy.get('#apellidos').type(' Usuario Usuario');
    cy.get('#correo').type('javi@gmail.com');
    cy.get('#direccion').type(' C/ Calle');
    cy.get('#clave_registro').type('Uu123*');
    cy.get('#clave_confirma').type('Uu123*');
    cy.get('#registrar').click();
    cy.get('#boton_continuar_error').click();

    cy.get('#nombre').clear();
    cy.get('#apellidos').clear();
    cy.get('#correo').clear();
    cy.get('#direccion').clear();
    cy.get('#clave_registro').clear();
    cy.get('#clave_confirma').clear();
    cy.get('#nombre').type('Usuario23');
    cy.get('#apellidos').type(' Usuario Usuario');
    cy.get('#correo').type('usuario@gmail.com');
    cy.get('#direccion').type(' C/ Calle');
    cy.get('#clave_registro').type('Uu123*');
    cy.get('#clave_confirma').type('U123**');
    cy.get('#registrar').click();
  })

  it('Iniciar sesión y casos de error', () => {
    cy.visit('http://localhost/TFG/index.php');
    cy.viewport(749, 700);

    cy.get('#iniciar_sesion').click();
    cy.get('#usuario').type('usuario@gmail.com');
    cy.get('#clave').type('Uu123*');
    cy.get('#entrar').click();
    cy.get('#boton_continuar_error').click();

    cy.get('#usuario').clear();
    cy.get('#clave').clear();
    cy.get('#usuario').type('javi@gmail.com');
    cy.get('#clave').type('Jj123*');
    cy.get('#entrar').click();
  })
})
