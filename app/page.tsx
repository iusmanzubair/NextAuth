import LoginButton from "@/components/auth/LoginButton";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-svh flex flex-col items-center justify-center space-y-6">
      <h1 className="text-5xl font-bold">🔐Auth</h1>
      <p className="text-[1.3rem] font-medium">
        A simple authentication service
      </p>
      <LoginButton>
        <Button size="lg">Sign In</Button>
      </LoginButton>
    </div>
  );
}
