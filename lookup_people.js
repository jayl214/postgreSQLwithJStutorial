const pg = require("pg");
const settings = require("./settings"); // settings.json

const args = process.argv.slice(2);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = {
  name: 'lookup-firstname',
  text: 'SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1',
  values:[args[0]]
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, res) => {
    if (err) {
      return console.error("error running query", err);
    }

    for (i in res.rows);
    console.log(`Found ${res.rows.length} person(s) by the name ${args[i]}:\n - ${res.rows[i].first_name} ${res.rows[i].last_name}, born ${res.rows[i].birthdate}`)

    client.end();
  });


});



