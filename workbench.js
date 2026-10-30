/* Task-first UI, local document review and source-backed Excel lessons. */
window.Workbench = (() => {
  const reviewed = '2026-10-30';
  const base = 'https://support.microsoft.com/zh-tw/excel/';
  const lessons = [
    {id:'pivot',name:'分類統計人數',hint:'依性別、年齡或項目統計',method:'樞紐分析表',source:base+'get-started/create-a-pivottable-to-analyze-worksheet-data',operation:'stats'},
    {id:'count',name:'符合條件有幾筆',hint:'例如：計算某組別的報名數',method:'COUNTIFS',source:base+'functions/countifs-function'},
    {id:'sum',name:'依條件加總金額',hint:'例如：各項目的報名費合計',method:'SUMIFS',source:base+'functions/sumifs-function',operation:'stats'},
    {id:'lookup',name:'用編號查找資料',hint:'查找對照表中的名稱或金額',method:'XLOOKUP／INDEX＋MATCH',source:base+'functions/xlookup-function'},
    {id:'dedupe',name:'找出重複資料',hint:'先標記，再決定是否刪除',method:'COUNTIF／移除重複項',source:base+'find-and-remove-duplicates',operation:'dedupe'},
    {id:'trim',name:'清理多餘空白',hint:'處理前後空白、全形空白',method:'TRIM＋SUBSTITUTE',source:base+'functions/trim-function'},
    {id:'address',name:'拆開郵遞區號',hint:'保留原地址，另產生兩欄',method:'文字拆欄',source:base+'get-started/split-text-into-different-columns-with-the-convert-text-to-columns-wizard',operation:'address'},
    {id:'dropdown',name:'建立下拉選單',hint:'讓組別、狀態的填法一致',method:'資料驗證',source:base+'get-started/create-a-drop-down-list'}
  ];
  const writing = [
    ['主旨：一眼看懂要核什麼','點出案件與目的，細節放說明；不要只寫「有關旨揭案」。'],
    ['說明：來源、事實、依據','交代來函、前案、查核結果及理由；具體執行方式放擬辦。'],
    ['擬辦：把處理方式寫完整','寫明擬同意或不同意、金額、列名、函復與後續執行，避免只寫「依規定辦理」。'],
    ['簽與函：對象和狀態要分清','內簽以「該會／該單位」敘述；對外函用「貴會／貴單位」。函稿待核定後才能發文。'],
    ['副本案：先確認是否有應辦事項','確認無須另辦時，說明可精簡為受文身分與應辦情形，擬辦再寫存查方式。'],
    ['舊案：學結構，重新核對事實','日期、字號、金額、人數、條次及附件逐項核對。提到核銷要求的核定函，不等於實際核銷簽。']
  ];
  let reviewText = '', reviewMode = 'auto', reviewResult = [];
  const E = v => esc(v ?? '');
  function home(){
    const stats = window.OFFICE_CASE_LIBRARY.stats;
    const date = new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',month:'long',day:'numeric',weekday:'long'}).format(new Date());
    const tasks = [
      ['file','辦一份公文','找舊案、寫新稿、檢查用語','official'],
      ['sheet','整理一份 Excel','放入檔案，選方法、看結果','excel'],
      ['social','把活動資料變文案','宣傳貼文與公告，填好就能改','social'],
      ['folder','處理文件與轉檔','整理內容、合併 PDF、匯出檔案','documents']
    ];
    return `<div class="greeting-line"><div><div class="eyebrow">YOUR EVERYDAY WORKSPACE</div><h1>今天，要完成哪件事？</h1><p class="page-subtitle">選一件工作開始。資料放進來，結果帶出去。</p></div><div class="date-chip">${icon('calendar',15)}${E(date)}</div></div>
      <section class="start-grid" aria-label="快速開始">${tasks.map(([i,n,d,id])=>`<button class="start-card" data-action="tool" data-id="${id}"><span class="tool-icon">${icon(i,24)}</span><strong>${n}</strong><span>${d}</span><span class="start-arrow">開始 ${icon('arrow',15)}</span></button>`).join('')}</section>
      <section class="desk-strip"><div><strong>${stats.cases?`${stats.cases} 案舊稿，隨時可查`:'先把你的公文舊案放進來'}</strong><span>${stats.cases?`${stats.files} 份原始文件保存在這個瀏覽器`:'匯入私人資料包後，就能找原簽、原函並套用新稿。'}</span></div><button class="secondary" ${stats.cases?'data-action="tool" data-id="official"':'data-vault="open"'}>${stats.cases?'查看舊案':'匯入私人資料包'}${icon('arrow',14)}</button></section>
      <div class="quick-lanes"><button data-work="template" data-template="activity_grant">辦補助</button><button data-work="template" data-template="settlement">辦核銷</button><button data-work="review">檢查一份公文</button><button data-work="lesson" data-lesson="lookup">製作查找公式</button><button data-action="tool" data-id="design">修改圖卡文字</button></div>
      ${S.drafts.length?`<section class="resume-panel"><div class="section-head"><h2>接著完成</h2><button class="subtle" data-action="drafts">全部 ${S.drafts.length} 份草稿 ${icon('arrow',13)}</button></div><div class="resume-grid">${S.drafts.slice(0,3).map(d=>`<button data-action="load-draft" data-id="${E(d.id)}"><strong>${E(d.form.title||'未命名工作')}</strong><span>${E(TOOLS.find(t=>t.id===d.toolId)?.short)} · ${E(localDate(new Date(d.updatedAt)))}</span></button>`).join('')}</div></section>`:''}
      <section class="quick-find"><label for="quick-input">不確定要選哪一個？寫下你要做的事</label><form id="quick-task" class="quick-task"><input id="quick-input" placeholder="例如：統計報名人數、補送附件、回覆補件通知" required maxlength="2000"><button class="primary" type="submit">找工具 ${icon('arrow',14)}</button></form><small>依工作關鍵字找入口。也可以直接使用上方的常用工作。</small></section>
      <div class="section-head"><h2>全部工具<span>選右上角星號，留下常用工具</span></h2><div class="view-filters"><button class="filter-btn ${S.filter==='all'?'active':''}" data-action="filter" data-filter="all">全部 9</button><button class="filter-btn ${S.filter==='favorites'?'active':''}" data-action="filter" data-filter="favorites">常用</button></div></div><div class="tools-grid" id="tools-grid">${cardsHTML()}</div><p class="footer-note">${icon('leaf',12)}所有工具在瀏覽器內運作，不使用 AI API。換裝置前可到「資料與備份」下載備份。</p>`;
  }
  function excel(){
    const f=getForm('excel');
    return `<button class="back-link" data-action="home">${icon('back',13)}回到工作桌</button><div class="workspace-heading"><div class="eyebrow">FROM YOUR DATA TO YOUR RESULT</div><h1>Excel 工作台</h1><p class="page-subtitle">先看資料，再選做法。直接處理表格，也能跟著步驟在 Excel 完成。</p></div><div class="step-rail"><span>01 放入檔案</span><span>02 確認欄位與方法</span><span>03 核對並下載</span></div>
      <div class="excel-layout"><section class="panel excel-input"><div class="panel-heading"><h2>我的資料</h2><button class="subtle" data-action="sample-excel">先試範例</button></div><div class="field"><label for="f-title">工作名稱</label><input class="input" id="f-title" data-field="title" value="${E(f.title)}" placeholder="例如：活動報名統計"></div><label class="dropzone" id="dropzone">${icon('upload',24)}<strong>拖入 Excel，或點這裡選檔</strong><small>XLSX、CSV、TSV · 單檔 20 MB 內</small><input id="file-input" type="file" multiple accept=".xlsx,.csv,.tsv" aria-label="加入 Excel 或 CSV"></label><div id="file-list" class="file-list"></div><div id="workbook-area"></div><div id="excel-no-file" class="instruction-card"><h3>還沒有檔案也可以先學</h3><p>右側可選 8 種常見工作。加入檔案後，公式會依你的工作表與欄位調整。</p></div><div id="sheet-health"></div><div class="field"><label for="f-objective">這次的需求備忘（選填）</label><textarea class="textarea" id="f-objective" data-field="objective" placeholder="例如：想依競賽種類統計筆數與報名費">${E(f.objective)}</textarea></div><div class="form-actions"><button class="secondary" data-action="save-draft">存工作草稿</button><button class="subtle" data-action="reset">清空本次工作</button></div><p class="field-hint">草稿保存需求與教學選擇；原始 Excel 請自行保管，下次重新選取。</p></section>
      <aside class="panel lesson-panel"><div class="panel-heading"><h2>這次想做什麼？</h2><span class="tag green">一步一步教學</span></div><div class="lesson-grid">${lessons.map(l=>`<button data-work="lesson-select" data-lesson="${l.id}" title="${l.hint}">${l.name}</button>`).join('')}</div><div id="excel-lesson"></div><details class="result-extra"><summary>編輯已產生的處理步驟</summary><div id="result-body">${emptyOutputHTML()}</div></details></aside></div>`;
  }
  function config(d){
    const f=getForm('excel');
    const key=d?`${d.file.id}:${S.sheetIndex}:${d.hi}`:'sample';
    if(!f._lesson)f._lesson={id:'pivot',version:'modern'};
    const c=f._lesson;
    if(c.key!==key){c.key=key;c.a=d?Math.max(0,d.headers.findIndex(h=>/類別|項目|競賽|組別/.test(h))):0;c.b=d?Math.max(0,d.headers.findIndex(h=>/金額|費用|報名費/.test(h))):1;c.criterion='';c.queryCell='';}
    if(!lessons.some(l=>l.id===c.id))c.id='pivot';
    return c;
  }
  const quote = s => '"'+String(s).replace(/"/g,'""')+'"';
  const exactCriterion = s => quote('='+String(s).replace(/~/g,'~~').replace(/\*/g,'~*').replace(/\?/g,'~?'));
  function lessonPlan(c,d){
    const l=lessons.find(x=>x.id===c.id)||lessons[0];
    const first=d?d.hi+2:2,last=d?Math.max(first,d.sh.rows.length):100;
    const sheet=d?d.sh.name:'範例資料';
    const prefix="'"+sheet.replace(/'/g,"''")+"'!";
    const col=(n)=>columnName(Math.max(0,Number(n)||0));
    const a=col(c.a),b=col(c.b),out=col(d?d.width:3);
    const range=n=>`${prefix}$${col(n)}$${first}:$${col(n)}$${last}`;
    const ar=range(c.a),br=range(c.b),cell=`${prefix}${a}${first}`;
    const field=d?.headers[c.a]||'分類欄',value=d?.headers[c.b]||'金額欄';
    const all=`A${first-1}:${col(d?d.width-1:2)}${last}`;
    const text=c.criterion||'請填比對值',criterion=exactCriterion(text);
    const query=(c.queryCell||`${col(d?d.width+1:4)}${first}`).trim().toUpperCase();
    const validQuery=/^\$?[A-Z]{1,3}\$?[1-9]\d{0,6}$/.test(query)&&columnIndex(query.replace(/\$/g,''))<16384&&Number(query.replace(/[^0-9]/g,''))<=1048576;
    let steps=[],formulas=[],checks=[],note='',placement=`在「${sheet}」資料右側空白的 ${out}${first} 輸入公式；先確認該格沒有原始資料。`;
    if(l.id==='pivot'){
      steps=[`確認「${sheet}」${all} 的標題只有一列、每欄都有名稱。`,`在資料右側新增「筆數」欄，每筆填入 1；若中間有整列空白，先排除空白列。`,`選取含「筆數」欄的完整範圍，按「插入 → 樞紐分析表 → 新增工作表」。`,`把「${field}」拖到「列」，把「筆數」拖到「值」，在「值欄位設定」選「加總」。`,'需要交叉統計時，再把性別或另一分類欄拖到「欄」。'];
      checks=['一列先當成一筆；若一人有多列，不代表獨立人數。',`總計應與來源有效資料列數${d?' '+d.data.length+' 筆':''}一致。來源變動後，要重新整理樞紐分析表。`];
    }
    if(l.id==='count'||l.id==='sum'){
      formulas=[l.id==='count'?`=COUNTIFS(${ar},${criterion})`:`=SUMIFS(${br},${ar},${criterion})`];
      steps=[placement,`條件欄選「${field}」，填入要完全相符的內容${l.id==='sum'?`，加總欄選「${value}」`:''}。`,'複製下方公式貼入 Excel，按 Enter；這是整個範圍的統計，只需輸入一次。','換另一個條件時，修改上方比對值後重新複製公式。'];
      checks=[l.id==='count'?'此公式計算符合條件的資料列，不會自動去除同名或重複的人。':'加總欄須為數字；文字格式的金額可能被忽略，先與原表小計核對。','星號、問號與波浪號按字面比對；輸入「>=18」也會當成文字，而不是區間條件。'];
      note=c.criterion?'':'目前公式含示意條件「請填比對值」，請先填入你要比對的內容。';
    }
    if(l.id==='lookup'){
      const q=validQuery?`${prefix}${query}`:'【請修正查找儲存格】';
      formulas=validQuery?[c.version==='modern'?`=IF(${q}="","",XLOOKUP(${q},${ar},${br},"查無資料",0))`:`=IF(${q}="","",IFERROR(INDEX(${br},MATCH(${q},${ar},0)),"查無資料／請檢查"))`]:[];
      steps=[`先在「${sheet}」${validQuery?query:'有效的儲存格'}填入要查的編號或名稱；此格須位於對照表之外。`,placement,`以「${field}」當查找鍵，從「${value}」回傳同一列的資料。`,'貼上公式，先拿一筆確定存在與一筆不存在的編號驗證。'];
      checks=['鍵值須唯一；有重複時只會取第一筆。數字 001 與文字 001 的型態也要一致。','回傳欄若為空白，Excel 可能顯示 0；請回到來源確認。舊版 IFERROR 也會攔截其他公式錯誤。'];
      note=!validQuery?'請輸入有效的 A1 儲存格位置，例如 H2。':c.version==='modern'?'XLOOKUP 適用 Microsoft 365、Excel 2021／2024；2016／2019 請改選舊版。':'使用相容公式；不確定版本時，也可以先用 INDEX＋MATCH。';
    }
    if(l.id==='dedupe'){
      const criterionCell=`"="&SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(${cell},"~","~~"),"*","~*"),"?","~?")`;
      formulas=[`=IF(${cell}="","",IF(COUNTIF(${ar},${criterionCell})>1,"重複",""))`];
      steps=[placement,`以「${field}」作為判斷鍵；先確認同名是否真的代表同一人。`,'貼上標記公式，向下填滿到最後一列，篩選「重複」逐筆確認。','確定要移除時，備份原表，選完整資料範圍 → 資料 → 移除重複項 → 勾選判斷用欄位。'];
      checks=['公式只做標記，不會刪資料。空白鍵保持空白。','若同一人可報名多項，應用多欄判斷或整列去重，避免誤刪。'];
    }
    if(l.id==='trim'){
      formulas=[`=TRIM(SUBSTITUTE(SUBSTITUTE(${cell},CHAR(160)," "),"　"," "))`];
      steps=[placement,'貼上公式並往下填滿，原欄保留以便比較。','抽查姓名、地址、編號及英文名稱。確認後，複製新欄 → 選擇性貼上 → 值。'];
      checks=['TRIM 會將連續半形空白縮成一個。此公式另把不分行與全形空白換成半形空白。','若內部空白具有意義，例如固定寬度代碼，不宜直接取代原值。'];
    }
    if(l.id==='address'){
      steps=[`確認「${field}」確實是地址欄。網站可處理 [804]地址、【804】地址，以及「804 地址」等格式。`,'按「在這裡處理」，檢查地址欄位，再按「執行處理並看教學」。','結果會在原資料後新增郵遞區號、純地址兩欄；未辨識資料保留原地址。','在 Excel 手動操作時，可複製原欄到空白區，再用「資料 → 資料剖析」，選分隔符號並確認目的地。'];
      checks=['不要用固定前三碼切所有地址；郵遞區號可能為 3、5 或 6 碼。','不把門牌數字當郵遞區號；無法辨識的資料需人工確認。'];
    }
    if(l.id==='dropdown'){
      steps=['在同一張工作表的空白欄逐列填入允許的項目，例如「待補件」「審核中」「已結案」。',`選取要套用選單的「${field}」資料列（不含標題）。`,'按「資料 → 資料驗證」，允許類型選「清單」，來源選剛才的項目範圍。','勾選儲存格內的下拉式清單；要拒絕其他填法時，在錯誤警示選「停止」。'];
      checks=['輸入一個清單內與清單外的值測試。新增項目後要同步擴大來源範圍。','貼上既有資料可能繞過驗證；仍需檢查原本不一致的值。'];
    }
    return {lesson:l,steps,formulas,checks,note,first,last};
  }
  function diagnostics(d){
    const seen=new Set();let duplicates=0;const columns=d.headers.map((h,i)=>({name:h,letter:columnName(i),blank:0,spaced:0,numericText:0}));
    d.data.forEach(row=>{const key=JSON.stringify(row);if(seen.has(key))duplicates++;else seen.add(key);columns.forEach((c,i)=>{const v=row[i];if(v==null||String(v).trim()==='')c.blank++;if(typeof v==='string'&&v!==v.trim())c.spaced++;if(typeof v==='string'&&/^[-+]?\d+(?:,\d{3})*(?:\.\d+)?$/.test(v.trim()))c.numericText++;})});
    const raw=d.sh.rows[d.hi]||[];const headings=new Set();let repeatedHeaders=0,emptyHeaders=0;
    for(let i=0;i<d.width;i++){const h=String(raw[i]??'').trim();if(!h)emptyHeaders++;else if(headings.has(h))repeatedHeaders++;else headings.add(h)}
    return {duplicates,columns,repeatedHeaders,emptyHeaders};
  }
  function refreshExcel(){
    const host=document.getElementById('excel-lesson');if(!host)return;
    const d=sheetData(),c=config(d),p=lessonPlan(c,d),l=p.lesson;
    const headers=d?.headers||['分類','金額','編號'];
    const options=(n)=>headers.map((h,i)=>`<option value="${i}" ${+n===i?'selected':''}>${columnName(i)} · ${E(h)}</option>`).join('');
    const aLabel=l.id==='lookup'?'在哪一欄查找？':l.id==='address'?'地址在哪一欄？':'要使用的欄位';
    host.innerHTML=`<div class="lesson-title"><span class="eyebrow">${E(l.method)}</span><h3>${l.name}</h3><p>${l.hint}</p></div><p class="lesson-context">${d?`依「${E(d.sh.name)}」第 ${d.hi+1} 列標題產生 · ${d.data.length} 筆資料`:'目前是示意欄位；加入你的檔案後會自動替換範圍。'}</p><div class="field"><label for="lesson-a">${aLabel}</label><select id="lesson-a" class="select" data-lesson-field="a">${options(c.a)}</select></div>
      ${['sum','lookup'].includes(l.id)?`<div class="field"><label for="lesson-b">${l.id==='sum'?'加總哪一欄？':'回傳哪一欄？'}</label><select id="lesson-b" class="select" data-lesson-field="b">${options(c.b)}</select></div>`:''}
      ${['count','sum'].includes(l.id)?`<div class="field"><label for="lesson-criterion">要完全相符的內容</label><input id="lesson-criterion" class="input" data-lesson-field="criterion" value="${E(c.criterion)}" placeholder="例如：田徑" maxlength="150"></div>`:''}
      ${l.id==='lookup'?`<div class="field-row"><div class="field"><label for="lesson-version">我的 Excel 版本</label><select id="lesson-version" class="select" data-lesson-field="version"><option value="modern" ${c.version==='modern'?'selected':''}>365／2021／2024</option><option value="legacy" ${c.version==='legacy'?'selected':''}>2016／2019／不確定</option></select></div><div class="field"><label for="lesson-queryCell">放查找值的儲存格</label><input class="input" id="lesson-queryCell" data-lesson-field="queryCell" value="${E(c.queryCell)}" placeholder="${columnName(d?d.width+1:4)}${p.first}" maxlength="12"></div></div>`:''}
      <div id="lesson-plan">${planHTML(p)}</div>`;
    document.querySelectorAll('[data-work="lesson-select"]').forEach(b=>{b.classList.toggle('active',b.dataset.lesson===c.id);b.setAttribute('aria-pressed',String(b.dataset.lesson===c.id))});
    const health=document.getElementById('sheet-health');
    if(health){if(!d){health.innerHTML='';return}const h=diagnostics(d);health.innerHTML=`<details class="sheet-health"><summary>資料檢查 · ${h.duplicates} 筆整列重複 · ${h.emptyHeaders+h.repeatedHeaders} 個標題問題</summary><p>此處只提示，不會改動原始資料。文字數字可能是編號，請先確認用途。</p><ul>${h.emptyHeaders?`<li>${h.emptyHeaders} 欄標題空白，請確認標題列選對。</li>`:''}${h.repeatedHeaders?`<li>${h.repeatedHeaders} 個重複標題，製作樞紐分析表前先改成不同名稱。</li>`:''}<li>整列完全相同的後續資料：${h.duplicates} 筆。先確認是否真的重複。</li></ul><div class="table-wrap"><table class="data-table"><thead><tr><th>欄位</th><th>空白</th><th>前後空白</th><th>文字數字</th></tr></thead><tbody>${h.columns.map(x=>`<tr><td>${x.letter} · ${E(x.name)}</td><td>${x.blank}</td><td>${x.spaced}</td><td>${x.numericText}</td></tr>`).join('')}</tbody></table></div></details>`;}
  }
  function planHTML(p){return `${p.note?`<p class="callout">${E(p.note)}</p>`:''}<ol class="lesson-steps">${p.steps.map(s=>`<li>${E(s)}</li>`).join('')}</ol>${p.formulas.map((f,i)=>`<div class="formula-card"><div><strong>可以複製的公式</strong><button class="subtle" data-work="copy-formula" data-index="${i}">複製公式</button></div><code>${E(f)}</code></div>`).join('')}<div class="lesson-check"><strong>完成後，這樣核對</strong><ul>${p.checks.map(s=>`<li>${E(s)}</li>`).join('')}</ul></div><div class="output-actions">${p.lesson.operation?`<button class="primary" data-work="apply-lesson">${p.lesson.id==='sum'?'在這裡按分類加總':'在這裡處理'}</button>`:''}<button class="secondary" data-work="download-lesson">下載這份教學</button></div><p class="lesson-source">參考：<a href="${p.lesson.source}" target="_blank" rel="noopener noreferrer">Microsoft 官方說明 ↗</a><br>核對日期 ${reviewed} · 已整理為本頁步驟；開啟來源為選用操作。<br>步驟以 Excel 桌面版為主，其他版本選單名稱可能不同。</p>`}
  function officialIntro(){return `<section class="official-helper"><div><strong>先選案件階段，再寫這次的新稿</strong><p>補助是提出核定意見；核銷要對照原核定與實際執行資料。</p></div><button class="secondary" data-work="review">${icon('check',15)}寫作解析與草稿檢查</button><div class="quick-lanes"><button data-case-action="use-template" data-template="activity_grant">申請活動補助</button><button data-case-action="use-template" data-template="team_grant">組隊參賽補助</button><button data-case-action="use-template" data-template="settlement">核銷／核撥</button><button data-case-action="use-template" data-template="coach_change">人員異動</button><button data-case-action="use-template" data-template="copy_archive">副本存查</button></div></section>`}
  function lint(text,mode='auto'){
    const found=[],lines=String(text).split('\n');let section='',kind=mode==='letter'?'函':mode==='memo'?'簽':'';
    const add=(line,title,advice,snippet='')=>found.push({line,title,advice,snippet:snippet.slice(0,180)});
    if(!text.trim())return [];
    lines.forEach((line,i)=>{
      if(/^─{5,}/.test(line)){section='';if(mode==='auto')kind='';return}
      if(mode==='auto'&&/^\s*簽\s*$/.test(line))kind='簽';
      if(mode==='auto'&&/^.*函[（(]草稿[）)]/.test(line))kind='函';
      const h=line.match(/^\s*(主旨|說明|擬辦)[：:]/);if(h)section=h[1];
      if(/【待填[^】]*】|待確認|○○|ＯＯ/.test(line))add(i+1,'還有待補內容','補齊事實後再送核；不要直接刪掉待填標記。',line);
      if(kind==='簽'&&/貴會|貴單位|貴協會/.test(line))add(i+1,'核對內簽稱謂','內簽敘述通常用「該會／該單位」；若為直接引述來函，請依語境保留。',line);
      if(kind==='簽'&&section==='說明'&&/奉核後|擬補助|擬核撥|擬不派員|建議派|建請.*同意|擬不予|擬同意|擬由.*支應|擬認列/.test(line))add(i+1,'說明中可能混入擬辦','保留事實與理由，把本次金額、決定或執行方式放到擬辦。原案決定或引述內容另核對。',line);
      if(kind==='函'&&/擬辦意見|擬請|擬核撥|擬認列/.test(line))add(i+1,'核對函稿是否仍是內簽語氣','依真正核定結果改寫對外文字；尚未核定時保留草稿，不先承諾結果。',line);
      if(/依規定辦理[。；]?\s*$/.test(line)&&section==='擬辦')add(i+1,'擬辦可以更具體','補上要函復誰、處理什麼、金額或後續程序。',line);
    });
    if(!/^\s*主旨[：:]/m.test(text))add(0,'未辨識到主旨','檢查是否已提供完整草稿。');
    if((mode==='memo'||/\n?簽\s*\n/.test(text))&&!/^\s*擬辦[：:]/m.test(text))add(0,'未辨識到擬辦','內簽應明確列出本次具體辦理意見。');
    const years=[...new Set([...text.matchAll(/(?<!\d)(1\d{2})\s*年/g)].map(m=>m[1]))];
    if(years.length>1)add(0,'出現不同民國年度：'+years.join('、'),'可能是引用前案，也可能是舊年度殘留；逐一對照來函、活動與預算年度。');
    return found;
  }
  function reviewHTML(){return `<div class="dialog-heading"><div><span class="eyebrow">WRITE WITH A CLEAR PURPOSE</span><h2>公文寫作解析與檢查</h2></div><button class="icon-button" data-work="close-review" aria-label="關閉公文檢查">${icon('x')}</button></div><p>依你先前討論過的寫法整理。系統逐條提示可核對之處，不自動改動原稿。</p><details class="writing-rules"><summary>你的 6 個寫作重點</summary><div class="writing-grid">${writing.map(([h,p])=>`<article><h3>${h}</h3><p>${p}</p></article>`).join('')}</div><label for="writing-notes">我的補充備忘（會存入偏好備份，不會自動當成檢查規則）</label><textarea id="writing-notes" class="textarea" maxlength="4000" placeholder="例如：我的科室固定用語、長官提醒">${E(S.prefs.writingNotes||'')}</textarea><button class="secondary" data-work="save-writing">儲存備忘</button></details><div class="field"><label for="review-mode">這份文字是</label><select id="review-mode" class="select"><option value="auto" ${reviewMode==='auto'?'selected':''}>依「簽／函（草稿）」標頭辨識</option><option value="memo" ${reviewMode==='memo'?'selected':''}>內部簽</option><option value="letter" ${reviewMode==='letter'?'selected':''}>對外函</option></select></div><div class="field"><label for="review-text">貼上要檢查的草稿</label><textarea id="review-text" class="textarea review-text" maxlength="100000" placeholder="主旨：…\n\n說明：…\n\n擬辦：…">${E(reviewText)}</textarea></div><div class="form-actions"><button class="primary" data-work="run-review">檢查這份草稿</button><button class="secondary" data-work="load-review">帶入目前公文草稿</button></div><div id="review-result" aria-live="polite"></div><details class="writing-rules"><summary>補助／核銷：送出前逐項確認</summary><ul><li>補助：資格、依據、預算、擬補助額、列名與後續核銷要求。</li><li>核銷：原核定、實際執行、結算表、憑證、差異及本次審查結果。</li><li>原核定額、實際總支出、認列額、核撥額分開核對；不假設四者相同。</li><li>法律依據須核對本次適用原文、條次與版本；不以相似舊案直接判定合法或違法。</li><li>確認正副本、附件名稱與份數；函稿須在核定後才可發文。</li></ul></details>`}
  function openReview(){
    let d=document.getElementById('review-dialog');if(!d){d=document.createElement('dialog');d.id='review-dialog';d.className='review-dialog';document.body.append(d)}
    if(S.toolId==='official')reviewText=OfficeCases.currentText()||getForm('official')._result||getForm('official').material||reviewText;
    d.innerHTML=reviewHTML();d.showModal();
  }
  function showReview(){const text=document.getElementById('review-text').value;reviewText=text;reviewMode=document.getElementById('review-mode').value;reviewResult=lint(text,reviewMode);const host=document.getElementById('review-result');host.innerHTML=!text.trim()?'<p class="callout">請先貼上草稿。</p>':`<h3>${reviewResult.length?`找到 ${reviewResult.length} 處可核對`:'目前未匹配到文字規則'}</h3><p class="field-hint">這是結構與用語提示，不代表事實、計算或法規已通過審核。${reviewMode==='auto'?'沒有標頭的文字請手動選「內部簽」或「對外函」。':''}</p>${reviewResult.map(r=>`<article class="review-item"><strong>${r.line?'第 '+r.line+' 行 · ':''}${E(r.title)}</strong>${r.snippet?`<blockquote>${E(r.snippet)}</blockquote>`:''}<p>${E(r.advice)}</p></article>`).join('')}<button class="secondary" data-work="download-review">下載檢查紀錄</button>`;}
  function lessonText(p){return `${p.lesson.name}\n${p.lesson.method}\n\n${p.note}\n\n${p.steps.map((s,i)=>`${i+1}. ${s}`).join('\n\n')}\n\n公式\n${p.formulas.join('\n')}\n\n核對方式\n${p.checks.join('\n')}\n\n參考：${p.lesson.source}\n核對日期：${reviewed}`;}
  document.addEventListener('change',e=>{if(e.target.dataset.lessonField){const c=config(sheetData());c[e.target.dataset.lessonField]=e.target.value;if(e.target.tagName==='SELECT')refreshExcel()}if(e.target.id==='review-mode'){reviewMode=e.target.value;document.getElementById('review-result').innerHTML='<p class="field-hint">文種已變更，請重新檢查。</p>'}});
  document.addEventListener('input',e=>{if(e.target.dataset.lessonField){const c=config(sheetData());c[e.target.dataset.lessonField]=e.target.value;const host=document.getElementById('lesson-plan');host.innerHTML=planHTML(lessonPlan(c,sheetData()))}if(e.target.id==='review-text'){reviewText=e.target.value;document.getElementById('review-result').innerHTML='<p class="field-hint">文字已變更，請重新檢查。</p>'}});
  document.addEventListener('click',async e=>{
    const b=e.target.closest('[data-work]');if(!b)return;const a=b.dataset.work;
    try{
      if(a==='template')OfficeCases.openTemplate(b.dataset.template);
      if(a==='review')openReview();
      if(a==='close-review')document.getElementById('review-dialog').close();
      if(a==='run-review')showReview();
      if(a==='load-review'){reviewText=OfficeCases.currentText()||getForm('official')._result||getForm('official').material||'';document.getElementById('review-text').value=reviewText;document.getElementById('review-result').innerHTML='';if(!reviewText)toast('目前沒有公文草稿，可直接貼上文字。')}
      if(a==='save-writing'){S.prefs.writingNotes=document.getElementById('writing-notes').value;if(writeStore('prefs',S.prefs))toast('寫作備忘已儲存。')}
      if(a==='download-review')download(`公文檢查紀錄\n${new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei'})}\n\n${reviewResult.map(r=>`${r.line?'第'+r.line+'行：':''}${r.title}\n${r.snippet}\n${r.advice}`).join('\n\n')}\n\n仍需人工核對事實、計算、法規與附件。`,'公文檢查紀錄.txt');
      if(a==='lesson'){openTool('excel');config(sheetData()).id=b.dataset.lesson;refreshExcel()}
      if(a==='lesson-select'){config(sheetData()).id=b.dataset.lesson;refreshExcel()}
      if(a==='copy-formula'){const p=lessonPlan(config(sheetData()),sheetData());if(p.formulas[+b.dataset.index])await copyText(p.formulas[+b.dataset.index],'公式已複製，可貼到 Excel。')}
      if(a==='download-lesson'){const p=lessonPlan(config(sheetData()),sheetData());download(lessonText(p),p.lesson.name+'_教學.txt')}
      if(a==='apply-lesson'){
        const d=sheetData();if(!d?.data.length){toast('先加入你的表格，或按「先試範例」。');return}
        const c=config(d),l=lessons.find(x=>x.id===c.id);S.excelOptions={operation:l.operation};
        if(l.operation==='stats')Object.assign(S.excelOptions,{groupCol:+c.a,aggregate:l.id==='sum'?'sum':'count',valueCol:+c.b,crossCol:-1});
        if(l.operation==='address')S.excelOptions.addressCol=+c.a;
        if(l.operation==='dedupe')S.excelOptions.keyCol=+c.a;
        S.excelResult=null;renderWorkbook();document.getElementById('excel-operation').focus();document.getElementById('excel-operation').scrollIntoView({behavior:'smooth',block:'center'});toast('已選好處理方式，確認欄位後再執行。');
      }
    }catch(err){toast('未完成：'+err.message)}
  });
  return {home,excel,refreshExcel,officialIntro,lint,lessonPlan,diagnostics,lessons};
})();
