import { useAuth } from "@/context/AuthContext";

export default function HeaderHomeLog() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between h-14 bg-teal-700">
      <span className="ml-5">
        {/*<Image src="/logo.png" width={30} height={30} alt="Sistcom Logo" />*/}
      </span>
      <h1 className="headerHomeLog flex text-2xl text-white font-Anta tracking-widest shadow-xl">
        SISTCOM
      </h1>
      <p className="mr-3 text-xs text-white">{user.email}</p>
    </div>
  );
}
