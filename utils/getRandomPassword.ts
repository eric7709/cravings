
export function generateRandomPassword(firstName: string, length = 4) {
  const digits = Math.pow(10, length - 1);
  const randomNumber = Math.floor(digits + Math.random() * (digits * 9));
  const specialChars = "!@#$%^&*";
  const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
  const cleanName =
    (firstName || "User")
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 1)
      .toUpperCase() + (firstName?.slice(1) || "user");

  return `${cleanName}${randomNumber}${randomChar}`;
}