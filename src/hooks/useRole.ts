import { useSession } from "next-auth/react";

/**
 * useRole hook
 * @returns {string | undefined} role
 * @description useRole hook to get the user role
 * @example
 *   const role = useRole()
 */
export const useRole = () => {
    const session = useSession();

    return session.data?.user?.role;
}