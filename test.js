import dbClient from './utils/db';

console.log('Connection status at the beginning:', dbClient.isAlive());

// ... other code
dbClient.initialize();

console.log('Connection status before waiting:', dbClient.isAlive());
async function test () {
  try {
    console.log('Connection status after waiting:', dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
