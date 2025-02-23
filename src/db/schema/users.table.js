import db from '../db.connect.js';

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
        id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email      VARCHAR(255) NOT NULL UNIQUE, -- Used for login & verification
        password   VARCHAR(255) NOT NULL, -- Store hashed password
        username   VARCHAR(50) NOT NULL UNIQUE, -- Unique identifier for login & mentions (@username)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(query);
    console.log("✅ Users table created successfully.");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};

export default createUsersTable;
