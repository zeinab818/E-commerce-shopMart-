"use server";


export async function registerAction(newAccount: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone:string;
}) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccount),
          cache: "no-store",

      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    return { status: "error", message: "Server error occurred" };
  }
}
