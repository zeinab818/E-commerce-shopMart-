"use server";

export async function resetPasswordAction(resetPassword: {
  email: string;
  newPassword: string;
}) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetPassword),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
