import { useState } from 'react';
import myimg from '../assets/Screenshot_2025-removebg-preview.png'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <nav className="Nav">
                <div >
                    <img className="logoimg" src={myimg} />
                </div>
                <ul className="Navlist">
                    <li onClick={() => { navigate("/") }}>Home </li>
                    <li>Contact Us </li>
                    <li>About </li>
                </ul>
            </nav>
            <div className="WelcomeBox">
                <br />
                <h1>Welcome to Rate and Rank</h1>
                <h2>Get started !</h2>
                <br />
                <button onClick={() => { navigate("/login") }} >System Administrator</button>
                <br />
                <button onClick={() => { navigate("/Normaluser") }}>Normal User</button>
                <br />
            </div>
        </>
    )
}

export default Home;