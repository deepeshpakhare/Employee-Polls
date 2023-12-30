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
        answerByJames:{
            answered:false,
            answer:"none",
        },
        answerByNatali:{
            answered:false,
            answer:"none",
        },
        answerByPrabhjyot:{
            answered:true,
            answer:"firstOption",
        },
        answerByLolita:{
            answered:true,
            answer:"secondOption",
        },
        created:{
            time:"3:15 PM",
            date:"12/29/2023",
        }
    },
    {
        id:nanoid(),
        askedBy:"mohammed",
        text: QUESTION_TEXT,
        firstOption:"Use Node runtime environment",
        secondOption:"Use Bun runtime environment",
        answerByJames:{
            answered:true,
            answer:"secondOption",
        },
        answerByNatali:{
            answered:false,
            answer:"none",
        },
        answerByPrabhjyot:{
            answered:true,
            answer:"firstOption",
        },
        answerByLolita:{
            answered:true,
            answer:"secondOption",
        },
        created:{
            time:"2:15 PM",
            date:"12/25/2023",
        }
    },
    {
        id:nanoid(),
        askedBy:"mohammed",
        text: QUESTION_TEXT,
        firstOption:"Use MaterialUI library",
        secondOption:"Use RdixUI library",
        answerByJames:{
            answered:false,
            answer:"none",
        },
        answerByNatali:{
            answered:true,
            answer:"firstOption",
        },
        answerByPrabhjyot:{
            answered:true,
            answer:"firstOption",
        },
        answerByLolita:{
            answered:true,
            answer:"secondOption",
        },
        created:{
            time:"4:15 PM",
            date:"12/1/2023",
        }
    },
    {
        id:nanoid(),
        askedBy:"james",
        text: QUESTION_TEXT,
        firstOption:"Choose monolithic architecture",
        secondOption:"Choose microservices architecture",
        answerByJames:{
            answered:false,
            answer:"none",
        },
        answerByNatali:{
            answered:false,
            answer:"none",
        },
        answerByPrabhjyot:{
            answered:true,
            answer:"firstOption",
        },
        answerByLolita:{
            answered:true,
            answer:"secondOption",
        },
        created:{
            time:"9:15 AM",
            date:"12/5/2023",
        }
    }
]