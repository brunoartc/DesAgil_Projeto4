package com.br.insper.infoinsper;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.NavigationView;
import android.support.design.widget.Snackbar;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    private DatabaseReference mDatabase;
    private EditText nome;
    private EditText email;
    Spinner curso;
    Spinner semestre;
    Spinner motivo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mDatabase = FirebaseDatabase.getInstance().getReference();
        nome = (EditText) findViewById(R.id.editText);
        email = (EditText) findViewById(R.id.editText);
        curso = (Spinner) findViewById(R.id.spinner_curso);
        semestre = (Spinner) findViewById(R.id.spinner_semestre);
        motivo = (Spinner) findViewById(R.id.spinner_assunto);
        String[] cursoContent = new String[] { "Selecione",
                "Administração", "Economia","Engenharia da Computação","Engenharia Mecânica","Engenharia Mecatrônica",
                "Dupla titulação","APF","Certificates","Doutorado","LLM","MBA","Mestrado"
        };
        String[] semestreContent = new String[] { "Selecione",
                "1º semestre","2º semestre","3º semestre","4º semestre","5º semestre",
                "6º semestre","7º semestre","8º semestre","9º semestre","10º semestre",
        };
        String[] motivoContent = new String[] { "Selecione",
                "Acadêmico","Atendimento a familiares","Carreiras",
                "Intercâmbio","Organizações estudantis","Orientação de estudos",
                "Programa de bolsas","Regime disciplinar","Socioemocional","Reclamações",
                "Outros"
        };

        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, cursoContent);
        
        ArrayAdapter<String> adapter2 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, semestreContent);

        ArrayAdapter<String> adapter3 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, motivoContent);

        adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        adapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        curso.setAdapter(adapter2);
        semestre.setAdapter(adapter1);
        motivo.setAdapter(adapter3);



        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                writeNewStudent(nome.getText().toString(), email.getText().toString()+"@alinsper.edu.br", curso.getSelectedItem().toString(), semestre.getSelectedItem().toString(), motivo.getSelectedItem().toString());
                Snackbar.make(view, "Enviado", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }


    private void writeNewStudent(String nome, String email, String curso, String semestre, String motivo) {
        Form user = new Form(nome, email, curso, semestre, motivo, Calendar.getInstance().getTime().toString());
        mDatabase.child("new/"+Calendar.getInstance().getTime().toString()).setValue(user);

    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
        } else if (id == R.id.nav_gallery) {

        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
