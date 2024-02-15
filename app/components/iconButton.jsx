import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ToggleButton({
  icon,
  className,
  size,
  backgroundColor,
  noButton,
  ...props
}) {
  backgroundColor = backgroundColor || "bg-slate-800";
  size = `h-${size} w-${size}` || "h-12 w-12";
  if (noButton) {
    return (
      <div
        {...props}
        className={`flex items-center justify-center ${size} stext-slate-200 ${backgroundColor} p-2 ${className} rounded-lg  hover:cursor-pointer hover:brightness-75`}
      >
        <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      </div>
    );
  }

  return (
    <button
      {...props}
      className={`flex items-center justify-center ${size} stext-slate-200 ${backgroundColor} p-2 hover:cursor-pointer hover:brightness-75 ${className} rounded-lg`}
    >
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
    </button>
  );
}
