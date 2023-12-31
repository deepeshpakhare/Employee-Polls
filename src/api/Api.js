import { users } from "../database/Database";
import { questions } from "../database/Database";

export function getAllUsers() {
    return new Promise((res, rej) =>
        setTimeout(() => {
            return res(users);
        }, 2000))
} 

export function getAllQuestions() {
    return new Promise((res, rej) =>
        setTimeout(() => {
            return res(questions);
        }, 1500))
}