import React from 'react';
import s from '../ImagePart/imagePart.module.css'

const ImagePart = () => {
    return (
        <div className={s.main}>
            <div className={s.text_block}>
                <h1 className={s.for_h1}>Test assignment for front-end developer</h1>
                <p className={s.for_paragraf}>
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a
                    vast
                    understanding of User design thinking as they'll be building web interfaces with accessibility in
                    mind.
                    They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <button className={s.button_sing}>Sing up</button>
            </div>


        </div>
    );
};

export default ImagePart;