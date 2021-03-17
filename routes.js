const {Router}=require('express')
const app=Router()
const {GithubAuthenticator}=require("./authenticators")
const authetincateGithub=GithubAuthenticator('X-Hub-Signature-256' , '11');
async function handler(req, res)  {
    if (authetincateGithub(req))
        console.log("This request is indeed from github");
    else {
        console.log("Not from github")
    }
    res.json(true)
}
app.get("/webhook",handler );
app.post("/webhook",handler );
module.exports={router:app}