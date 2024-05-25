import Link from "next/link";
export default function ShareMealPage() {
    return (
        <main>
            <h1>Share Your Meals!</h1>
            <p><Link href="/meals">Meals</Link></p>
        </main>
    );
};