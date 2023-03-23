import React from 'react';
import {Link} from "react-router-dom";
import './header.css';

function Header() {
    return (
        <div className='header'>
            <Link to="/main">
                한성메이팅
            </Link>
            <div className='header_empty'></div>         
            <Link to="/post/user">
                <div className='header_option'>팀원 찾기</div>
            </Link>
            
            <Link to="/team">
                <div className='header_option'>팀원 모집</div>
            </Link>
            <Link to="/">
                <div className='header_option'>로그인/회원가입</div>
            </Link>           
        </div>
    );
}

export default Header;