import { Button } from "@mui/joy";

import ThemeToggle from "../ThemeToggle/ThemeToggle";

const FormHeader = ({ currentUser, onLogout }) => {
  return (
    <div className="header">
      <h2 className="greeting-text">
        Hello, {currentUser?.name || "Guest"}! <br />
        <span>Enter your details below to Sign In</span>
      </h2>
      <div className="header__btn">
        <ThemeToggle />
        {currentUser && (
          <Button color="neutral" onClick={onLogout} size="lg" variant="soft">
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormHeader;
