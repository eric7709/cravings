import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function FlexInLg({ children }: Props) {
  return <div className="lg:flex hidden">{children}</div>;
}
