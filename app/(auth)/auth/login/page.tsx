import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";
import LoginForm from "@/modules/Employees/components/LoginForm";

export default function page() {
  return (
    <RedirectIfAuthenticated>
      <LoginForm />;
    </RedirectIfAuthenticated>
  );
}
