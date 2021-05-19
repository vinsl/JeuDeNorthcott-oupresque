/* no.js Northcott's game

   Jeu de Nim-Northcott

   Copyright (C) 2002-2005 Jean-Paul Davalan <jpdvl@wanadoo.fr>

   utilisation réservée aux pages des sites
   http://perso.wanadoo.fr/jean-paul.davalan/jeux/nim/northcott/
   http.//nim.site.voila.fr/

   reproduction et distribution interdites sans accord espress
   
   Version du 10 avril 2005

*/
var lang = "fr";
var ncols = 8, nligs = 8;
var npart = 0, npartg = 0;
var player = 1;
var Im = new Array();
// pref + b-blanc  ou g-gris +  b-bleu ou r-rouge
//var Isrc=new Array("cb0.png","cbb.png","cbr.png","cg0.png","cgb.png","cgr.png");
//var imgw=40;
//var Isrc=new Array("ab0.png","abb.png","abr.png","ag0.png","agb.png","agr.png");
var Isrc = new Array("eb0.png", "ebb.png", "ebr.png", "eg0.png", "egb.png", "egr.png");
var imgw = 36;

for (var i = 0; i < 6; i++) {
  Im[i] = new Image();
  Im[i].src = Isrc[i];
}

var tb = new Array(0, 1);
tb[0] = new Array(); tb[1] = new Array();

/* affichage sur la page
*/
var md = 0; // 0 ou 1

function cl(k) {     // k = 0 1 2 3 4 5 
  if (md == 0) return k;
  var a = k % 3, b = 3 - 2 * a;
  if (a == 0) return k;
  return k + b;
}

function setcolor() {
  md = 1 - md;
  document.frm.bt.style.color = (md == 0) ? "blue" : "green";
  if (lang == "fr") document.frm.bt.value = (md == 0) ? "rond" : "croix";
  else document.frm.bt.value = (md == 0) ? "blue" : "green";

  commence();
}

function wtable() {
  var i, j, s;

  document.writeln("<center>");
  document.writeln('<table id="tble" style="{border:2 solid #dd0000;background: #ffdd66;}"  cellspacing=0 cellpadding=0>');
  for (i = nligs - 1; i >= 0; i--) {
    document.writeln("<tr>");
    for (j = 0; j < ncols; j++) {
      if ((i + j) % 2 == 0) s = Im[cl(0)].src; //'cb0.png';
      else s = Im[cl(3)].src; //'cg0.png';
      document.writeln("<td><image style='{cursor:pointer;}' onclick='select(" + i + ", " + j + ")' border='0' name='t" + i + "_" + j + "' src='" + s + "' width='" + imgw + "' height='" + imgw + "' alt=''></td>");
    }
    document.writeln("</tr>");
  }
  document.writeln("</table>");

  document.writeln("</center>");
}

function wtable2() {
  var i, j, s;

  var GD = (document.frm.rd[0].checked == true);

  var stb = '<center>' +
    '<table id="tble" style="{border:1 solid #dd0000;background-color:#ffdd66}" cellspacing=0 cellpadding=0>';
  for (j = 0; j < ncols; j++) {
    stb += "<tr>";
    for (z = 0; z < nligs; z++) {
      if (GD == true) i = z;
      else i = nligs - 1 - z;
      if ((i + j) % 2 == 0) s = Im[cl(0)].src;//s='cb0.png';
      else s = Im[cl(3)].src;//'cg0.png';
      stb += "<td><image style='{cursor:pointer;}' onclick='select(" + i + ", " + j + ")' border='0' name='t" + i + "_" + j + "' src='" + s + "' width='" + imgw + "' height='" + imgw + "' alt=''></td>";
    }
    stb += "</tr>";
  }
  stb += "</table>";

  stb += "</center>";
  document.getElementById("Gme").innerHTML = stb;
}
// défaut blanc noir vert jaune orange pourpre rose violet
var col = new Array("#ffffff", "#000000", "#009911", "#f9ffaa", "#ffbb00", "#cd2d64", "#fbb3d1", "#dd00ee");
function fond2() {
  for (var i = 0; i < col.length; i++) {
    if (document.frm.cf[i].checked == true) {
      document.getElementById("tble").style.background = col[i];
      return;
    }
  }
}

function fond(s) {
  document.getElementById("tble").style.background = s;
}

var dimeff = true;
function dimefface() {

  if (dimeff == true) {
    dimeff = false;
    document.frm.dim.value = "";
  }
}
/* Efface le jeu précédent (vide l'échiquier)
*/

function jeu_efface() {
  var i, j, s;
  for (i = 0; i < nligs; i++) {
    for (j = 0; j < ncols; j++) {
      if ((i + j) % 2 == 0) s = Im[cl(0)].src;
      else s = Im[cl(3)].src;
      document.images["t" + i + "_" + j].src = s;
    }
  }
}

/* nouvelles positions pour un nouveau jeu
*/

var aubord = 0;

function commence() {
  player = 0;
  var a, b, d, i, j, v, s1, s2, sr1, sr2, s = "";
  dimeff = true;
  jeu_efface();
  fond();
  /*
    if(lang=="fr")document.frm.area.value="Lisez la règle du jeu et cliquez une case libre.\n";
    else document.frm.area.value="Read the game rules and click in a free box.\n";
  */
  var mesg;
  if (lang == "fr") mesg = "";
  else mesg = "";
  document.getElementById("MesgArea").innerHTML = mesg;
  var r = Math.floor(3 * Math.random());
  for (i = 0; i < ncols; i++) {
    if (aubord == 1) {
      d = 1 + Math.floor((nligs - 1) * Math.random());
      a = Math.floor((nligs - 1 - d) * Math.random());
      b = a + d;

    } else if (aubord == 0) {
      a = 0;
      b = 7;
    }
    tb[0][i] = a;
    tb[1][i] = b;
    s1 = 't' + a + '_' + i;
    s2 = 't' + b + '_' + i;
    sr1 = ((a + i) % 2 == 0) ? Im[cl(1)].src : Im[cl(4)].src;
    sr2 = ((b + i) % 2 == 0) ? Im[cl(2)].src : Im[cl(5)].src;
    document.images[s1].src = sr1;
    document.images[s2].src = sr2;
  }
}

/* la fonction de Grundy donne pour le sommet m<n   
   (m, n) |--> n-m-1
   Calcul de la valeur du jeu
*/
function valeurjeu() {
  var i, v = 0;
  for (i = 0; i < ncols; i++)
    v = v ^ (tb[1][i] - tb[0][i] - 1);
  return v;
}

function moveblue(c, x, y) {
  tb[0][c] = y;
  document.images["t" + x + "_" + c].src = ((x + c) % 2 == 0) ? Im[cl(0)].src : Im[cl(3)].src;
  document.images["t" + y + "_" + c].src = ((y + c) % 2 == 0) ? Im[cl(1)].src : Im[cl(4)].src;
}

function movered(c, x, y) {
  tb[1][c] = y;
  document.images["t" + x + "_" + c].src = ((x + c) % 2 == 0) ? Im[cl(0)].src : Im[cl(3)].src;
  document.images["t" + y + "_" + c].src = ((y + c) % 2 == 0) ? Im[cl(2)].src : Im[cl(5)].src;

}

function select(l, c) {
  var a, b;
  a = tb[0][c];
  b = tb[1][c];
  /* teste la validité du choix */
  
  if (player == 0) {
    if (l <= a || l >= b )
    return 0;
    moveblue(c, a, l)
    if (contact()) {
      gagne(0);
    }
    player = 1;
  }
  else {
    if (l >=b || l <= a)
    return 0;
    movered(c, b ,l)
    if (contact()) {
      gagne(1);
    }
    player = 0;
  }
}

/* affichage de fin de partie  Gagné ou Perdu */
function gagne(x) {
  var mesg;
  if (x == 0) {
    /*
        if(lang=="fr")document.frm.area.value="Félicitations. Vous avez gagné";
        else document.frm.area.value="Congratulations. You are the winner";
    */
    if (lang == "fr") mesg = "Croix a gagné";
    else mesg = "Blue win";
    document.getElementById("MesgArea").innerHTML = mesg;
    npartg++;
  } else {
    /*
        if(lang=="fr")document.frm.area.value="Vous avez perdu";
        else document.frm.area.value="You lose.";
    */
    if (lang == "fr") mesg = "Rond a gagné";
    else mesg = "Red win";
    document.getElementById("MesgArea").innerHTML = mesg;
  }
  npart++;
  document.frm.parties.value = npart;
  document.frm.partiesg.value = npartg;
}

/* Teste la possibilité de jouer
   joueur : x=0  
   ordi   : x=1  
 */
function jeupossible(x) {
  var i, p = false;
  if (x == 0)
    for (i = 0; p == false && i < ncols; i++)
      p = (tb[1][i] > 1);
  else
    for (i = 0; p == false && i < ncols; i++)
      p = (tb[0][i] < nligs - 1)
  return p;
}

function contact() {
  var i, p = true;
  for (i = 0; p == true && i < ncols; i++)
    p = (tb[1][i] - tb[0][i] == 1);
  return p;
}



