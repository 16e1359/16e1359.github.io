
//localStorage：永続的にデータをローカル環境に保存
//sessionStorage：一時的に保存、ウィンドウを閉じると消える。複数開くと別々

// p 選手管理用(1~13)
// h 配列管理用

//------------------------------------------------------------------
//保存
function save(){
  var result = window.confirm("既に保存されている内容は上書きされます、よろしいでしょうか。")
  if(result){
    scoredate = [];
    namedate = [];
    gradedate = [];
    for(var n = 1; n <= 22; n++) {
      for(var i = 1; i <= 6; i++) {
        scod = (document.ArcheryRec["r_" + n + "_" + i].value);
        scoredate.push(scod);
      }
    }
    for(var p = 1; p <= 13; p++) {
      named = (document.ArcheryRec["name_" + p].value);
      graded= (document.ArcheryRec["grade_" + p].value);
      namedate.push(named);
      gradedate.push(graded);
    }
    const memodate = document.getElementById("memo").value;
    window.localStorage.setItem("ArcheryS_key" , JSON.stringify(scoredate));
    window.localStorage.setItem("ArcheryN_key" , JSON.stringify(namedate));
    window.localStorage.setItem("ArcheryG_key" , JSON.stringify(gradedate));
    window.localStorage.setItem("ArcheryM_key" , JSON.stringify(memodate));
    alert("保存しました。");
  }
}

//読み込み
function load(){
  var result = window.confirm("現在の記録は上書きされます、よろしいでしょうか。")
  if(result){
    var scoredate = JSON.parse(window.localStorage.getItem("ArcheryS_key"));
    var namedate = JSON.parse(window.localStorage.getItem("ArcheryN_key"));
    var gradedate = JSON.parse(window.localStorage.getItem("ArcheryG_key"));
    document.getElementById("memo").value = JSON.parse(window.localStorage.getItem("ArcheryM_key"));
    //データが空の場合の処理
    if(!scoredate){
      if(!namedate){
        if(!gradedate){
          alert("データが保存されていません。");
          exit;
        }
      }
    }
    //点数入力
    var h = 0;
    for(var n = 1; n <= 22; n++) {
      if (!scoredate){
        break;
      }
      for(var i = 1; i <= 6; i++) {
        (document.ArcheryRec["r_" + n + "_" + i].value) = scoredate[h];
        h++;
      }
    }
    //選手の名前と学年の入力
    var h = 0;
    for(var p = 1; p <= 13; p++) {
      if (!namedate){
        break;
      }
      (document.ArcheryRec["name_" + p].value) = namedate[h];
      (document.ArcheryRec["grade_" + p].value) = gradedate[h];
      h++;
    }
    calc();
    Scalc();
    alert("反映します。");
  }
}

//削除
function del(){
  var result = window.confirm("デバイスに保存している記録を削除します、よろしいでしょうか。")
  if(result){
    scoredate = [];
    namedate = [];
    gradedate = [];
    window.localStorage.removeItem("ArcheryS_key");
    window.localStorage.removeItem("ArcheryN_key");
    window.localStorage.removeItem("ArcheryG_key");
    window.localStorage.removeItem("ArcheryM_key");
    alert("削除しました。");
  }
}

//自動保存
function asave(){
  scoredate = [];
  namedate = [];
  gradedate = [];
  for(var n = 1; n <= 22; n++) {
    for(var i = 1; i <= 6; i++) {
      scod = (document.ArcheryRec["r_" + n + "_" + i].value);
      scoredate.push(scod);
    }
  }
  for(var p = 1; p <= 13; p++) {
    named = (document.ArcheryRec["name_" + p].value);
    graded = (document.ArcheryRec["grade_" + p].value);
    namedate.push(named);
    gradedate.push(graded);
  }
  const memodate = document.getElementById("memo").value;
  window.localStorage.setItem("AutoArcheryS_key" , JSON.stringify(scoredate));
  window.localStorage.setItem("AutoArcheryN_key" , JSON.stringify(namedate));
  window.localStorage.setItem("AutoArcheryG_key" , JSON.stringify(gradedate));
  window.localStorage.setItem("AutoArcheryM_key" , JSON.stringify(memodate));
}

//自動保存読み込み
function asload(){
  var result = window.confirm("入力可能箇所のいずれかが変更された時点で保存しています。　　　　　　　記録が上書きされますがよろしいでしょうか。")
  if(result){
    var scoredate = JSON.parse(window.localStorage.getItem("AutoArcheryS_key"));
    var namedate = JSON.parse(window.localStorage.getItem("AutoArcheryN_key"));
    var gradedate = JSON.parse(window.localStorage.getItem("AutoArcheryG_key"));
    document.getElementById("memo").value = JSON.parse(window.localStorage.getItem("AutoArcheryM_key"));
    //データが空の場合の処理
    if(!scoredate){
      if(!namedate){
        if(!gradedate){
          alert("データが保存されていません。");
          exit;
        }
      }
    }
    //点数入力
    var h = 0;
    for(var n = 1; n <= 22; n++) {
      if (!scoredate){
        break;
      }
      for(var i = 1; i <= 6; i++) {
        (document.ArcheryRec["r_" + n + "_" + i].value) = scoredate[h];
        h++;
      }
    }
    //選手の名前と学年の入力
    var h = 0;
    for(var p = 1; p <= 13; p++) {
      if (!namedate){
        break;
      }
      (document.ArcheryRec["name_" + p].value) = namedate[h];
      (document.ArcheryRec["grade_" + p].value) = gradedate[h];
      h++;
    }
    calc();
    Scalc();
    alert("反映します。");
  }
}
