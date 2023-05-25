import React, {useEffect} from 'react';
import s from '../Form/post.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../src/app/hooks";
import {isLoadingLinear, positions, rejected, userThunks} from "../../../src/features/users/users.slise";
import {useSelector} from "react-redux";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {CircularProgress} from "@mui/material";
import TransitionAlerts from "../Alert/TransitionAlerts";


type Inputs = {
    name: string,
    email: string,
    phone: string,
    position_id: string,
    file: any
};
const phoneRegExp = /^[\+]{0,1}380([0-9]{9})$/
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const schema = yup.object().shape({
    email: yup.string().email().required(),
    phone: yup.string().matches(phoneRegExp),
    name: yup.string().required().min(2).max(50),
    file: yup.mixed().test("file", "You need to provide a file", (value: any) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    })


});

const Post = () => {

    const loading = useSelector(isLoadingLinear)
    const rejectNotification = useSelector(rejected)


    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm<Inputs>(
        {
            defaultValues: {
                name: '',
                email: '',
                phone: '',
                position_id: '',


            },
            resolver: yupResolver(schema),


        }
    );

    useEffect(() => {
        reset()
    }, [isSubmitSuccessful, reset])
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userThunks.position(''))
    }, [])


    const positionArray = useSelector(positions)

    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        const formData = new FormData();
        let myID = positionArray.filter(f => f.name === data.position_id)[0].id
        formData.append('email', data.email)
        formData.append('name', data.name)
        formData.append('phone', data.phone)
        formData.append('position_id', myID.toString())
        formData.append('photo', data.file[0])
        dispatch(userThunks.postUsers(formData))

    }


    return (

        <div className={s.main}>

            <h1 className={s.text}>Working with POST request </h1>


            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input className={s.input} placeholder={'Your name'} {...register("name",)} />
                {errors.name && <span>Имя должно содержать от 2 до 50 букв </span>}
                {/* include validation with required or other standard HTML validation rules */}
                <input className={s.input} placeholder={'Email'}
                       {...register("email",)} />
                {errors.email && <span>Введите верный email , пример jhon@example.com </span>}
                <input className={s.input}
                       placeholder={'Phone'} {...register("phone",)} />
                {errors.phone && <span>Введите верный номер телефона</span>}
                <label className={s.label}>+38 (XXX) XXX - XX - XX</label>
                <div className={s.position}>
                    Select your position
                </div>
                <div className={s.radio_button}>
                    {positionArray.map((m) =>
                        <div key={m.id}>
                            <input className={s.customradio} type="radio" id={m.id.toString()}
                                   value={m.name} {...register("position_id",)}/>
                            <label className={s.label_button} htmlFor={m.id.toString()}>{m.name}</label>
                        </div>
                    )}
                </div>
                <div className={s.file}>
                    <input className={s.input_for_file} placeholder={'Upload'}
                           disabled={true}/>
                    <label className={s.input_for_download_file} placeholder={'Upload your photo'}
                           htmlFor="file">
                        Upload your photo

                        <input type="file"
                               id="file"
                               className={s.file_input} {...register("file")
                               }
                        />
                    </label>

                </div>
                {loading && <CircularProgress/>}
                {rejectNotification && <TransitionAlerts/>
                }
                {errors.file && <span>File error</span>}
                <input className={s.button} type="submit" value={'Sing up'}/>


            </form>

        </div>
    );
};

export default Post;


