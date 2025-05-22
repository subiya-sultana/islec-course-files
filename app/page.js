import { redirect } from "next/navigation";

export default function Home() {
  // Redirects users to the login page
  redirect("/login"); 
}
