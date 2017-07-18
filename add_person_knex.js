const pg = require("pg");
const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'postgresql',
  connection:{
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const args = process.argv.slice(2);
const inputBirthDate = new Date(args[2]);


knex('famous_people').insert(
  [{first_name: args[0], last_name: args[1], birthdate: inputBirthDate}],
  'id').asCallback((err, results)=>{
      if (err) console.error(err);
      console.log( `Inserted ${args[0]} ${args[1]} into the database` );
  })

knex.destroy();



// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Abraham', 'Lincoln', '1809-02-12');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Mahatma', 'Gandhi', '1869-10-02');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Paul', 'Rudd', '1969-04-06');