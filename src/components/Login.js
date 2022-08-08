import React from "react";
import {useRef,useState,useEffect,useContext} from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const qs = require('qs');
const LOGIN_URL = '/api/login';


const Login = ()=>{
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState('');

    useEffect(()=>{
        userRef.current.focus();
    },[]);
    useEffect(()=>{
        setErrMsg('');
    },[user,pwd])


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(
                LOGIN_URL,
                qs.stringify({username:user,password:pwd}),
                {headers:{'Content-Type':'application/x-www-form-urlencoded'}});
            console.log(response.data);
            const accessToken = response.data.access_token;
            const roles = response.data.roles;
            setAuth({user,pwd,roles,accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        }catch (err){
            if(!err?.msg){
                setErrMsg('No server response')
            }else {
                setErrMsg("some error to personalize")
            }
            errRef.current.focus();
        }


    };

    return(
        <div>
            <>{success ? (
                <section className="vh-100" style={{backgroundColor : '#508bfc'}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div ref={errRef}  className={errMsg ? "alert alert-danger" : ""}>{errMsg}</div>
                                <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                                    <div className="card-body p-5 text-center">
                                        <h1>You are logged in </h1>
                                        <br/>
                                        <p>
                                            <a href="#" style={{color:"red"}}>Go to home</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ):(

            <section className="vh-100" style={{backgroundColor : '#508bfc'}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div ref={errRef}  className={errMsg ? "alert alert-danger" : ""}>{errMsg}</div>

                            <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Sign in</h3>


                                    <form onSubmit={handleSubmit} >
                                    <div className="form-outline mb-4">
                                        <input  ref={userRef}
                                                type="text"
                                                id="username"
                                                className="form-control form-control-lg"
                                                onChange={(e)=>{
                                                    setUser(e.target.value)
                                                }}
                                                value={user}
                                                required
                                        />
                                        <label className="form-label" htmlFor="username">Username</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password"
                                               id="password"
                                               className="form-control form-control-lg"
                                               onChange={(e)=>{
                                                   setPwd(e.target.value)
                                               }}
                                               value={pwd}
                                               required/>
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>



                                    <button className="btn btn-primary btn-lg btn-block" >Login</button>
                                    </form>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                )}
            </>

        </div>
    )
}

export default Login
