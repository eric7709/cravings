type Props = {
  title: string 
}

export default function AdminTitle(props: Props) {
  return <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{props.title}</h1>;
}
