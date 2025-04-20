import { Button } from "@mui/joy";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const UsersHeader = ({ currentUser, onLogout }) => {
  return (
    <div className="header">
      <h2 className="greeting-text">Вітаємо, {currentUser?.name}!</h2>
      <div className="header__btn">
        <Button
          className="logOut-btn"
          color="neutral"
          onClick={onLogout}
          size="sm"
          variant="soft"
        >
          Log Out
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default UsersHeader;
