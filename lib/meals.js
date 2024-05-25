import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    // Simulating arbitrary loading time
    await new Promise((resolve)=>setTimeout(resolve, 5000));

    return db.prepare('SELECT * FROM meals').all();
    // SELECT all columns from the meals table
}
