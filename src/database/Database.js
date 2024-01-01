import { nanoid } from "@reduxjs/toolkit"


export const users = [
    {
        id: nanoid(),
        username: "james",
        password: "james123",
        avatar: "james.jpg",
        selected: false,
        loggedIn: false,
    },
    {
        id: nanoid(),
        username: "mohammed",
        password: "prophet123",
        avatar: "mohammed.jpg",
        selected: false,
        loggedIn: false,
    },
    {
        id: nanoid(),
        username: "natali",
        password: "natali123",
        avatar: "natali.jpg",
        selected: false,
        loggedIn: false,

    },
    {
        id: nanoid(),
        username: "prabhjyot",
        password:"prabhjyot123",
        avatar:"prabhjyot.jpg",
        selected: false,
        loggedIn: false,
    },
    {
        id: nanoid(),
        username:"lolita",
        password:"lolita123",
        avatar:"lolita.jpg",
        selected: false,
        loggedIn: false,
    },

]

export const QUESTION_TEXT = "Would You Rather"
export const questions = [
    {
        id:nanoid(),
        askedBy:"mohammed",
        text: QUESTION_TEXT,
        firstOption:"Use Redux for state management",
        secondOption:"Use Zustand for state management",
        answeredBy:[
            {
                name:"prabhjyot",
                answer:"firstOption"
            },
            {
                name:"lolita",
                answer:"secondOption"
            }
        ],
        dateCreated:new Date("December 25, 2023 05:15:00").toString()
    },
    {
        id:nanoid(),
        askedBy:"mohammed",
        text: QUESTION_TEXT,
        firstOption:"Use Node runtime environment",
        secondOption:"Use Bun runtime environment",
        answeredBy:[
            {
                name:"prabhjyot",
                answer:"firstOption"
            },
            {
                name:"lolita",
                answer:"secondOption"
            },
            {
                name:"james",
                answer:"secondOption"
            },
        ],
        dateCreated:new Date("December 20, 2023 09:15:00").toString()
    },
    {
        id:nanoid(),
        askedBy:"mohammed",
        text: QUESTION_TEXT,
        firstOption:"Use MaterialUI library",
        secondOption:"Use RdixUI library",
        answeredBy:[
            {
                name:"natali",
                answer:"firstOption"
            },
            {
                name:"lolita",
                answer:"secondOption"
            },
            {
                name:"james",
                answer:"secondOption"
            },
        ],
        dateCreated:new Date("December 12, 2023 15:15:00").toString()
    },
    {
        id:nanoid(),
        askedBy:"james",
        text: QUESTION_TEXT,
        firstOption:"Choose monolithic architecture",
        secondOption:"Choose microservices architecture",
        answeredBy:[
            {
                name:"mohammed",
                answer:"firstOption"
            },
            {
                name:"lolita",
                answer:"secondOption"
            },
            {
                name:"natali",
                answer:"secondOption"
            },
        ],
        dateCreated:new Date("December 31, 2023 08:15:00").toString()
    }
]