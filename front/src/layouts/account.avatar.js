import Cookies from 'js-cookie';

import BlueAvatar from "../assets/images/avatars/avatar_1.png";
import GrayAvatar from "../assets/images/avatars/avatar_2.png";
import GreenAvatar from "../assets/images/avatars/avatar_3.png";
import PurpleAvatar from "../assets/images/avatars/avatar_4.png";
import RedAvatar from "../assets/images/avatars/avatar_5.png";
import { useState, useEffect } from 'react';

const Avatar = (props) => {

  const [activeAvatar, setActiveAvatar] = useState(props.activeAvatar);
  const handleClick = (id) => {
    fetch(`${process.env.REACT_APP_API_HOST}/user/update/avatar/${props.uid}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('access_token'),
        'Access-Control-Allow-Origin': "*"        
      },
      body: JSON.stringify({
        'avatar_id': id,
      })
    })
    .then(res => res.json())
    .then(data => {

    });
  }

  useEffect(() => {
    setActiveAvatar(props.activeAvatar);
  }, [props.activeAvatar])

  return (
    <>
      <div className="account-block">
        <h3>Changer d'avatar</h3>
        <div className="account-avatar">
          <section className="account-avatar-list">
            <button onClick={() => {handleClick(1); setActiveAvatar(1)}}>
              <img src={BlueAvatar} alt="blue avatar" className={activeAvatar === 1 ? "success" : "" } />
            </button>
            <button onClick={() => {handleClick(2); setActiveAvatar(2)}}>
              <img src={GrayAvatar} alt="gray avatar" className={activeAvatar === 2 ? "success" : "" } />
            </button>
            <button onClick={() => {handleClick(3); setActiveAvatar(3)}}>
              <img src={GreenAvatar} alt="green avatar" className={activeAvatar === 3 ? "success" : "" } />
            </button>
            <button onClick={() => {handleClick(4); setActiveAvatar(4)}}>
              <img src={PurpleAvatar} alt="purple avatar" className={activeAvatar === 4 ? "success" : "" } />
            </button>
            <button onClick={() => {handleClick(5); setActiveAvatar(5)}} >
              <img src={RedAvatar} alt="red avatar" className={activeAvatar === 5 ? "success" : "" } />
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Avatar;