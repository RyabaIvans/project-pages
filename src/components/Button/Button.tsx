import React from 'react';
import s from '../Button/button.module.css'

type BtnProps = {
    name: string,
    onClick: (e: React.MouseEvent) => void
}
const Button = (props: BtnProps) => {
    const onClickHundler = () => {
        console.log('press btn')
    }

    return (
        <div>
            <button onClick={onClickHundler} className={s.main}>{props.name}</button>
        </div>
    );
};

export default Button;