import NavLink from "./navLink";
import UserNav from "./userNav";

export default function Nav() {
  console.count("Nav");
  return (
    <div className="ml-1 select-none flex flex-row items-end h-full w-full">
      <NavLink
        className={`w-1/4 text-xl md:text-3xl font-bold text-slate-300`}
        href="/"
      >
        Loc.Pics
      </NavLink>
      <NavLink className={`w-1/4`} href="/nearby">
        Nearby
      </NavLink>
      <NavLink className={`w-1/4 `} href="/explore">
        Explore
      </NavLink>
      <UserNav className={`w-full`} />
    </div>
  );
}
