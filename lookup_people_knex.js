
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



knex('famous_people').select('*').where({
    first_name: args[0]
    }).orWhere({
      last_name: args[0]
    })
  .asCallback((err, results)=>{
    if (err) console.error(err);
    console.log(`Found ${results.length} person(s) with the name ${args[0]}:`)
    for (i in results){
      let time = results[i].birthdate.toString();
      let dateTime = time.substring(0,15);

      console.log(`- ${Number(i)+1}: ${results[i].first_name} ${results[i].last_name} born ${dateTime}`)
    }

    knex.destroy();
  })






