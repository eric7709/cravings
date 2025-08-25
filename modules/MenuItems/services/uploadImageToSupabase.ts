import { supabase } from "@/lib/supabase";

export const uploadImageToSupabase = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;
  const { data, error } = await supabase.storage
    .from("menuitemimages") 
    .upload(filePath, file);
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }
  const { data: publicUrlData } = supabase.storage
    .from("menuitemimages")
    .getPublicUrl(filePath);
  return publicUrlData?.publicUrl ?? null;
};
