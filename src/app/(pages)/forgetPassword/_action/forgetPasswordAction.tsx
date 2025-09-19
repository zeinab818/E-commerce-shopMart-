"use server";

export async function forgetPasswordAction(forgetPassowrd: {

  email: string;

}) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgetPassowrd),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
