interface Props {
  type: string;
  age: number;
  name: string;
}

export default function Animal({ type, name, age }: Props) {
  return (
    <li>
      <strong>{type}</strong> {name} {age}
    </li>
  );
}
