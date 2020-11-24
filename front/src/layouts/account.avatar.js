import Cookies from 'js-cookie';

const Avatar = (props) => {

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
        'avatar': id,
      })
    })
    .then(res => res.json());
    window.location.reload();
  }

  return (
    <>
      <div className="account-block">
        <h3>Changer d'avatar</h3>
        <div className="account-avatar">
          <section className="account-avatar-list">
            <button onClick={() => {handleClick(1)}}>
              <img src={process.env.REACT_APP_API_HOST + "/ressources/static/avatars/avatar_1.png"} alt="blue avatar" />
            </button>
            <button onClick={() => {handleClick(2)}}>
              <img src={process.env.REACT_APP_API_HOST + "/ressources/static/avatars/avatar_2.png"} alt="gray avatar" />
            </button>
            <button onClick={() => {handleClick(3)}}>
              <img src={process.env.REACT_APP_API_HOST + "/ressources/static/avatars/avatar_3.png"} alt="green avatar" />
            </button>
            <button onClick={() => {handleClick(4)}}>
              <img src={process.env.REACT_APP_API_HOST + "/ressources/static/avatars/avatar_4.png"} alt="purple avatar" />
            </button>
            <button onClick={() => {handleClick(5)}} >
              <img src={process.env.REACT_APP_API_HOST + "/ressources/static/avatars/avatar_5.png"} alt="red avatar" />
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Avatar;