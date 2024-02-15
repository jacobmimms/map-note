export default function ErrorMessage({ error }) {
  return (
    <div
      className={`absolute flex items-center justify-center w-2/5 h-2/5 rounded-lg bg-opacity-60 inset-0 m-auto ${error.color} z-10 text-white drop-shadow-md`}
    >
      <span className="text-2xl text-center">{error.message}</span>
    </div>
  );
}
