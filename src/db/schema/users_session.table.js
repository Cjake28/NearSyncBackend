import db from '../db.connect.js';

const user_sessions_table = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_sessions (
        id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id       BIGINT UNSIGNED NOT NULL,
        refresh_token TEXT NOT NULL, -- Store hashed refresh tokens securely
        expires_at    TIMESTAMP NOT NULL, -- Expiry date for refresh token
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.query(query);
    console.log("✅ user_sessions table created successfully.");
  } catch (error) {
    console.error("❌ Error creating user_sessions table:", error);
  }
};

export default user_sessions_table;
