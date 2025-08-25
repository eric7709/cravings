import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id
    const firstname = body.firstName
    const lastname = body.lastname
    const email = body.email
    const phone_number = body.phoneNumber
    const gender = body.gender
    const role = body.role
    const is_active = body.isActive


    if (!id) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }
    if (!firstname || !lastname || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    const { data: existingEmployee, error: fetchError } = await supabaseAdmin
      .from("employees")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message || "Error checking employee existence" },
        { status: 400 }
      );
    }

    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    const { data: updatedEmployee, error: updateError } = await supabaseAdmin
      .from("employees")
      .update({
        firstname: firstname,
        lastname: lastname,
        email,
        phone_number: phone_number || null,
        gender: gender || null,
        role: role || "employee",
        is_active: is_active ?? true,
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (updateError || !updatedEmployee) {
      return NextResponse.json(
        { error: updateError?.message || "Failed to update employee" },
        { status: 400 }
      );
    }

    const employee = {
      id: updatedEmployee.id,
      firstName: updatedEmployee.firstname,
      lastName: updatedEmployee.lastname,
      email: updatedEmployee.email,
      phoneNumber: updatedEmployee.phone_number,
      gender: updatedEmployee.gender,
      role: updatedEmployee.role,
      isActive: updatedEmployee.isactive,
      createdAt: updatedEmployee.created_at,
      registeredBy: updatedEmployee.registered_by,
    };

    return NextResponse.json(employee, { status: 200 });
  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}