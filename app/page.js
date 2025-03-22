import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // Redirects users to the login page
}
