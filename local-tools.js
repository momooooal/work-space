/* Local, explicit templates and file operations. No model or API calls. */
window.LocalTools = (() => {
  const schemas = {
    social: [
      ['platform','發布位置','select',['Facebook','Instagram','Threads','直播置頂留言','短影音開場']],
      ['postType','這次要寫','select',['活動宣傳／報名','成果／花絮','奪牌祝賀','志工招募','公告／異動']],
      ['activity','活動／賽事名稱','text',''],['when','時間','text','未定可留白'],['where','地點','text',''],
      ['audience','參加對象／得獎者','text',''],['fee','費用','text',''],['signup','報名方式／網址','text',''],
      ['facts','已確認的重點','textarea','每行一點；奪牌貼文請填項目、組別、名次。'],
      ['closing','結尾／聯絡方式','text',''],['style','語氣','select',['自然精簡','正式公告']],
    ],
    reply: [
      ['replyType','回覆情境','select',['已收到／將辦理','審核中／尚未核定','請補充資料','已完成／已公告','婉拒／不符條件','依我的立場回覆']],
      ['audience','回覆對象','select',['民眾／粉專留言','協會／外部單位','長官／同事','廠商','Email']],
      ['salutation','稱呼','text','例如：您好、王小姐您好'],['subject','案件／信件主旨','text',''],
      ['stance','已確認的辦理情形／我的立場','textarea','只填可以對外說明的事實。'],
      ['next','對方需要做的事／補件項目','textarea','每行一點'],['deadline','期限／後續通知方式','text',''],
      ['signature','署名','text',''],
    ],
    official: [
      ['material','要整理的舊稿','textarea','貼上完整草稿；或加入 Word、PDF，再按「帶入附件文字」。'],
      ['replacePairs','逐字替換','textarea','每行：原文字 => 新文字\n例如：114年度 => 115年度'],
      ['formatMode','段落整理','select',['保留原段落','移除每行前後空白','合併連續空白行']],
    ],
    documents: [
      ['scope','匯出範圍','select',['所有檔案／所有工作表','目前選定工作表']],
      ['material','補充文字／照片說明','textarea','這些文字會完整加入匯出；圖片依檔案加入順序排列。'],
    ],
    research: [
      ['claim','要核對的問題／說法','textarea',''],['sourceOne','來源一名稱與日期','text','例如：官方競賽結果，115/10/20'],
      ['urlOne','來源一網址','text','https://…'],['quoteOne','來源一相關內容','textarea','貼上要核對的原文。'],
      ['sourceTwo','來源二名稱與日期','text',''],['urlTwo','來源二網址','text','https://…'],
      ['quoteTwo','來源二相關內容','textarea',''],['conclusion','你的核對結果','textarea','清楚寫出相同、矛盾或仍缺哪些資料。'],
      ['checkStatus','查核狀態','select',['待核對','依提供資料一致','資料有差異','查無足夠依據']],
    ],
    website: [
      ['siteTitle','網站名稱','text',''],['intro','網站介紹','textarea',''],
      ['entries','活動／課程資料','textarea','每行一筆，用 | 隔開：\n名稱 | 行政區／分類 | 地點 | 時間 | 報名網址'],
      ['contact','聯絡／更新說明','text',''],
    ],
    debug: [
      ['environment','平台／環境','text','例如：Excel、GitHub Actions、公文系統'],
      ['error','完整錯誤訊息','textarea','請先移除密碼、金鑰等資訊。'],
      ['tried','已試過的方法','textarea',''],['keyword','要在上傳手冊找的文字','text','依關鍵字逐頁找原文，不猜按鈕位置。'],
    ],
  };
  const descriptions = {
    social:'填入已確認的活動資料，依固定句型產生貼文。缺少的必要欄位保留待填，可直接修改成自己的口吻。',
    reply:'從常用情境選一個，帶入辦理現況與立場，產生可直接修改的回覆。',
    official:'依你列出的文字逐項替換並整理段落；右側可手動編輯，保留事實與待填項目。',
    documents:'盤點全部檔案與工作表，直接匯出資料值、Word、PDF 或合併 PDF。',
    research:'把來源、原文、日期與核對結果留在同一份紀錄。此工具比對你提供的內容，不會自行連網認定事實。',
    website:'用固定版型製作可搜尋、依分類篩選的資訊網頁。填好資料即可預覽，下載後可直接放到靜態網站。',
    debug:'依錯誤關鍵字提供檢查順序，也可在你上傳的手冊全文中找原文與頁碼。',
  };
  const has = id => Object.hasOwn(schemas,id);
  function form(id){const f=getForm(id);for(const [k,,type,opts] of schemas[id]||[])if(f[k]===undefined)f[k]=type==='select'?opts[0]:'';return f}
  function field([k,label,type,opts],f){return customFieldHTML([k,label,type,opts],f)}
  function render(t){const f=form(t.id);return `<button class="back-link" data-action="home">${icon('back',13)}回到工作桌</button>${t.id==='official'?'<div id="case-return-library">'+OfficeCases.tabsHTML()+'</div>':''}<div class="workspace-title"><span class="tool-icon">${icon(t.icon,25)}</span><h1>${t.id==='official'?'舊稿整理':esc(t.name)}</h1></div><p class="workspace-description">${descriptions[t.id]}</p><div class="workspace-summary"><span><span class="status-dot"></span>瀏覽器內處理</span><span>不使用 AI API</span><span>可編輯、可下載</span></div><div class="workspace-grid"><section class="panel form-panel"><form id="work-form"><div class="field"><label for="f-title">工作名稱</label><input class="input" id="f-title" data-field="title" value="${esc(f.title)}" maxlength="100"></div>${schemas[t.id].map(x=>field(x,f)).join('')}${['documents','official','debug'].includes(t.id)?uploadHTML():''}${t.id==='documents'?documentActions():''}${t.id==='official'?'<button type="button" class="secondary" data-local="attachment-text">帶入附件文字</button>':''}<div class="form-actions"><button type="submit" class="primary">${icon('file',15)}${t.id==='documents'?'盤點與讀取內容':t.id==='website'?'產生網頁':t.id==='debug'?'整理檢查步驟':'產生內容'}${icon('arrow',13)}</button><button type="button" class="secondary" data-action="save-draft">存草稿</button><button type="button" class="subtle" data-local="sample">放入範例</button><button type="button" class="subtle" data-action="reset">清空</button></div><p class="field-hint">草稿與偏好儲存在目前瀏覽器；附件請另行保存。</p></form></section><aside class="panel result-panel"><div class="result-heading"><h2>工作結果</h2><span class="tag">可直接編輯</span></div><div class="result-body" id="result-body">${emptyOutputHTML()}</div></aside></div>`}
  function uploadHTML(){return `<label class="dropzone" id="dropzone">${icon('upload',22)}<strong>加入檔案，資料留在瀏覽器</strong><small>XLSX、CSV、TXT、DOCX、PDF、圖片 · 單檔 20 MB</small><input type="file" id="file-input" multiple accept=".xlsx,.csv,.tsv,.txt,.md,.json,.docx,.pdf,.png,.jpg,.jpeg,.webp" aria-label="上傳工作資料"></label><div class="file-list" id="file-list"></div><div id="workbook-area"></div>`}
  function documentActions(){return `<div class="local-panel"><h3>直接匯出</h3><p class="field-hint">表格保留全部資料值；Word、PDF 會列出來源與工作表。PDF 以影像排版，文字不可搜尋；需要可編輯文字時選 Word。掃描 PDF 不含文字層時，可合併原頁，不能轉出文字。</p><div class="output-actions"><button type="button" class="secondary" data-local="document-word">Word</button><button type="button" class="secondary" data-local="document-pdf">PDF</button><button type="button" class="secondary" data-local="document-xlsx">XLSX 資料值</button><button type="button" class="secondary" data-local="document-csv">各表 CSV ZIP</button><button type="button" class="secondary" data-local="merge-pdf">合併原 PDF</button></div></div>`}
  const required=(v,label)=>String(v||'').trim()||`【待填：${label}】`;
  const lines=s=>String(s||'').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  function social(f){const name=required(f.activity,'活動名稱'),facts=lines(f.facts),formal=f.style==='正式公告';let opening;
    if(f.postType==='奪牌祝賀')opening=`恭喜${f.audience||'【待填：得獎者】'}！\n${name}`;
    else if(f.postType==='成果／花絮')opening=`${name}｜活動紀錄`;
    else if(f.postType==='志工招募')opening=`${name}｜志工招募\n${formal?'歡迎符合資格者報名參與。':'一起加入，讓活動順利進行。'}`;
    else if(f.postType==='公告／異動')opening=`【公告】${name}`;
    else opening=`${name}｜${formal?'開放報名':'歡迎一起參加！'}`;
    const details=[['時間',f.when],['地點',f.where],['對象',f.postType==='奪牌祝賀'?'':f.audience],['費用',f.fee],['報名',f.signup]].filter(([,v])=>v).map(([k,v])=>`${k}：${v}`);
    if(f.platform==='短影音開場'){return ['邀請型',`${name}開始囉，一起看看這次有哪些重點。`,'提問型',`想參加${name}？先看這幾個重點。`,'重點型',[name,...facts.slice(0,3)].join('｜'),'公告型',[name,...details].join('；'),'資訊與結尾',...facts,...details,f.closing].filter(Boolean).join('\n\n')}
    if(f.platform==='直播置頂留言')return [name,...facts,...details,f.closing].filter(Boolean).join('\n');
    let text=[opening,facts.join('\n'),details.join('\n'),f.closing].filter(Boolean).join('\n\n');
    if(f.platform==='Instagram')text+='\n\n#'+name.replace(/[^\p{L}\p{N}_]/gu,'');
    if(f.platform==='Threads'&&text.length>500)text+='\n\n【篇幅提醒：目前超過500字，請依平台當下限制調整。】';
    return text;
  }
  function reply(f){const greeting=f.salutation||'您好',status={
    '已收到／將辦理':'已收到您提供的資料，將依程序辦理。',
    '審核中／尚未核定':'本案目前仍在審核中，尚未核定；待有確定結果後，再依程序通知。',
    '請補充資料':'為利後續辦理，請協助補充下列資料。',
    '已完成／已公告':'本案辦理情形如下。',
    '婉拒／不符條件':'有關您提出的申請，依本次確認的條件，說明如下。',
    '依我的立場回覆':''}[f.replyType];
    const content=[f.audience==='Email'?`主旨：${required(f.subject,'信件主旨')}`:'',greeting+'：',f.subject&&f.audience!=='Email'?'有關「'+f.subject+'」，說明如下。':'',status,f.stance||(['依我的立場回覆','婉拒／不符條件','已完成／已公告'].includes(f.replyType)?'【待填：已確認的辦理情形】':''),lines(f.next).map((s,i)=>`${i+1}. ${s}`).join('\n'),f.deadline,f.signature].filter(Boolean);
    return content.join('\n\n');
  }
  function oldDraft(f){let text=String(f.material||'');if(!text)throw Error('請先貼上舊稿或帶入附件文字。');const pairs=lines(f.replacePairs).map(line=>{const i=line.indexOf('=>');if(i<1)throw Error('替換格式請使用「原文字 => 新文字」。');return [line.slice(0,i).trim(),line.slice(i+2).trim()]});if(pairs.length){const map=new Map(pairs);if(map.size!==pairs.length)throw Error('同一個原文字請只設定一次。');const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const re=new RegExp([...map.keys()].sort((a,b)=>b.length-a.length).map(escape).join('|'),'g');text=text.replace(re,m=>map.get(m));}if(f.formatMode==='移除每行前後空白')text=text.split('\n').map(s=>s.trim()).join('\n');if(f.formatMode==='合併連續空白行')text=text.replace(/\n[ \t]*\n(?:[ \t]*\n)+/g,'\n\n');return text}
  function inventory(){const fs=getFiles();return fs.map(f=>`${f.name}｜${f.status}${f.sheets?'\n'+f.sheets.map(sh=>`  ${sh.name}：${sh.rows.length}列 × ${sh.rows.reduce((n,r)=>Math.max(n,r.length),0)}欄（含原有標題列）${sh.missingCache?'；'+sh.missingCache+'格公式無已存結果':''}`).join('\n'):''}`).join('\n')}
  function sections(){const f=form('documents'),fs=getFiles();if(fs.some(x=>x.status==='讀取中…'))throw Error('檔案仍在讀取。');if(fs.some(x=>x.error))throw Error('有檔案未讀取完成，請先移除或重新加入，避免漏掉資料。');const s=[{title:'檔案盤點',text:inventory()||'沒有附件。'}];if(f.material)s.push({title:'補充文字',text:f.material});if(f.scope==='目前選定工作表'){const d=sheetData();if(!d)throw Error('請先選擇工作表。');s.push({title:d.file.name+'／'+d.sh.name,rows:d.sh.rows});return s}
    for(const entry of fs){if(entry.sheets){for(const sh of entry.sheets)s.push({title:entry.name+'／'+sh.name,rows:sh.rows})}else if(entry.imageURL){s.push({title:entry.name,images:[{file:entry.file}]})}else{s.push({title:entry.name,text:entry.text||'此檔沒有可讀取文字。請查看原始檔案。'})}}return s}
  function docsText(){const ss=sections();return ss.map(s=>s.title+'\n'+(s.rows?s.rows.map(r=>r.join('\t')).join('\n'):s.text||'【圖片：原檔會加入 Word 匯出】')).join('\n\n────────────\n\n')}
  function research(f){return [`查核問題\n${required(f.claim,'查核問題')}`,`狀態：${f.checkStatus}`,`紀錄日期：${new Date().toLocaleDateString('zh-TW')}`,...[1,2].map(i=>{const k=i===1?'One':'Two';return `來源${i}：${f['source'+k]||'未提供'}\n網址：${f['url'+k]||'未提供'}\n原文：\n${f['quote'+k]||'未提供'}`}),`核對結果\n${f.conclusion||'【待填：核對結果與仍缺資料】'}`,'處理範圍：本紀錄依填入的來源與原文整理，未自動連網驗證。'].join('\n\n')}
  function debug(f){const raw=f.error||'',steps=[];
    if(/401|unauthorized|bad credentials/i.test(raw))steps.push('權限或登入：確認失敗的是哪個服務；在該服務重新授權。檢查是否用了已過期的憑證，不要把金鑰貼到此表單。');
    if(/403|forbidden|permission denied|resource not accessible/i.test(raw))steps.push('存取權限：確認目前帳號是否可讀寫目標。若為 GitHub Actions，查看失敗紀錄中的 repository／branch，核對工作流程所需權限與分支保護；不要直接放寬全部權限。');
    if(/404|not found/i.test(raw))steps.push('目標不存在或無權限：核對完整網址、檔案大小寫、相對路徑與分支。先用相同帳號開啟目標確認。');
    if(/module not found|cannot find module|enoent/i.test(raw))steps.push('檔案或套件缺少：記下錯誤列出的路徑，確認該檔是否存在於目前分支；套件問題先核對安裝步驟與 lockfile，避免任意更換版本。');
    if(/#N\/A|#VALUE!|#REF!|#DIV\/0!/.test(raw))steps.push('試算表公式：#N/A 先核對查找鍵值、空白與文字／數字型態；#VALUE! 檢查輸入型態；#REF! 核對被刪除的範圍；#DIV/0! 先確認分母是否為0。保留原式，在旁欄逐步驗證。');
    if(/timeout|timed out|network|fetch|連線/i.test(raw))steps.push('連線或逾時：確認目標服務是否可開啟、網路是否穩定；只重試可安全重跑的步驟，保留時間與錯誤紀錄。');
    steps.push('保留錯誤原文、發生時間與重現步驟。一次只改一個條件，再用相同步驟確認結果。','若仍無法判定，補上失敗步驟前後的紀錄；此處僅依關鍵字提供檢查方向，尚未執行修正。');
    const hits=[];if(f.keyword){for(const file of getFiles()){if(!file.text)continue;const parts=file.text.split(/(?=【第 \d+ 頁】)/);for(const part of parts){let from=0,i;while((i=part.indexOf(f.keyword,from))>=0){const page=part.match(/^【第 \d+ 頁】/)?.[0]||'正文';hits.push(`【${file.name}｜${page}】\n${part.slice(Math.max(0,i-160),i+f.keyword.length+240)}`);from=i+f.keyword.length;if(hits.length>=60)break}if(hits.length>=60)break}if(hits.length>=60)break}}
    return [`平台／環境：${f.environment||'待填'}`,`錯誤原文\n${raw||'尚未提供；以下僅為一般檢查順序。'}`,`建議檢查順序\n${steps.map((s,i)=>`${i+1}. ${s}`).join('\n\n')}`,f.tried?'已嘗試\n'+f.tried:'',f.keyword?`手冊關鍵字：${f.keyword}\n${hits.length?hits.join('\n\n'):'在已讀取文字中沒有找到。請確認關鍵字與檔案文字層。'}${hits.length>=60?'\n（最多顯示60處，請縮小關鍵字。）':''}`:''].filter(Boolean).join('\n\n');
  }
  function siteHTML(f){const items=lines(f.entries).map((s,i)=>{const [name,category,where,when,url]=s.split('|').map(v=>v.trim());if(!name)throw Error(`第${i+1}筆缺少名稱。`);return {name,category:category||'其他',where,when,url:/^https?:\/\//i.test(url||'')?url:''}});const title=f.siteTitle||f.title||'活動資訊';const json=JSON.stringify(items).replace(/</g,'\\u003c');return `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>body{font:16px/1.7 system-ui,sans-serif;margin:0;background:#faf9f5;color:#243a34}main{max-width:1040px;margin:auto;padding:48px 24px}h1{color:#235b4e}input,select{font:inherit;padding:12px;border:1px solid #cbd6c4;border-radius:8px;max-width:100%;box-sizing:border-box}#grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin:24px 0}article{background:white;padding:24px;border:1px solid #dfe5d8;border-radius:12px}article small{color:#64775b}a{color:#235b4e}footer{white-space:pre-wrap;border-top:1px solid #ddd;padding-top:24px}</style><main><h1>${esc(title)}</h1><p>${esc(f.intro).replace(/\n/g,'<br>')}</p><label>關鍵字 <input id="q" type="search" placeholder="名稱、地點…"></label> <label>分類 <select id="cat"><option value="">全部</option></select></label><p id="count"></p><section id="grid"></section><footer>${esc(f.contact||'')}</footer></main><script>const data=${json},q=document.querySelector('#q'),cat=document.querySelector('#cat'),grid=document.querySelector('#grid');for(const name of new Set(data.map(x=>x.category))){const o=document.createElement('option');o.value=name;o.textContent=name;cat.append(o)}function show(){grid.replaceChildren();const found=data.filter(x=>(!cat.value||x.category===cat.value)&&Object.values(x).join(' ').toLowerCase().includes(q.value.toLowerCase()));document.querySelector('#count').textContent='共 '+found.length+' 筆';for(const x of found){const a=document.createElement('article');for(const [tag,text] of [['small',x.category],['h2',x.name],['p',x.where],['p',x.when]])if(text){const e=document.createElement(tag);e.textContent=text;a.append(e)}if(x.url){const e=document.createElement('a');e.href=x.url;e.target='_blank';e.rel='noopener noreferrer';e.textContent='查看詳情／報名';a.append(e)}grid.append(a)}}q.oninput=cat.onchange=show;show();<\/script></html>`}
  function generate(){if(!has(S.toolId))return false;try{if(getFiles().some(f=>f.status==='讀取中…'))throw Error('檔案仍在讀取，請稍候。');const f=form(S.toolId);S.output=({social,reply,official:oldDraft,documents:docsText,research,debug,website:siteHTML}[S.toolId])(f);f._result=S.output;renderOutput();toast('已產生，可直接在右側修改與下載。');return true}catch(err){toast(err.message);return false}}
  async function exportDocument(kind){const ss=sections(),title=form('documents').title||'資料整理';if(!getFiles().length&&!form('documents').material)throw Error('請先加入檔案或文字。');if(kind==='word')download(await LocalExport.word(title,ss),safeName(title)+'.docx');
    if(kind==='pdf'){if(ss.some(s=>s.images))throw Error('含圖片時請選 Word；PDF 匯出目前處理文字與表格。');const r=await LocalExport.pdf(title,ss);download(r.blob,safeName(title)+'.pdf');toast(`已產生${r.pages}頁 PDF。`)}
    if(kind==='xlsx'||kind==='csv'){const sheets=ss.filter(s=>s.rows).map(s=>({name:s.title,rows:s.rows}));if(!sheets.length)throw Error('沒有可匯出的工作表。');if(kind==='xlsx')download(await LocalExport.xlsx(sheets),safeName(title)+'.xlsx');else{const zip=new JSZip();sheets.forEach((sh,i)=>zip.file(String(i+1).padStart(2,'0')+'_'+safeName(sh.name)+'.csv',csvEncode(sh.rows)));download(await zip.generateAsync({type:'blob'}),safeName(title)+'_CSV.zip')}}}
  function sample(){const id=S.toolId,f=form(id);const data={social:{activity:'範例｜社區運動體驗日',when:'【待填：活動日期】',where:'【待填：場地】',audience:'歡迎運動初學者參加',facts:'報名人數與開課條件請依公告確認',signup:'【待填：報名連結】'},reply:{replyType:'審核中／尚未核定',stance:'承辦已完成送審。'},official:{material:'主旨：有關114年度示意活動，請核示。\n\n說明：本案資料尚待確認。',replacePairs:'114年度 => 115年度'},website:{siteTitle:'範例｜運動課程資訊',intro:'以下皆為示意資料。',entries:'親子運動體驗 | 鼓山區 | 示意活動中心 | 日期待確認 |\n伸展課程 | 三民區 | 示意運動中心 | 日期待確認 |'},debug:{environment:'Excel',error:'#N/A',keyword:'申請'},research:{claim:'兩份活動公告的報名截止日是否一致？',sourceOne:'公告A',quoteOne:'報名截止：11月10日',sourceTwo:'公告B',quoteTwo:'報名截止：11月12日',checkStatus:'資料有差異'},documents:{material:'這是示意文字，可加入檔案試用匯出。'}}[id];Object.assign(f,data,{title:'範例｜'+currentTool().short});invalidateOutput();window.render();toast('已放入示意資料。')}
  document.addEventListener('input',e=>{if(e.target.id==='local-result'){S.output=e.target.value;getForm()._result=S.output}});
  document.addEventListener('click',async e=>{const b=e.target.closest('[data-local]');if(!b)return;const action=b.dataset.local;b.disabled=true;try{if(action==='sample')sample();else if(action==='attachment-text'){const text=getFiles().map(f=>f.text).filter(Boolean).join('\n\n');if(!text)throw Error('尚無可讀取的附件文字。');form('official').material=text;invalidateOutput();window.render()}
      else if(action.startsWith('document-'))await exportDocument(action.slice(9));else if(action==='merge-pdf'){const fs=getFiles().filter(f=>/\.pdf$/i.test(f.name));if(fs.length<2)throw Error('請加入至少2份 PDF，依畫面檔案順序合併。');download(await LocalExport.mergePDF(fs.map(f=>f.file)),safeName(getForm().title||'合併文件')+'.pdf')}
      else if(action==='result-word')download(await LocalExport.word(getForm().title||currentTool().name,[{title:getForm().title||currentTool().name,text:S.output}]),safeName(getForm().title||currentTool().name)+'.docx');
      else if(action==='result-pdf'){const r=await LocalExport.pdf(getForm().title||currentTool().name,[{text:S.output}]);download(r.blob,safeName(getForm().title||currentTool().name)+'.pdf')}
      else if(action==='site-download')download(S.output,safeName(getForm().siteTitle||'index')+'.html','text/html;charset=utf-8');
      else if(action==='site-preview'){const iframe=document.getElementById('site-preview');iframe.srcdoc=S.output;iframe.hidden=false;iframe.scrollIntoView({behavior:'smooth',block:'start'})}
      else if(action==='excel-xlsx'&&S.excelResult?.rows)download(await LocalExport.xlsx([{name:'處理結果',rows:[S.excelResult.headers,...S.excelResult.rows]}]),safeName(S.excelResult.title)+'.xlsx');
    }catch(err){toast('未完成：'+err.message)}finally{if(b.isConnected)b.disabled=false}});
  return {has,render,generate,schemas,social,reply,oldDraft,research,debug,siteHTML};
})();
