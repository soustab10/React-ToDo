/***
 * @todo Redirect the user to main page if token is present.
 */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/auth";

export function no_auth_required() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);
}
