package com.br.insper.infoinsper;

public class Form {

    public String nome;
    public String usuario;
    public String curso;
    public String semestre;
    public String motivo;
    public String tempo;

    public Form(String nome, String email, String curso, String semestre, String motivo, String tempo) {
        this.nome = nome;
        this.usuario = email;
        this.curso = curso;
        this.semestre = semestre;
        this.motivo = motivo;
        this.tempo = tempo;
    }
}
