import React from 'react';
import img from '../../img/success-image.svg'
import s from '../SuccesForm/success.module.css'
import {useAppDispatch} from "../../app/hooks";
import {userAction, userReducer} from "../../features/users/users.slise";


const Success = () => {
    const dispatch = useAppDispatch();
    const onClickHundler = () =>{
        dispatch(userAction.setSuccess(false))
    }
    return (
        <div>
            <p className={s.h}>User successfully registered</p>
            <img src={img} alt="succes image"/>
            <div>
                <button  className={s.button} onClick={onClickHundler}>New request</button>
            </div>

        </div>
    );
};

export default Success;