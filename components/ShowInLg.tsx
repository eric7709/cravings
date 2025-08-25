import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ShowInLg({ children }: Props) {
  return <div className="lg:block hidden">{children}</div>;
}
