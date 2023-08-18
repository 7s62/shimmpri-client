import cn from "../../services/cn";

export const SelectCoinDropdownOption: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg
      className={cn("-mr-1 ml-2 h-5 w-5", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="black"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
        stroke="black"
        fill="black"
      />
    </svg>
  );
};
