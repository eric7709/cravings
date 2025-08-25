import { Bell } from "lucide-react";

type Props = {
  admin?: boolean;
};

export default function NotificationDropdown({ admin }: Props) {
  return (
    <div className="h-8 border-2 cursor-pointer grid border-red-500 duration-300 active:scale-90 place-content-center shadow-md rounded-full bg-white w-8">
            <Bell size={17} color="red" className="translate-x-0.5"/>   {" "}
    </div>
  );
}
