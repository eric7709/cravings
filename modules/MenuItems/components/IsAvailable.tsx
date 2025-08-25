import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Props = {
  available: boolean;
  label?: string;
  toggleAvailability: () => void;
};

export default function IsAvailable(props: Props) {
  const { available, toggleAvailability, label } = props;
  return (
    <div
      onClick={toggleAvailability}
      className="flex items-center mt-5 cursor-pointer select-none gap-2 text-sm font-medium"
    >
      {available ? (
        <>
          <FaCheckCircle className="text-green-500 text-lg" />
          <span className="text-green-600">{label ?? "Available"}</span>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-red-500 text-lg" />
          <span className="text-red-600">{label ?? "Not Available"}</span>
        </>
      )}
    </div>
  );
}


