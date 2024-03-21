"use client";

import { Logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const Settings = () => {
  const user = useCurrentUser();

  const handleClick = () => {
    Logout();
  };
  return (
    <div>
      <button type="submit" onClick={handleClick}>
        Sign out
      </button>
    </div>
  );
};

export default Settings;
