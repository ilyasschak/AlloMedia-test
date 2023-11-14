const fs = require('fs');
const crypto = require('crypto');

let envFile = fs.readFileSync('.env', 'utf-8');

const secretKeyRegex = new RegExp('JWT_SECRET=([^\\s]+)', 'g');
const secretKeyMatches = envFile.match(secretKeyRegex);
const refreshKeyRegex = new RegExp('JWT_REFRESH=([^\\s]+)', 'g');
const refreshKeyMatches = envFile.match(refreshKeyRegex);



if (secretKeyMatches && secretKeyMatches.length > 0) {
  console.log('The secret key already exists in the .env file.');
} else {
    const secretKey = crypto.randomBytes(32).toString('hex');
    envFile += `\nJWT_SECRET=${secretKey}`;
    
}
if (refreshKeyMatches && refreshKeyMatches.length > 0) {
  console.log('The refresh key already exists in the .env file.');
} else {
    const refreshKey = crypto.randomBytes(32).toString('hex');
    envFile += `\nJWT_REFRESH=${refreshKey}`;
}

fs.writeFileSync('.env', envFile);