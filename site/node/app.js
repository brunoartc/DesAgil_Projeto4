var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://infoinsper.firebaseio.com"
});

obagulho = ""


function j2csv(snap){
	exportt = ""
	exportt += ('tempo' + "," + 'email' + "," + 'curso' + "," + 'semestre' + "," + 'assunto' + "," + 'observacao' + "," + 'requerimento' + "," + 'funcionario' + "," + 'tipo' + "\n")
	Object.keys(snap).forEach(function(value){
		exportt += (snap[value]['tempo'] + "," + snap[value]['usuario'] + "," + snap[value]['semestre'] + "," + snap[value]['curso'] + "," + snap[value]['assunto'] + "," + snap[value]['obs'] + "," + snap[value]['requerimento'] + "," + snap[value]['funcionario'] + "," + snap[value]['tipo'] + "\n")
	})
	return exportt

}



function formatar(snap){
	obagulho = ""

	Object.keys(snap).forEach(function(value){
		if (snap[value]['tempo']){
			obagulho+=`
				<div class="line">
					<div class="card">
						<div class="div_form">
							<form class="form_card" action="/aluno" method="post">
								Data e Hora: <input class="input_text" type="text" name="tempo" value="`+ snap[value]['tempo'] +`"><br>
								Email: <input class="input_text" type="text" name="Email" value="`+ snap[value]['usuario'] +`"><br>
								Semestre: <input class="input_text" type="text" name="Semestre" value="`+ snap[value]['curso'] +`"><br>
                Curso: <input class="input_text" type="text" name="Curso" value="`+ snap[value]['semestre'] +`"><br>
								Assunto: <input class="input_text" type="text" name="assunt" value="`+ snap[value]['motivo'] +`"><br>
								<input type="submit" value="Atender">

							</form>
						</div>
					</div>
				</div>
				`
		}
	});

}



app.get('/exportar', function (req, res) {
	admin.database().ref().child("old").once('value', function(snapshot) {
		if(snapshot.val()){
			res.set({"Content-Disposition":"attachment; filename=\"export.csv\""});
			res.send(j2csv(snapshot.val()))
		}
	});
})

var coisadedentro = "<input>"
app.post('/', function (req, res) {
	var fdata = {}
	fdata.tempo = req.body.tempo
	fdata.usuario = req.body.usr
	fdata.assunto = req.body.assunto
	fdata.semestre = req.body.semestre
	fdata.curso = req.body.curso
	fdata.obs = req.body.obs
	fdata.funcionario = "Sergio"
	if (req.body.requerimento!=undefined){
		fdata.requerimento = req.body.requerimento
	} else {
		fdata.requerimento = "No"
	}
	fdata.tipo = req.body.tipo

	admin.database().ref('/old').child(fdata.tempo).set(fdata)
	admin.database().ref('/new').child(fdata.tempo).set("{}")




	res.send(`
	<!DOCTYPE html>
	<html lang="pt">
		<style>

		</style>
		<head>
			<link rel="stylesheet" type="text/css" href="/stylesheet.css">
			<meta charset="utf-8">
		</head>
		<script>
			function loadXMLDoc() {
			  var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("demo").innerHTML =
				  this.responseText;
				}
			  };
			  xhttp.open("GET", "/teste", true);
			  xhttp.send();
			}
		</script>
		<script>
			! function foo(){
				setTimeout(foo, 1000);
				loadXMLDoc()
			}();
		</script>

		<body>
			<div class="header">
				<button onclick="document.getElementById('id01').style.display='block'"
				id="logout">Logout</button>
				<img src="/logo_multiinsper_colorido.png">
				<button onclick="window.location.href = '/exportar'"
				id="logout">Exportar</button>
			</div>
			<div id="demo">
			</div>

		</body>
	</html>
	`)

});
app.get('/', function (req, res) {
  res.send(`
	<!DOCTYPE html>
	<html lang="pt">
		<style>

		</style>
		<head>
			<link rel="stylesheet" type="text/css" href="/stylesheet.css">
			<meta charset="utf-8">
		</head>
		<script>
			function loadXMLDoc() {
			  var xhttp = new XMLHttpRequest();
			  xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				  document.getElementById("demo").innerHTML =
				  this.responseText;
				}
			  };
			  xhttp.open("GET", "/teste", true);
			  xhttp.send();
			}
		</script>
		<script>
			! function foo(){
				setTimeout(foo, 1000);
				loadXMLDoc()
			}();
		</script>

		<body>
			<div class="header">
				<button onclick="document.getElementById('id01').style.display='block'"
				id="logout">Logout</button>
				<button onclick="window.location.href = '/exportar'"
				id="logout">Exportar</button>
				<img src="/logo_multiinsper_colorido.png">
			</div>
			<div id="demo">
			</div>

		</body>
	</html>
	`)
});

app.use('/', express.static('static'));

app.post('/aluno', function (req, res) {
	console.log(req.body.tempo)
	admin.database().ref("/new").child(req.body.tempo).once('value', function(snapshot) {
		if(snapshot.val()){
			res.send(`
				<!DOCTYPE html>
				<html>
					<head>
						<link rel="stylesheet" type="text/css" href="/stylesheet.css">
						<meta charset="utf-8">
					</head>
					<body>

					<h2>form</h2>

					<form action="/" method="post">
					  Data e Hora:<br>
					  <input type="text" name="tempo" value="`+snapshot.val()['tempo']+`" readonly>
					  <br>
					  Email:<br>
					  <input type="text" name="usr" value="`+snapshot.val()['usuario']+`" readonly>
					  <br><br>
					  Assunto:<br>
					  <input type="text" name="assunto" value="`+snapshot.val()['motivo']+`" readonly>
					  <br><br>
					  Curso:<br>
					  <input type="text" name="semestre" value="`+snapshot.val()['semestre']+`" readonly>
					  <br><br>
					  Semestre:<br>
					  <input type="text" name="curso" value="`+snapshot.val()['curso']+`" readonly>
					  <br><br>
					  Requerimento: <input class="input_text" type="checkbox" name="requerimento" value="yes">
					  Aluno: <input class="input_text" type="radio" name="tipo" value="aluno" checked>
					  Alumni: <input class="input_text" type="radio" name="tipo" value="alumini"></br>
					  <br><br>
					  Observacao:<br>
					  <input type="text" name="obs" value="">
					  <br><br>
					  <input type="submit" value="Submit">
					</form>

					</body>
				</html>
			`)
		}
	});
});

app.get('/teste', function (req, res) {
	admin.database().ref().child("new").once('value', function(snapshot) {
		if(snapshot.val()){
			formatar(snapshot.val())
		}
	});
	res.send(obagulho)
});

app.listen(process.env.PORT || 4000, function () {
  console.log('Example app listening on port 4001!');
});
