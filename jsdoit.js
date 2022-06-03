$(document).ready(function(){
    var calObj = $('#calender');    
    execute(calObj);
});

function execute(calObj){
    // 今日の日付データ取得
    var myDate = new Date();
    // 曜日テーブル定義
    var myWeekTbl = ["日","月","火","水","木","金","土"];
    // 月テーブル定義
    var myMonthTbl = [31,28,31,30,31,30,31,31,30,31,30,31];
    // 年を取得
    var myYear = myDate.getFullYear();
    // うるう年だったら...
    if (((myYear % 4) === 0 && (myYear % 100) !== 0) || (myYear % 400) === 0){
        // ２月を２９日とする
        myMonthTbl[1] = 29;
    }

    // 月を取得(0月～11月)
    var myMonth = myDate.getMonth();
    // 今日の'日'を退避
    var myToday = myDate.getDate();
    // 日付を'１日'に変えて、
    myDate.setDate(1);
    // '１日'の曜日を取得(0～6)
    var myWeek = myDate.getDay();
    // カレンダーの行数
    var myTblLine = Math.ceil((myWeek + myMonthTbl[myMonth]) / 7);
    // 表のセル数分定義
    var myTable = new Array(7 * myTblLine);

    for(i = 0; i < 7 * myTblLine; i++){
        // myTableを掃除する
        myTable[i]="　";
    }
    for(i = 0; i < myMonthTbl[myMonth]; i++){
        // 日付を埋め込む
        myTable[i + myWeek] = i + 1;
    }

    // ***********************	
    //      カレンダーの表示	
    // ***********************
    // 表の作成開始
    calObj.append("<table border='1'>");
    // 見出し行セット
    calObj.append("<tr><td colspan='7'>");
    calObj.append(myYear + "年" + (myMonth + 1) + "月");	
    calObj.append("</td></tr>");	
    
    // 曜日見出しセット
    calObj.append("<tr>");
    // 一行(１週間)ループ
    var headTd = "";
    for(i = 0; i < 7; i++){
        headTd += "<td align='center' ";
        if(i === 0) {
            // 日曜のセルの色
            headTd += "bgcolor='#fa8072'>";	
        } else { 
            // 月～土のセルの色
            headTd += "bgcolor='#d3d3d3'>";
        }
    // '日'から'土'の表示
        headTd += (myWeekTbl[i]);
        headTd += ("</td>");	
    }	
    calObj.append(headTd);
    calObj.append("</tr>");	

    // 表の「行」のループ
    for(i = 0; i < myTblLine; i++){
        // 行の開始
        calObj.append("<tr>");
        // 表の「列」のループ
        for(j = 0; j < 7; j++){
            var td = "";
            // 列(セル)の作成
            td += "<td align='center' ";
            // 書きこむ内容の取得
            myDat = myTable[j + (i * 7)];
            if (myDat === myToday){
                // 今日のセルの色
                td += "bgcolor='#00ffff'>";
            } else if(j === 0){ 
                // 日曜のセルの色
                td += "bgcolor='#ffb6c1'>";
            } else {
                // 平日のセルの色
                td += "bgcolor='#f5f5f5'>";
            }
            // 日付セット
            td += myDat;
            // 列(セル)の終わり
            td += "</td>";
            var tdObj = clickCal($(td));
            calObj.append(tdObj);
        }
        // 行の終わり
        calObj.append("</tr>");
    }
    // 表の終わり
    calObj.append("</table>");
}

function clickCal(td){
    td.click(function(){
        td.css('background-color','#ff7f50');
    });
    
    return td;
}
