'use client';

import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
    const { pending } = useFormStatus(); // object destructuring

    return (
        <button disabled={pending} type="submit">
            {pending ? 'Submitting...' : 'Share Meal'}
        </button>
    );
}