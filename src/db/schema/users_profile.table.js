import db from '../db.connect.js';

const users_profile_table = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_profiles (
        id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id    BIGINT UNSIGNED NOT NULL UNIQUE, -- Links to users table (1-to-1)
        FirstName  VARCHAR(100), -- Publicly displayed name
        LastName VARCHAR(100)
        bio        TEXT, -- User bio
        avatar_url VARCHAR(255), -- Profile picture URL
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.query(query);
    console.log("✅ Users profile table created successfully.");
  } catch (error) {
    console.error("❌ Error creating users profile table:", error);
  }
};

export default users_profile_table;
