import { NextResponse } from 'next/server';
//import { Pool } from 'pg';

// Create a connection pool
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { temperature, humidity } = body;
    console.log("www >> ",body);

    if (!temperature || !humidity) {
      return NextResponse.json({ error: 'Temperature and humidity are required!' }, { status: 400 });
    }

   // const query = 'INSERT INTO sensor_data (temperature, humidity, timestamp) VALUES ($1, $2, NOW())';
    //await pool.query(query, [temperature, humidity]);

    return NextResponse.json({ success: true, message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error);

    return NextResponse.json({ success: false, error: 'Failed to insert data.' }, { status: 500 });
  }
}
