import { users } from "../database/Database";

export function getAllUsers() {
    return new Promise((res, rej) =>
        setTimeout(() => {
            return res(users);
        }, 2000))
} 