"use client";

export default function Welcome() {
  return (
    <div
      className={`transition-opacity duration-300 ${
        true ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <p>{/* Hello and welcome {customer.title} {customer.name} */}</p>
    </div>
  );
}
