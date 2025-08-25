import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
    }

    console.log("🗑️ Starting deletion process for employee:", id);

    // Step 1: Verify employee exists
    const { data: employee, error: employeeCheckError } = await supabaseAdmin
      .from("employees")
      .select("id, email, firstname, lastname")
      .eq("id", id)
      .single();

    if (employeeCheckError || !employee) {
      console.error("❌ Employee not found:", employeeCheckError);
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    console.log("👤 Employee found:", { id: employee.id, email: employee.email });

    // Step 2: Delete from employees table first
    const { error: employeeError } = await supabaseAdmin
      .from("employees")
      .delete()
      .eq("id", id);

    if (employeeError) {
      console.error("❌ Employee deletion error:", employeeError);
      return NextResponse.json(
        { error: employeeError.message || "Failed to delete employee" },
        { status: 400 }
      );
    }
    console.log("✅ Employee deleted from employees table");

    // Step 3: Delete auth user using the same ID
    console.log("🔐 Attempting to delete auth user with ID:", id);
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    
    if (authError) {
      console.error("❌ Auth deletion failed:", authError);
      // Employee is already deleted, so we'll return a partial success
      return NextResponse.json(
        { 
          message: "Employee deleted from database, but auth deletion failed",
          warning: authError.message 
        },
        { status: 200 }
      );
    }

    console.log("✅ Auth user deleted successfully");

    return NextResponse.json(
      { message: "Employee and auth user deleted successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Server error: " + error.message }, { status: 500 });
  }
}

export const runtime = "nodejs";