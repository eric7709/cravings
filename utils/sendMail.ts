import { transporter } from "./transporter";
export async function sendEmail(to: string,name: string, password: string, userId: string) {
  try {
    await transporter.sendMail({
      from: '"Bite Point" <ericemeka732@gmail.com>',
      to,
      subject: "Your Account Has Been Created",
      text: `Welcome ${name}! Your account has been created.\n\nYour User ID: ${userId}\nYour Password: ${password}`,
      html: `
        <p>Welcome ${name}! Your account has been created.</p>
        <p><b>Password:</b> ${password}</p>
      `,
    });
    (`📧 Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Email Error:", error);
    return { success: false, error };
  }
}