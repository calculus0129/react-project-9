import fs from 'node:fs'; // allow to work with filesystem

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';


const db = sql('meals.db');

export async function getMeals() {
    // Simulating arbitrary loading time
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // throw new Error('Loading meals failed'); // for error.js output
    return db.prepare('SELECT * FROM meals').all();
    // SELECT all columns from the meals table
}

export function getMeal(slug) {
    // SQL Injection-prone! Do not use this kinda code!
    // return db.prepare('SELECT * FROM meals WHERE slug = '+slug).all();
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions); // sanitize and clean instructions

    // pop the last element. i.e. file extension.
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving Image Failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}
