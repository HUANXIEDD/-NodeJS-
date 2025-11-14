const db = require('../util/db');

async function test() {
    try {
        const [insertResult] = await db.query(db.sqlInsert, ['testUser12', 'testPassword']);
        console.log('Test data inserted successfully:', insertResult);

        const [checkResult] = await db.query(db.sqlCheck, ['testUser12']);
        if(checkResult.length > 0) {
            console.log('Test user found:', checkResult);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

test();