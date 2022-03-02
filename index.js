const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "RAC - Sistema de Ar Condicionado",
    style: "style/home.css",
  });
});

const user = "murilosbagodi@hotmail.com";
const pass = "$$%%123+-/money";

app.post("/env/renata", (req, res) => {
  const transporter1 = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    auth: { user: user, pass: pass },
  });

  var email = req.body.mailR;
  var assunto = req.body.assuntoR;
  var textEmail = req.body.txtAreaR;
  async function envEmail1() {
    transporter1
      .sendMail({
        from: email,
        to: "rgs.rac@gmail.com",
        replyTo: "jccs.rac@gmail.com",
        subject: assunto,
        text: textEmail,
      })
      .then(() => {
        res.send("Email enviado com sucesso");
      })
      .catch((error) => {
        res.send(
          "Erro, Tente novamente mais tarde ou troque o navegador utilizado (Recomenda-se o Google-Chrome)"
        );
      });
  }
  envEmail1().catch(console.error);
});

app.post("/env/joao", (req, res) => {
  async function envEmail() {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: "587",
      auth: { user: user, pass: pass },
    });

    var email = req.body.txtEmailJ;
    var assunto = req.body.txtAssuntoJ;
    var textEmail = req.body.txtAreaJoao;

    transporter
      .sendMail({
        from: email,
        to: "jccs.rac@gmail.com",
        replyTo: "rgs.rac@gmail.com",
        subject: assunto,
        text: textEmail,
      })
      .then(() => {
        res.send("Email enviado com sucesso");
      })
      .catch(() => {
        console.log(error);
      });
  }

  envEmail().catch(console.error);
});

app.listen(port, () => {
  console.log(`App Rodando em: ${port}`);
});
