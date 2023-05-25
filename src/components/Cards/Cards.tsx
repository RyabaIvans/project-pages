import React, {useEffect, useState} from 'react';
import s from '../Cards/cards.module.css'
import {useAppDispatch} from "../../app/hooks";
import {userCount, usersLoadingFlag, usersResp, userThunks} from "../../features/users/users.slise";
import {useSelector} from "react-redux";
import Card from "../Cards/Card";
import Sceleton from "../Sceleton/Sceleton";

const Cards = () => {
    const [startPage, setStartPage] = useState(6)
    const users = useSelector(usersResp)
    const page = useSelector(userCount)
    const loader = useSelector(usersLoadingFlag)

    const pageDisabled = (num1: number, num2: number) => num1 === num2

    const nextPage = () => {
        setStartPage(startPage + 6)
    }


    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(userThunks.users(startPage))
    }, [startPage])


    return (


        <div className={s.main}>

            <div className={s.text}>
                Working with GET request
            </div>
            <div className={s.cards}>


                {users.map(m => !loader ? <Sceleton/> :


                    <Card key={m.id} email={m.email} image={m.photo} number={m.phone} name={m.name}
                          position={m.position}/>
                )}
            </div>


            <button disabled={pageDisabled(users.length, page)} onClick={nextPage} className={s.button}>Show more
            </button>


            {/*{arr.map(arr => <Sceleton/>)}*/}


        </div>
    );
};

export default Cards;

