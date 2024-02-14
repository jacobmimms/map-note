import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ToggleButton({ icon, className, ...props }) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`w-6 h-6 text-slate-200 bg-slate-800 rounded-full p-2 hover:cursor-pointer ${className}`}
      {...props}
    />
  );
}
