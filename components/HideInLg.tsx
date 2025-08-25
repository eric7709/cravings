import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HideInLg({ children }: Props) {
  return <div className="lg:hidden">{children}</div>;
}
