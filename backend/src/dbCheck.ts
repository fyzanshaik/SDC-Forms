const { neon } = require('@neondatabase/serverless');

const sql = neon(`postgresql://formdatabase_owner:DphmAc04vVjH@ep-broad-fire-a600xjy3.us-west-2.aws.neon.tech/formdatabase?sslmode=require`);

async function getPgVersion() {
	const result = await sql`SELECT version()`;
	console.log(result[0]);
}

getPgVersion();
