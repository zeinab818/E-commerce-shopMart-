"use server";

export async function resetCodeAction(resetCode: {

  resetCode:string

}) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetCode),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
