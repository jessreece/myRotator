import postgres from 'postgres' 

const sql = postgres({
  // debug: (conn, query, params) => console.log(query, params),
  transform: {
    ...postgres.camel,
    undefined: null,
  },
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT) ?? 5432,
  database: process.env.PGDATABASE ?? 'postgres',
})

export default sql