// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

Cypress.Commands.add("AuthLogin", () => {
   cy.session("admin", () => {
      cy.log(`Logging in as ${Cypress.env("USER_EMAIL")}`);
      cy.request("POST", "/auth/login", {
         tenant: "admin",
         email: "admin@email.com",
         password:"admin",
      })
         .its("body")
         .as("currentUser");
   });
});

Cypress.Commands.add("RunSQL", (files, fail = true) => {
   // TODO : this is a hack to get around the fact that we don't have
   // a way to get the stack name from the stack itself, as its in another repo.
   const stack = "ab_demo";
   const user = "root";
   const password = "root";

   const regEx = /^\S+/;
   cy.exec(`docker ps | grep ${stack}-db`).then(({ stdout }) => {
      if (!regEx.test(stdout)) {
         throw new Error(`couldn't find process matching '${stack}db' `);
      }
      const containerId = stdout.match(regEx)[0];
      /* eslint-disable no-useless-escape*/
      files.forEach((file) => {
         let catCmd = `cat ./cypress/e2e/test_setup/sql/${file} > ./cypress/e2e/test_setup/sql/combineSql.sql`;
         cy.log(catCmd);
         cy.exec(catCmd);
      });
      cy.exec(`docker exec ${containerId} mkdir -p /sql`);
      cy.exec(
         `docker cp ./cypress/e2e/test_setup/sql/combineSql.sql ${containerId}:/sql/combineSql.sql`,
         {
            log: false,
         },
      );

      cy.exec(
         /* eslint-disable no-useless-escape*/
         `docker exec ${containerId} bash -c "mysql -u ${user} -p${password} \"appbuilder-admin\" < ./sql/combineSql.sql"`,
         { failOnNonZeroExit: true },
      );
      // cy.exec(
      //    /* eslint-disable no-useless-escape*/
      //    `docker exec ${containerId} bash -c "mysql -u ${user} -p${password} \"appbuilder-admin\" < ./sql/combineSql.sql"`,
      //    { failOnNonZeroExit: fail }
      // {failOnNonZeroExit: false}
      // );

      cy.exec(`docker exec ${containerId} bash -c "rm ./sql/combineSql.sql"`, {
         log: false,
      });
      cy.exec(`rm ./cypress/e2e/test_setup/sql/combineSql.sql`, {
         log: false,
      });
      //   });
      // });
   });
});