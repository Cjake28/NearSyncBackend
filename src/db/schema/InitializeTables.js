import createUsersTable from './users.table.js';
import user_sessions_table from './users_session.table.js'
import users_profile_table from './users_profile.table.js'

const initTables = async () => {
  try {
    console.log("🔧 Initializing database tables...");
    
    await createUsersTable();
    await user_sessions_table();
    // await users_profile_table();
    
    console.log("✅ All tables initialized successfully.");
  } catch (error) {
    console.error("❌ Error initializing tables:", error);
    throw error; // Ensures the caller (server startup) knows there was a failure
  }
};

export default initTables;
