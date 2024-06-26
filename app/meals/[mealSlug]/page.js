import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        notFound(); // stop and show the closest not-found or error page.
    }
    
    return {
        title: meal.title,
        description: meal.summary,
    };
};

// localhost:3000/meals/~
export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);

    // also needed because the call in the async generateMetadata function will not affect this part!
    if (!meal) {
        notFound(); // stop and show the closest not-found or error page.
    }

    // Replace line change into <br /> tag
    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>Meal Details for {meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    );
}