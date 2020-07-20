import app from './app';
require('dotenv').config();

const port = process.env.NODE_PORT || 8080;
async function main() {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Listening on port ${port}.`));
}
main();

// doesn't work, TODO: check why
// process.on('SIGTERM', async () => {
//   // eslint-disable-next-line no-console
//   console.log('Closing database connection..');
//   await db.sequelize.close();
// });
