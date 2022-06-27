/***
 * @todo Redirect the user to login page if token is not present.
 */
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/router";

export function auth_required() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token === undefined || token === null) {
      router.push("/login");
    }
  }, [token]);
}
