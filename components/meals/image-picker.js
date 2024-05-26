'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInputRef = useRef();
    function handlePickClick() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null); // Reset the previewed image if no image was selected:
            return;
        }
        // make a dataURL
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result); // the param is the dataURL
        };
        fileReader.readAsDataURL(file); // X returns anything. But...
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image
                        src={pickedImage}
                        alt="The image selected by the user."
                        fill />}
                </div>
                {/* The CSS style makes the input invisible to user for styling purpose. */}
                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    name={name}
                    ref={imageInputRef}
                    onChange={handleImageChange}
                />
                <button
                    className={classes.button}
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}