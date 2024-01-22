const fs = require('fs');

fs.cpSync('./dist', './build/public', { recursive: true });