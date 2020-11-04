import BlueAvatar from "../assets/images/avatars/avatar_1.png";
import GrayAvatar from "../assets/images/avatars/avatar_2.png";
import GreenAvatar from "../assets/images/avatars/avatar_3.png";
import PurpleAvatar from "../assets/images/avatars/avatar_4.png";
import RedAvatar from "../assets/images/avatars/avatar_5.png";

const Avatar = props => {
  switch (props.id) {
    case 1:
      return (<img src={BlueAvatar} alt={"avatar"} />);
    case 2:
        return (<img src={GrayAvatar} alt={"avatar"} />);
    case 3:
      return (<img src={GreenAvatar} alt={"avatar"} />);
    case 4:
        return (<img src={PurpleAvatar} alt={"avatar"} />);
    case 5:
        return (<img src={RedAvatar} alt={"avatar"} />);
    default:
        return (<img src={BlueAvatar} alt={"avatar"} />);
  }
}

export default Avatar