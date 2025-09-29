import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgres://root:mysecretpassword@localhost:5432/local",
});

  // Helper for running queries
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;