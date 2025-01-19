import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req);
    const { temperature, humidity } = req.body;
console.log(temperature,temperature);
    // Validate the incoming data
    if (!temperature || !humidity) {
      return res.status(400).json({ error: 'Temperature and humidity are required!' });
    }

    try {
      // Insert data into the database
      const query = 'INSERT INTO sensor_data (temperature, humidity, timestamp) VALUES ($1, $2, NOW())';
     // await pool.query(query, [temperature, humidity]);

      res.status(200).json({ success: true, message: 'Data inserted successfully!' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ success: false, error: 'Failed to insert data.' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
