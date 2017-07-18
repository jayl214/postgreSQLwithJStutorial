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
  name: 'lookup-person',
  text: 'SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1',
  values:[args[0]]
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } console.log('Searching ...')
  client.query(query, (err, res) => {
    if (err) {
      return console.error("error running query", err);
    }


    console.log(`Found ${res.rows.length} person(s) by the name ${args[0]}:`);
    for (i in res.rows){
        let time = res.rows[i].birthdate.toString();
        let dateTime = time.substring(0,15);
        console.log(`${Number(i)+1}) ${res.rows[i].first_name} ${res.rows[i].last_name}, born ${dateTime}`)};

    client.end();
  });


});



