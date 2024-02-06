import React from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({
  title,
  className = "wide",
  onClick,
}: {
  title: string;
  className: string;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={` btn ${className} bg-primary mb-4 text-slate-50 hover:text-green-700  `}
      title="آپلود"
      onClick={onClick}
    >
      {pending ? <progress className="progress w-14"></progress> : title}
    </button>
  );
}

export default SubmitButton;
