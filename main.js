
// 引数:
// n 選手得点行番号(1-22)
// i 選手得点列番号(r1-r6)
// j 行区別用番号（1or2）
// k 総合点用番号(1-11)

//document.ArcheryRec[].value
//=
//var formID = "ArcheryRec";
//document.forms[formID].elements[].value

//計算処理------------------------------

// 選手の得点の加算処理を行う
function calc() {

  for(var n = 1; n <= 22; n++) {
    var sco = 0;
    for(var i = 1; i <= 6; i++) {
      check(n, i);
      erase0(n, i);
      sco += (document.ArcheryRec["r_" + n + "_" + i].value) - 0;
      //console.log(document.ArcheryRec["r_" + n + "_" + i].value);
    }
    document.ArcheryRec["subtotal_" + n].value = sco;
    if(document.ArcheryRec["subtotal_" + n].value <= 0 ){
      document.ArcheryRec["subtotal_" + n].value = "";
    }
  }
  tcalc();
  Scalc();
  red();
  asave();
}


//選手総合点を計算
function tcalc(){

  var n = 0;
  for(var k = 1; k <= 11; k++){
    var tsco = 0;
    //50m(上側)
    n++;
    tsco += (document.ArcheryRec["subtotal_" + n].value) - 0;
    //30m(下側)
    n++;
    tsco += (document.ArcheryRec["subtotal_" + n].value) - 0;
    document.ArcheryRec["total_" + k].value = tsco;
    if(document.ArcheryRec["total_" + k].value <= 0 ){
      document.ArcheryRec["total_" + k].value = "";
    }
  }

}


//学校のラウンド毎の点数計算
function Scalc(){

  for(var j = 1; j <= 2; j++) {
    for(var i = 1; i <= 6; i++) {
      var ssco = 0;
      //50mの得点計算(奇数行)
      if(j <= 1){
        for(var n = 1; n <= 22; n+=2) {
          ssco += (document.ArcheryRec["r_" + n + "_" + i].value) - 0;
          document.ArcheryRec["sr_1_" + i].value = ssco;
        }
      }
      //30mの得点計算（偶数行）
      else if(j == 2){
        for(var n = 2; n <= 22; n+=2) {
          ssco += (document.ArcheryRec["r_" + n + "_" + i].value) - 0;
          document.ArcheryRec["sr_2_" + i].value = ssco;
        }
      }
      //0の場合は空白にする
      if(document.ArcheryRec["sr_"+ j + "_" + i].value <= 0 ){
        document.ArcheryRec["sr_"+ j + "_" + i].value = "";
      }
    }
  }
  Stcalc();
}


//学校総合点の集計
function Stcalc(){

  var stsco = 0;
  for(var j = 1; j <= 2; j++) {
    var sutsco = 0;
    for(var i = 1; i <= 6; i++) {
      sutsco += (document.ArcheryRec["sr_" + j + "_" + i].value) - 0;
      //同じ点数の列挙がなくなるが、学校小計がおかしくなる。
      // //ラウンド点数が０の場合処理中断しループしなおす
      // if(document.ArcheryRec["sr_" + j + "_" + i].value == 0){
      //   sutsco = 0;
      //   document.ArcheryRec["srt_"+ j + "_" + i].value = "";
      //   continue;
      // }
      //結果を入力
      document.ArcheryRec["srt_" + j + "_" + i].value = sutsco;
      document.ArcheryRec["ssubtotal_" + j].value = sutsco;
      //0の場合は空白にする
      if(document.ArcheryRec["srt_"+ j + "_" + i].value <= 0 ){
        document.ArcheryRec["srt_"+ j + "_" + i].value = "";
      }
    }
    //総合点計算及び入力
    stsco += (document.ArcheryRec["ssubtotal_" + j].value) - 0;
    document.ArcheryRec["stotal"].value = stsco;
    if(document.ArcheryRec["stotal"].value == 0){
      document.ArcheryRec["stotal"].value = "";
    }
  }

}


//見た目の処理--------------------------

//赤点表示
function red(){

  for(var n = 1; n <= 22; n++) {
    //50m
    if(document.ArcheryRec["range_" + n].value == 50){
      //45点以上なら赤字、45点より下なら黒字
      for(var i = 1; i <= 6; i++) {
        if(document.ArcheryRec["r_" + n + "_" + i].value >= 45){
          document.ArcheryRec["r_" + n + "_" + i].style.color = "red";
        }
        else if(document.ArcheryRec["r_" + n + "_" + i].value < 45){
          document.ArcheryRec["r_" + n + "_" + i].style.color = "black";
        }
      }
    }
    //30m
    else if(document.ArcheryRec["range_" + n].value == 30){
      //55点以上なら赤字、55点より下なら黒字
      for(var i = 1; i <= 6; i++) {
        if(document.ArcheryRec["r_" + n + "_" + i].value >= 55){
          document.ArcheryRec["r_" + n + "_" + i].style.color = "red";
        }
        else if(document.ArcheryRec["r_" + n + "_" + i].value < 55){
          document.ArcheryRec["r_" + n + "_" + i].style.color = "black";
        }
      }
    }
    //小計赤点表示
    //30m330点以上赤点表示
    if (n % 2 == 0) {
      if(document.ArcheryRec["subtotal_" + n].value >= 330){
        document.ArcheryRec["subtotal_" + n].style.color = "red";
      }
      else if(document.ArcheryRec["subtotal_" + n].value < 330){
        document.ArcheryRec["subtotal_" + n].style.color = "black";
      }
    }
    //50m270点以上赤点表示
    else {
      if(document.ArcheryRec["subtotal_" + n].value >= 270){
        document.ArcheryRec["subtotal_" + n].style.color = "red";
      }
      else if(document.ArcheryRec["subtotal_" + n].value < 270){
        document.ArcheryRec["subtotal_" + n].style.color = "black";
      }
    }
  }
  //総合点赤点表示
  for(var k = 1; k <= 11; k++){
    if(document.ArcheryRec["total_" + k].value >= 600 ){
      document.ArcheryRec["total_" + k].style.color = "red";
    }
    else if(document.ArcheryRec["total_" + k].value < 600){
      document.ArcheryRec["total_" + k].style.color = "black";
    }
  }

}


//赤文字を黒文字にする
function RestRed(){

  //ラウンド点数
  for(var n = 1; n <= 22; n++) {
    for(var i = 1; i <= 6; i++) {
      if(document.ArcheryRec["r_" + n + "_" + i].style.color = "red"){
        document.ArcheryRec["r_" + n + "_" + i].style.color = "black";
      }
    }
  }
  //総合点
  for(var k = 1; k <= 11; k++){
    if(document.ArcheryRec["total_" + k].style.color = "red"){
      document.ArcheryRec["total_" + k].style.color = "black";
    }
  }

}


// 入力された値が61を超えている場合は背景色を変更する
function check(n, i){

  if(document.ArcheryRec["r_" + n + "_" + i].value >= 61){
    document.ArcheryRec["r_" + n + "_" + i].style.backgroundColor = "yellow";
  }
  else{
    document.ArcheryRec["r_" + n + "_" + i].style.backgroundColor = "";
  }

}


//点数の前に0がついていると消す
function erase0(n, i){

  var p = 0;
  p = parseInt(
    document.ArcheryRec["r_" + n + "_" + i].value
  );
  if (Number.isNaN(p)) {
    p = "";
  }
  document.ArcheryRec["r_" + n + "_" + i].value = p;

}

//--------------------------------------------------------
//学年部分Maxlength入力で次の選手の名前に移動
function nextplayer(str) {
  if (str.value.length >= str.maxLength) {
    for (var i = 0, elm = str.form.elements; i < elm.length; i++) {
      if (elm[i] == str) {
        (elm[i + 18] || elm[0]).focus();
        break;
      }
    }
  }
  return (str);
}

//Maxlength入力で次の選手の得点に移動
function nextfeild(str) {
  if (str.value.length >= str.maxLength) {
    for (var i = 0, elm = str.form.elements; i < elm.length; i++) {
      if (elm[i] == str) {
        (elm[i + 19] || elm[0]).focus();
        break;
      }
    }
  }
  return (str);
}

//MaxLength入力で次のラウンドの最初の得点に移動
function nextr(str) {
  if (str.value.length >= str.maxLength) {
    for (var i = 0, elm = str.form.elements; i < elm.length; i++) {
      if (elm[i] == str) {
        (elm[i - 189] || elm[0]).focus();
        break;
      }
    }
  }
  return (str);
}

//MaxLength入力で30m最初の得点に移動
function nextm(str) {
  if (str.value.length >= str.maxLength) {
    for (var i = 0, elm = str.form.elements; i < elm.length; i++) {
      if (elm[i] == str) {
        (elm[i - 186] || elm[0]).focus();
        break;
      }
    }
  }
  return (str);
}

//----------------------------------------------------------------
//日付表示
function today(){
var today = new Date();
var Today = (today.getFullYear() + "/" +  today.getMonth() + 1 + "/"+ today.getDate());
document.ArcheryRec["name_13"].value = Today;
}
