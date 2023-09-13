import express from "express"           // ESmodules -> import y export
// const express = require("express")   // commonJS -> en vez de con import nos lo traemos con require

const diaryRouter = express.Router()

diaryRouter.get("/", (_req,res)=>{
    res.send("Fetching data")
})

diaryRouter.post("/", (_req, res)=>{
    res.send("posting data...")
})
export default diaryRouter