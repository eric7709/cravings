import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateRandomPassword } from "@/utils/getRandomPassword";
import { sendEmail } from "@/utils/sendMail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstname = body.firstName
    const lastname = body.lastName
    const email = body.email
    const phone_number = body.phoneNumber
    const gender = body.gender
    const role = body.role
    const is_active = body.isActive
    const registered_by = body.registeredBy
    if (!firstname || !lastname || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
    }
    const password = generateRandomPassword(firstname);
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !userData?.user?.id) {
      console.error("❌ Auth Error:", authError);
      return NextResponse.json({ error: authError?.message || "Failed to create auth user" }, { status: 400 });
    }
    const authUserId = userData.user.id;
    const { data: employeeData, error: dbError } = await supabaseAdmin
      .from("employees")
      .insert({
        id: authUserId,
        firstname: firstname,
        lastname: lastname,
        email,
        phone_number: phone_number || null,
        gender: gender || null,
        role: role || "employee",
        registered_by: registered_by || "admin",
        is_active
      })
      .select()
      .single();
    if (dbError || !employeeData) {
      console.error("❌ DB Error:", dbError);
      await supabaseAdmin.auth.admin.deleteUser(authUserId);
      return NextResponse.json({ error: dbError?.message || "Failed to insert employee" }, { status: 400 });
    }
    const emailResult = await sendEmail(email, firstname, password, authUserId);
    if (!emailResult.success) {
      console.warn("⚠️ Employee created but email failed to send");
    }
    const employee = {
      id: employeeData.id,
      firstName: employeeData.firstname,
      lastName: employeeData.lastname,
      email: employeeData.email,
      phoneNumber: employeeData.phone_number,
      gender: employeeData.gender,
      role: employeeData.role,
      isActive: employeeData.is_active,
      createdAt: employeeData.created_at,
      registeredBy: employeeData.registered_by,
    };
    return NextResponse.json(employee, { status: 200 });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}