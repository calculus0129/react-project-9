'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) { // FormData Object
    const meal = {
        title: formData.get('title'), // get the content of input with the 'name'='title'!
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'), // --> stored on the filesystem and a path to the img
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    let isInvalid=false;
    for(const key in meal) {
        // console.log(`${key}: ${meal[key]}`);
        isInvalid |= key != 'image' && isInvalidText(meal[key]);
    }
    isInvalid |= !meal.creator_email.includes('@');
    if(!meal.image || meal.image.size === 0) {
        return {
            message: 'Upload image. .png, .jpg, .jpeg, .gif'
        };
    }

    if(isInvalid) {
        // throw new Error('Invalid Input');
        return {
            message: 'Invalid Input.'
        }; // Should be a 'serializable object'
        // i.e. no methods should be used as they will get lost whilst being sent to the client
        // nested arrays & etc. are all okay.
    }

    // console.log(meal);
    await saveMeal(meal);
    revalidatePath('/meals'); // revalidate a certain route path
    redirect('/meals'); // redirect the user
}