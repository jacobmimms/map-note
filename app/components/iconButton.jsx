import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ToggleButton({
  icon,
  className,
  size,
  backgroundColor,
  ...props
}) {
  backgroundColor = backgroundColor || "bg-slate-800";
  size = `h-${size} w-${size}` || "h-12 w-12";
  return (
    <button
      {...props}
      className={`flex items-center justify-center ${size} stext-slate-200 ${backgroundColor} p-2 hover:cursor-pointer hover:brightness-75 ${className} rounded-lg`}
    >
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
    </button>
  );
}
