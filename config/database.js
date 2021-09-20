const parse = require('pg-connection-string').parse;



module.exports = ({ env }) => {

if(env('NODE_ENV') === 'production') {
  const config = parse(process.env.DATABASE_URL)
  return{
      defaultConnection: 'default',
      connection:{
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
          },
          options: {
            ssl: false,
          }
        }
      }
  }
}
  return{
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'mongoose',
        settings: {
          host: env('DATABASE_HOST', 'cluster0.2mzav.mongodb.net'),
          srv: env.bool('DATABASE_SRV', true),
          port: env.int('DATABASE_PORT', 27017),
          database: env('DATABASE_NAME', 'strapi-atlas'),
          username: env('DATABASE_USERNAME', 'seedkarouser'),
          password: env('DATABASE_PASSWORD', 'user123'),
        },
        options: {
          authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
          ssl: env.bool('DATABASE_SSL', true),
        },
      },
    },
  }
};
