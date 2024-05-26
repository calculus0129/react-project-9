import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    // Simulating arbitrary loading time
    await new Promise((resolve)=>setTimeout(resolve, 5000));

    // throw new Error('Loading meals failed'); // for error.js output
    return db.prepare('SELECT * FROM meals').all();
    // SELECT all columns from the meals table
}

export function getMeal(slug) {
    // SQL Injection-prone! Do not use this kinda code!
    // return db.prepare('SELECT * FROM meals WHERE slug = '+slug).all();
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}