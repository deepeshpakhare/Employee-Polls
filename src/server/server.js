import { nanoid } from "@reduxjs/toolkit"


export const users = [
    {
        id: nanoid(),
        username: "james",
        password: "james123",
        avatar: "james.jpg",
        selected: false,
    },
    {
        id: nanoid(),
        username: "mohammed",
        password: "prophet123",
        avatar: "mohammed.jpg",
        selected: false,
    },
    {
        id: nanoid(),
        username: "natali",
        password: "natali123",
        avatar: "natali.jpg",
        selected: false,

    },
    {
        id: nanoid(),
        username: "prabhjyot",
        password:"prabhjyot123",
        avatar:"prabhjyot.jpg",
        selected: false,
    },
    {
        id: nanoid(),
        username:"lolita",
        password:"lolita123",
        avatar:"lolita.jpg",
        selected: false,
    },

]