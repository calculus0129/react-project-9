// localhost:3000/meals/~
export default function MealDetailsPage({params}) {
    return <h1>Meal Details for {params.mealSlug}</h1>;
}