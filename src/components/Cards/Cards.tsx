import React, { useEffect, useState } from "react";
import s from "../Cards/cards.module.css";
import { useAppDispatch } from "../../app/hooks";
import { userCount, usersLoadingFlag, usersResp, userThunks } from "../../features/users/users.slise";
import { useSelector } from "react-redux";
import Card from "../Cards/Card";
import Skeleton from "../Sceleton/Skeleton";

const Cards = () => {
  const dispatch = useAppDispatch();
  const [startPage, setStartPage] = useState(6);
  const users = useSelector(usersResp);
  const page = useSelector(userCount);
  const loader = useSelector(usersLoadingFlag);

  const pageDisabled = (num1: number, num2: number) => num1 === num2;   // проверка на отключение кнопки

  const nextPage = () => {  //добавление следующих 6 юзеров
    setStartPage(startPage + 6);
  };


  useEffect(() => {    // получаем первые 6 юзеров
    dispatch(userThunks.users(startPage));
  }, [startPage]);


  return (


    <div className={s.main}>
      <div className={s.text}>
        Working with GET request
      </div>
      <div className={s.cards}>


        {users.map(m => !loader ? <Skeleton /> :  // показываем скелетон пока идет загрузка
          <Card key={m.id} email={m.email} image={m.photo} number={m.phone} name={m.name}
                position={m.position} />
        )}
      </div>


      <button disabled={pageDisabled(users.length, page)} onClick={nextPage} className={s.button}>Show more
      </button>


    </div>
  );
};

export default Cards;

