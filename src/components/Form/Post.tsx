import React, { useEffect, useState } from "react";
import s from "../Form/post.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../src/app/hooks";
import {
  forSuccessFlag,
  isLoadingLinear,
  positions,
  rejected,
  userThunks
} from "../../../src/features/users/users.slise";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import TransitionAlerts from "../Alert/TransitionAlerts";
import Success from "../SuccesForm/Success";
import { LightTooltip } from "../Tooltip/LightTooltip";


type Inputs = {
  name: string,
  email: string,
  phone: string,
  position_id: string,
  file: any
};
const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/;


//валидация через юп
const schema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp),
  position_id: yup.string().required(),
  name: yup.string().required().min(2).max(50),
  file: yup.mixed().test("file", "You need to provide a file", (value: any) => {
    return value.length > 0;
  })


});

const Post = () => {

  const loading = useSelector(isLoadingLinear);
  const rejectNotification = useSelector(rejected);
  const successImage = useSelector(forSuccessFlag);
  const positionArray = useSelector(positions);
  const dispatch = useAppDispatch();
  const [val, setVal] = useState("");


  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { defaultValues, errors, isSubmitSuccessful }
  } = useForm<Inputs>(
    {
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        position_id: ""
      },
      resolver: yupResolver(schema)
    }
  );


  // обновление формы + получение массива с позициями
  useEffect(() => {
    reset();
    dispatch(userThunks.position(""));
  }, [isSubmitSuccessful, reset]);


  // получение данных с формы и создание формдаты для формирования запроса на сервер
  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    const formData = new FormData();
    let myID = positionArray.filter(f => f.name === data.position_id)[0].id;
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("position_id", myID.toString());
    formData.append("photo", data.file[0]);
    dispatch(userThunks.postUsers(formData));
  };


  // функция для вывода названия картинки для кастомного инпута
  const onclickHandler = () => {
    setVal(getValues("file")["0"].name);
  };


  return (

    <div className={s.main}>

      {!successImage &&

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={s.text}>Working with POST request </h1>
          <LightTooltip placement="bottom-start" title={"Write yor name , at least 2 symbol "}>
            <input className={s.input} placeholder={"Your name"} {...register("name")} />
          </LightTooltip>
          {/* register your input into the hook by invoking the "register" function */}

          {errors.name && <span className={s.error}>Имя должно содержать от 2 до 50 букв </span>}
          {/* include validation with required or other standard HTML validation rules */}
          <LightTooltip placement="bottom-start" title={"Write email adress , example jhon@gmail.com "}>
            <input className={s.input} placeholder={"Email"}
                   {...register("email")} />
          </LightTooltip>
          {errors.email && <span className={s.error}>Введите верный email , пример jhon@example.com </span>}
          <LightTooltip placement="bottom-start" title={"Write you phone number "}>
            <input className={s.input}
                   placeholder={"Phone"} {...register("phone")} />
          </LightTooltip>
          {errors.phone && <span className={s.error}>Введите верный номер телефона</span>}
          <label className={s.label}>+38 (XXX) XXX - XX - XX</label>
          <div className={s.position}>
            Select your position
          </div>
          <div className={s.radio_button}>
            {positionArray.map((m) =>
              <div key={m.id}>
                <div className={s.flex}>
                  <input type="radio" id={m.id.toString()}
                         value={m.name} {...register("position_id")} />
                  <label className={s.label_button} htmlFor={m.id.toString()}>{m.name}</label>
                </div>
              </div>
            )}

          </div>
          {errors.position_id && <span className={s.error}>Выберете категорию </span>}
          <LightTooltip placement="bottom-start" title={"Add your photo , jpeg only "}>
            <div className={s.file}>
              <input className={s.input_for_file} placeholder={"Upload"}
                     disabled={true} />
              <label onChange={onclickHandler}
                     className={val.length > 1 ? `${s.input_for_download_file_succes}` : `${s.input_for_download_file}`}
                     placeholder={"Upload your photo"}
                     htmlFor="file">
                Upload your photo

                <input
                  type="file"
                  id="file"
                  className={s.file_input} {...register("file")
                  }
                />
              </label>

            </div>
          </LightTooltip>
          {loading && <CircularProgress />}
          {rejectNotification && <TransitionAlerts />}

          {errors.file && <span className={s.error}>File error</span>}
          {val.length > 1 && val}

          <input className={s.button} type="submit" value={"Sing up"} />

        </form>

      }


      {successImage && <Success />}
    </div>
  );
};

export default Post;


