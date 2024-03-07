interface headerProps {
  label: string;
}

const Header = ({ label }: headerProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-3xl font-semibold">🔐Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
