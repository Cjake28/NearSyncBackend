import {app} from './app.js';
import initTables from './src/db/schema/InitializeTables.js'


const PORT = process.env.PORT;
initTables().then(() => {
  app.listen(PORT || 9220, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to create tables', err);
});