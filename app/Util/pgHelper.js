var pg = require('pg');

// bigint
pg.types.setTypeParser(20, function (value) {
  return parseInt(value);
});

// numeric
pg.types.setTypeParser(1700, function (value) {
  return parseFloat(value);
});
