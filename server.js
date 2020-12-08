require('dotenv').config();
require('./lib/utils/pool.js').connect();

const app = require('./index.js');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
