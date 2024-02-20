import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
import { empresas } from "./public/enterprises.js";

const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "RAC - Sistema de Ar Condicionado",
    style: "style/home.css",
    empresas: await empresas,
    msgEnvio: false,
  });
});

app.post("/env/renata", async (req, res) => {
  const transporter1 = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    auth: { user: process.env.SEND_EMAIL, pass: process.env.SEND_PASS },
  });

  var email = req.body.mailR;
  var assunto = req.body.assuntoR;
  var textEmail = req.body.txtAreaR;
  async function envEmail1() {
    transporter1
      .sendMail({
        from: process.env.SEND_EMAIL,
        to: "rgs.rac@gmail.com",
        replyTo: "jccs.rac@gmail.com",
        subject: assunto + " - Destino do email: Site!!!",
        text: `Email enviado por:  ${email} <br /> ${textEmail}`,
      })
      .then(async () => {
        res.render("index", {
          title: "RAC - Sistema de Ar Condicionado",
          style: "style/home.css",
          empresas: await empresas,
          msgEnvio: true,
        });
      })
      .catch(async (error) => {
        console.log(error);
        res.render("index", {
          title: "RAC - Sistema de Ar Condicionado",
          style: "style/home.css",
          empresas: await empresas,
          msgEnvio: "erro",
        });
      });
  }
  await envEmail1();
});

app.post("/env/joao", (req, res) => {
  async function envEmail() {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: "587",
      auth: { user: process.env.SEND_EMAIL, pass: process.env.SEND_PASS },
    });

    var email = req.body.txtEmailJ;
    var assunto = req.body.txtAssuntoJ;
    var textEmail = req.body.txtAreaJoao;

    transporter
      .sendMail({
        from: process.env.SEND_EMAIL,
        to: "jccs.rac@gmail.com",
        replyTo: "rgs.rac@gmail.com",
        subject: assunto + " - Destino do email: Site!!!",
        text: `Email enviado por:  ${email} <br /> ${textEmail}`,
      })
      .then(async () => {
        res.render("index", {
          title: "RAC - Sistema de Ar Condicionado",
          style: "style/home.css",
          empresas: await empresas,
          msgEnvio: true,
        });
      })
      .catch(async () => {
        res.render("index", {
          title: "RAC - Sistema de Ar Condicionado",
          style: "style/home.css",
          empresas: await empresas,
          msgEnvio: "erro",
        });
        console.log(error);
      });
  }

  envEmail().catch(console.error);
});

app.listen(port, () => {
  console.log(`App Rodando em: ${port}`);
});
