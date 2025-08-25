import { MdOutlineTableBar } from "react-icons/md";

export default function Page() {
  return (
    <div className="h-screen grid place-content-center p-4 bg-red-100">
      <div className="flex flex-col gap-3 items-center justify-center text-center p-10 rounded-xl ">
        <MdOutlineTableBar className="text-6xl text-red-500 animate-shake" />
        <p className="font-semibold text-red-600">
          Oops! This table’s QR code isn’t valid.
        </p>
        <p className="text-sm text-gray-800">
          Please check the code or ask a staff member for help.
        </p>
      </div>
    </div>
  );
}
