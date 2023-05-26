import React from 'react';
import s from '../Cards/card.module.css'

type CardProps = {
    image: string,
    name: string,
    position: string,
    email: string,
    number: string
}


const Card = (props: CardProps) => {

    const phone = (s: string) => {
        const phone_numeric = new String(s).replace(/[^\d]+/g, "");
        return phone_numeric.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");

    }
    const emailLength = (email: string) => email.length > 30 ? `${s.email}` : ''


    return (
        <div className={s.main}>
            <div><img className={s.img} src={props.image}/></div>
            <div className={s.card_name}>{props.name}</div>
            <div>{props.position}</div>
            <div className={emailLength(props.email)}>{props.email}</div>
            <div> {phone(props.number.slice(1))}</div>
        </div>
    );
};

export default Card;