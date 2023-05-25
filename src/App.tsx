import React, {useEffect} from 'react';
import './App.css';
import Header from "../src/components/Header/Header";
import ImagePart from "../src/components/ImagePart/ImagePart";
import Cards from "../src/components/Cards/Cards";
import Post from "../src/components/Form/Post";
import {useAppDispatch} from "../src/app/hooks";
import {forTosterCall, userThunks} from "../src/features/users/users.slise";
import {useSelector} from "react-redux";
import Toast from "../src/components/Toast/Toast";
import "react-toastify/dist/ReactToastify.css";


// import Form from "../src/components/Form/Form";


function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(userThunks.token(''))
    }, [])
    const flag = useSelector(forTosterCall)


    return (
        <div className="App">

            {flag && <Toast/>}
            <Header/>
            <ImagePart/>
            <Cards/>
            <Post/>
        </div>
    );
}

export default App;
