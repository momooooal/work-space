/* Fillable drafting patterns derived from the user's source cases. */
window.OfficeTemplates = (() => {
  const F = {
    org:['申請／來文單位','text','填寫這次案件的單位全銜'],
    activity:['活動／案件名稱','text','填寫這次案件的名稱，確認年度與屆次'],
    incomingDate:['來函日期','text','例如：115年10月30日'],
    incomingNo:['來函字號','text','填寫完整字號'],
    eventDate:['活動／賽事日期','text','請填實際日期或期間'],
    place:['活動／賽事地點','text','請填場館全名及必要地址'],
    host:['主辦單位','text','請核對本次活動的主辦單位'],
    law:['本次適用依據及條次','textarea','請確認本次適用的規定、版本與條次；原案原文可在右方查看'],
    naming:['本局列名處理','select',['不涉及列名','同意列名指導單位','同意列名協辦單位','原申請協辦，改列指導單位','免予列名']],
    review:['審查結果／具體理由','textarea','填寫已確認的資格、補助考量、差異或辦理理由'],
    amount:['本次擬補助金額（元）','number','例如：65200；不自動沿用舊案金額'],
    totalBudget:['活動總經費預算（元）','number','請輸入已確認的整數金額'],
    income:['報名費及其他收入說明','textarea','例如：報名費收入、其他補助、資金缺口'],
    ratio:['核定補助比例／支給方式','text','填寫本次確認的比例與實際結算支給方式'],
    budget:['本次預算年度及科目','textarea','填寫年度、計畫、業務與經費科目'],
    settlementInstructions:['核銷應附資料及注意事項','textarea','依本次核定與適用規定填寫；可先查看舊函中的核銷要求'],
    extra:['其他辦理事項','textarea','例如：獎狀另案簽辦、協助公告；無則留白'],
    attachments:['附件名稱及份數','textarea','逐項填寫這次實際隨文或隨簽檢附的文件'],
    copies:['副本受文者','text','例如：本局會計室、全民運動科'],
    originals:['正本受文者','textarea','填寫本次正本對象；留白時以申請／來文單位為正本'],
    people:['本次符合補助人數','number','選手與隊職員合計；須先確認資格及重複身分'],
    eligibility:['人員資格及人數審查說明','textarea','說明選手、隊職員、排除人員及理由；不要沿用舊案已審查結論'],
    route:['交通路線／方式','text','例如：自強號高雄至桃園'],
    travelRate:['交通單價（元）','number','請依本次確認的票價填寫'],
    travelTimes:['交通次數','number','例如：2'],
    lodgingRate:['住宿單價（元）','number','請填本次適用單價'],
    lodgingDays:['住宿天數','number','請填已確認的天數'],
    mealRate:['膳食單價（元）','number','請填本次適用單價'],
    mealDays:['膳食天數','number','請填已確認的天數'],
    expenseDetail:['費用明細（可直接填寫）','textarea','各費目人數不同時，直接填寫完整明細；也可用下方試算帶入'],
    originalApproval:['原核定日期與字號','text','填寫本案真正的原核定函，勿用相似案件字號'],
    before:['變更前內容','textarea','例如：原教練、原定活動日期'],
    after:['變更後內容','textarea','例如：新教練、變更後日期及是否仍為原地點'],
    reason:['申請變更原因','textarea','請填本次申請提出的理由'],
    impact:['對原核定人數、金額及其他事項的影響','textarea','請確認後填寫；不要預設為人數與金額均未變更'],
    approvedChange:['本次擬辦意見','text','例如：同意變更並予備查'],
    awardType:['申請名銜與獎勵項目','text','例如：市長名銜製發獎狀、獎盃'],
    awardReason:['核發理由及範圍','textarea','填寫本次的用途、資格、數量與理由'],
    awardRules:['獎狀、印模及名銜使用要求','textarea','依本次核准內容與適用規定填寫；原案原文僅供參考'],
    deadline:['報名截止／期間','text','請填已確認的截止時間'],
    registration:['報名方式','textarea','填寫報名連結、信箱或實際辦理方式'],
    contact:['對外聯絡資訊','text','填寫已確認、可公開的承辦單位及電話／信箱'],
    priorLetter:['前函日期與完整字號','text','例如：本局115年10月20日高市運全字第○○號函'],
    omissionReason:['補送原因','textarea','例如：前函因公文系統異常，附件未隨文送達'],
    scale:['活動規模及出席時段','textarea','例如：參與人數、開幕時間；本次資料需重新確認'],
    attendance:['建議出席層級／派員方式','text','請填本次擬請長官核示的出席安排'],
    recipientRole:['本局受文身分','text','例如：副本受文者'],
    handling:['是否另有應辦事項及處理方式','textarea','請確認後說明；例如：無須另行辦理，文存查'],
    background:['辦理緣由','textarea','例如：會議決議、長官指示或提案依據'],
    content:['成果／網站內容及範圍','textarea','條列本次已完成、可供審核的內容'],
    publishPlan:['奉核後的辦理方式','textarea','例如：官網設置入口、公告、後續更新'],
    coReview:['會辦單位及協助事項','textarea','填寫需要檢視資料的科室與業務範圍'],
    approvedAmount:['原核定補助金額（元）','number','依原核定函填寫'],
    actual:['實際執行情形','textarea','填寫活動日期、人數、執行差異及原因'],
    actualTotal:['實際結算總經費（元）','number','依收支結算表填寫'],
    reviewedAmount:['本次擬認列核銷金額（元）','number','須經檢視後填寫，系統不自動判定可核銷金額'],
    payoutAmount:['本次擬核撥金額（元）','number','填寫已確認的本次核撥額，與核銷金額分開'],
    settlementReview:['文件檢視結果、缺件與差異','textarea','請填實際檢視結果，不預設資料齊全或審核無誤'],
    settlementDecision:['本次擬辦結果','textarea','例如：擬同意核銷並核撥，或請補正後再辦；請寫明條件'],
    reportTo:['敬陳對象','text','例如：局長、市長；請依本案程序填寫']
  };
  const base=['org','activity','incomingDate','incomingNo'];
  const out=['attachments','originals','copies','reportTo'];
  const group=(title,fields)=>({title,fields});
  const registry=[
    {id:'activity_grant',name:'活動辦理補助核定',category:'活動辦理補助',modes:['簽','函','簽稿併陳'],description:'活動經費、補助理由、列名及核銷要求分開填寫。',groups:[group('新案基本資料',[...base,'host','eventDate','place']),group('補助與列名',['law','totalBudget','income','amount','review','naming','ratio','budget','settlementInstructions','extra']),group('附件與受文對象',out)]},
    {id:'team_grant',name:'組隊參賽補助',category:'參賽補助',modes:['簽','函','簽稿併陳'],description:'先填資格與人數，再核算交通、住宿及膳食費。',groups:[group('新案基本資料',[...base,'host','eventDate','place']),group('人員與審查',['law','people','eligibility','review']),group('費用與預算',['route','travelRate','travelTimes','lodgingRate','lodgingDays','mealRate','mealDays','expenseDetail','amount','budget','settlementInstructions']),group('附件與受文對象',out)]},
    {id:'deny_grant',name:'不予補助暨列名處理',category:'補助未核予',modes:['簽','函','簽稿併陳'],description:'填入本次不予補助的事實、依據與列名結果。',groups:[group('新案基本資料',[...base,'eventDate','place']),group('本次擬辦理由',['law','review','naming','extra']),group('附件與受文對象',out)]},
    {id:'coach_change',name:'教練／人員變更備查',category:'變更備查',modes:['簽','函','簽稿併陳'],description:'保留變更前後內容，另確認人數及金額影響。',groups:[group('新案基本資料',base),group('變更內容',['originalApproval','before','after','reason','impact','approvedChange']),group('附件與受文對象',out)]},
    {id:'date_change',name:'活動日期變更備查函',category:'變更備查',modes:['函'],description:'依原函寫法，清楚呈現原定與修正後的期程。',groups:[group('新案基本資料',base),group('變更內容',['originalApproval','before','after','reason','approvedChange']),group('附件與受文對象',out.filter(x=>x!=='reportTo'))]},
    {id:'name_only',name:'無涉補助之列名與備查',category:'列名與獎狀',modes:['簽','函','簽稿併陳'],description:'依無涉補助的舊案整理列名與協助轉知。',groups:[group('新案基本資料',[...base,'host','eventDate','place']),group('列名與後續處理',['review','naming','extra']),group('附件與受文對象',out)]},
    {id:'award',name:'獎狀／獎盃與名銜核發',category:'列名與獎狀',modes:['簽','函','簽稿併陳'],description:'以市長名銜簽函及獎狀舊案為參考，填入本次核發範圍。',groups:[group('新案基本資料',[...base,'eventDate','place']),group('核發內容',['awardType','awardReason','law','awardRules','extra','coReview']),group('附件與受文對象',out)]},
    {id:'forward',name:'活動資訊函轉／轉知',category:'活動轉知',modes:['函'],description:'保留活動時間、地點、報名與聯絡資訊的清楚結構。',groups:[group('新案基本資料',[...base,'eventDate','place']),group('對外資訊',['deadline','registration','contact']),group('附件與受文對象',out.filter(x=>x!=='reportTo'))]},
    {id:'resend',name:'前函漏附之補送附件函',category:'補送附件',modes:['函'],description:'以原函續辦，明列漏附原因與本次補送附件。',groups:[group('新案基本資料',['org','activity','priorLetter']),group('補送內容',['omissionReason','attachments']),group('受文對象',['originals','copies'])]},
    {id:'attend_yes',name:'邀請出席／建議派員簽',category:'出席與存查',modes:['簽'],description:'依本次活動規模與時段提出出席安排，保留長官核示空間。',groups:[group('新案基本資料',[...base,'eventDate','place']),group('出席安排',['scale','attendance','review']),group('附件與陳核',['attachments','reportTo'])]},
    {id:'attend_no',name:'備查暨免派員出席簽',category:'出席與存查',modes:['簽'],description:'依本次實際情形填寫免派員理由與存查方式。',groups:[group('新案基本資料',[...base,'eventDate','place']),group('本次處理',['review','handling']),group('附件與陳核',['attachments','reportTo'])]},
    {id:'copy_archive',name:'副本受文／無須辦理存查簽',category:'出席與存查',modes:['簽'],description:'先確認受文身分及有無應辦事項，再整理存查意見。',groups:[group('新案基本資料',base),group('辦理情形',['recipientRole','content','handling']),group('附件與陳核',['attachments','reportTo'])]},
    {id:'website_review',name:'網站／成果樣稿陳核簽',category:'網站與成果陳核',modes:['簽'],description:'整合辦理緣由、內容範圍、發布安排與會辦事項。',groups:[group('案件與緣由',['activity','background']),group('成果與後續辦理',['content','publishPlan','coReview']),group('附件與陳核',['attachments','reportTo'])]},
    {id:'settlement',name:'核銷／核撥填寫架構',category:'核銷／核撥',modes:['簽','函','簽稿併陳'],provisional:true,description:'這批沒有實際核銷簽。此為待補舊案的填寫架構，核銷金額與核撥金額分開填。',groups:[group('新案與原核定',[...base,'originalApproval','approvedAmount','ratio']),group('實際執行與本次審查',['actual','actualTotal','settlementReview','reviewedAmount','payoutAmount','settlementDecision','budget']),group('附件與受文對象',out)]}
  ];
  const numbers=['一','二','三','四','五','六','七','八','九','十','十一','十二'];
  const fieldLabel=k=>F[k]?.[0]||k;
  const raw=(o,k)=>String(o[k]??'').trim();
  const v=(o,k)=>raw(o,k)||`【待填：${fieldLabel(k)}】`;
  function numeric(value){const s=String(value??'').trim().replace(/,/g,'');if(!s||!/^\d+(?:\.\d+)?$/.test(s))return null;const n=Number(s);return Number.isFinite(n)&&n<=1e12?n:null}
  function money(o,key){const n=numeric(o[key]);return n==null?v(o,key):n.toLocaleString('zh-TW',{maximumFractionDigits:2})}
  function costs(o){const keys=['people','travelRate','travelTimes','lodgingRate','lodgingDays','mealRate','mealDays'];const values=Object.fromEntries(keys.map(k=>[k,numeric(o[k])]));if(keys.some(k=>values[k]==null)||!Number.isInteger(values.people)||values.people<=0)return null;const travel=values.people*values.travelRate*values.travelTimes,lodging=values.people*values.lodgingRate*values.lodgingDays,meal=values.people*values.mealRate*values.mealDays;const n=x=>x.toLocaleString('zh-TW',{maximumFractionDigits:2});return {travel,lodging,meal,total:travel+lodging+meal,text:`交通費（${raw(o,'route')||'【待填：交通路線／方式】'}）：${n(values.travelRate)}元×${n(values.travelTimes)}次×${n(values.people)}人＝${n(travel)}元。\n住宿費：${n(values.lodgingRate)}元×${n(values.lodgingDays)}日×${n(values.people)}人＝${n(lodging)}元。\n膳食費：${n(values.mealRate)}元×${n(values.mealDays)}日×${n(values.people)}人＝${n(meal)}元。\n合計：新臺幣${n(travel+lodging+meal)}元。`}}
  function source(o){return `${v(o,'org')}${v(o,'incomingDate')}${v(o,'incomingNo')}函`}
  function memo(o,subject,paras,plan){const ps=paras.filter(Boolean);return `簽\n於全民運動科\n\n主旨：${subject}\n\n說明：\n${ps.map((p,i)=>`${numbers[i]||i+1}、${p}`).join('\n\n')}\n\n擬辦：${plan}\n\n敬陳\n${v(o,'reportTo')}`}
  function letter(o,subject,paras){return `高雄市政府運動發展局 函（草稿）\n受文者：${raw(o,'originals')||v(o,'org')}\n附件：${v(o,'attachments')}\n\n主旨：${subject}\n\n說明：\n${paras.filter(Boolean).map((p,i)=>`${numbers[i]||i+1}、${p}`).join('\n\n')}\n\n正本：${raw(o,'originals')||v(o,'org')}\n副本：${v(o,'copies')}`}
  function build(id,o){const org=v(o,'org'),act=v(o,'activity'),name=v(o,'naming'),event=`旨揭活動訂於${v(o,'eventDate')}假${v(o,'place')}辦理。`;const ref=`依據${source(o)}辦理。`;const reply=`復${source(o)}。`;const attach=`檢陳${v(o,'attachments')}供參。`;const optional=raw(o,'extra')||'';let m='',l='';
    if(id==='activity_grant'){
      m=memo(o,`謹為${org}辦理「${act}」，申請經費補助暨相關列名一案，簽請鑒核。`,[ref,`旨揭活動由${v(o,'host')}主辦，訂於${v(o,'eventDate')}假${v(o,'place')}辦理。`,`有關經費補助事宜：\n（一）本次適用依據：${v(o,'law')}。\n（二）活動總經費預算新臺幣${money(o,'totalBudget')}元；收入及經費情形：${v(o,'income')}。\n（三）審查及補助考量：${v(o,'review')}。`,attach],`擬補助新臺幣${money(o,'amount')}元，列名處理為「${name}」，經費擬由${v(o,'budget')}項下支應；補助比例及支給方式為${v(o,'ratio')}。${optional}奉核後，依核定內容函復該單位，並辦理後續事宜。`);
      l=letter(o,`有關貴單位辦理「${act}」申請經費補助暨相關列名一案，復如說明，請查照。`,[reply,`旨揭活動本局同意補助新臺幣${money(o,'amount')}元；列名處理：${name}。`,`本次適用依據：${v(o,'law')}。`,`有關核銷應附資料及注意事項：\n${v(o,'settlementInstructions')}`,`本案核定比例及實際結算支給方式：${v(o,'ratio')}。`,optional]);
    }
    if(id==='team_grant'){
      const detail=raw(o,'expenseDetail')||costs(o)?.text||v(o,'expenseDetail');
      m=memo(o,`有關${org}組隊參加「${act}」，申請參賽經費補助一案，簽請鑒核。`,[ref,`旨揭賽事由${v(o,'host')}主辦，訂於${v(o,'eventDate')}假${v(o,'place')}舉行。`,`本次適用依據：${v(o,'law')}。`,`人員資格及人數審查：${v(o,'eligibility')}；本次符合補助人數合計${v(o,'people')}人。`,`補助考量：${v(o,'review')}。費用明細如下：\n${detail}`,attach],`擬補助新臺幣${money(o,'amount')}元，經費擬由${v(o,'budget')}項下支應。奉核後，函復該單位本次核定結果，並依實際執行情形及核定內容辦理後續核銷。`);
      l=letter(o,`有關貴單位組隊參加「${act}」申請參賽經費補助一案，復如說明，請查照。`,[reply,`依${v(o,'law')}及本次審查結果，同意補助${v(o,'people')}人，計新臺幣${money(o,'amount')}元。費用明細如下：\n${detail}`,`請依本次核定內容辦理，核銷及後續核撥應附資料如下：\n${v(o,'settlementInstructions')}`]);
    }
    if(id==='deny_grant'){
      m=memo(o,`謹為${org}辦理「${act}」，申請經費補助暨相關列名一案，簽請鑒核。`,[ref,event,`本次適用依據：${v(o,'law')}。`,`有關經費補助，經查${v(o,'review')}。`,attach],`擬不予經費補助；列名處理為「${name}」。${optional}奉核後，函復該單位，並依核定意見辦理後續事宜。`);
      l=letter(o,`有關貴單位辦理「${act}」申請經費補助暨相關列名一案，復如說明，請查照。`,[reply,`有關經費補助及列名事宜：\n（一）本次適用依據：${v(o,'law')}。\n（二）經查${v(o,'review')}，爰無法核予經費補助。\n（三）列名處理：${name}。`,optional]);
    }
    if(id==='coach_change'){
      m=memo(o,`有關${org}申請變更「${act}」人員一案，簽請鑒核。`,[ref,`本案前經${v(o,'originalApproval')}核定在案。`,`茲因${v(o,'reason')}，申請將${v(o,'before')}變更為${v(o,'after')}。`,`本次變更對原核定事項之影響：${v(o,'impact')}。`,attach],`奉核後，依核定意見${v(o,'approvedChange')}，並函復該單位。`);
      l=letter(o,`有關貴單位申請變更「${act}」人員一案，復如說明，請查照。`,[reply,`原核定依據：${v(o,'originalApproval')}。`,`本次申請將${v(o,'before')}變更為${v(o,'after')}；本次處理結果：${v(o,'approvedChange')}。`,`原核定事項之影響及應注意事項：${v(o,'impact')}。`]);
    }
    if(id==='date_change')l=letter(o,`有關貴單位變更「${act}」活動期程一案，復如說明，請查照。`,[reply,raw(o,'originalApproval')?`原核定依據：${raw(o,'originalApproval')}。`:'',`旨揭活動原定${v(o,'before')}，因${v(o,'reason')}，申請修正為${v(o,'after')}；本次處理結果：${v(o,'approvedChange')}。`]);
    if(id==='name_only'){
      m=memo(o,`有關${org}辦理「${act}」，函請本局列名及協助辦理相關事項一案，簽請鑒核。`,[ref,`旨揭活動由${v(o,'host')}主辦，訂於${v(o,'eventDate')}假${v(o,'place')}辦理。`,`本案無涉經費補助，考量${v(o,'review')}。`,attach],`列名處理擬為「${name}」。${optional}奉核後，依核定內容函復，並辦理後續相關事項。`);
      l=letter(o,`有關貴單位辦理「${act}」函請本局列名一案，復如說明，請查照。`,[reply,`本案無涉經費補助；有關列名，列名處理：${name}。`,optional]);
    }
    if(id==='award'){
      m=memo(o,`謹為${org}辦理「${act}」，函請核發${v(o,'awardType')}一案，簽請鑒核。`,[ref,event,`本案核發理由及範圍：${v(o,'awardReason')}。`,`適用依據：${v(o,'law')}。`,`名銜、獎狀及印模之使用要求：${v(o,'awardRules')}。`,optional,attach,raw(o,'coReview')?`本案會辦${raw(o,'coReview')}。`:''],`奉核後，依核定範圍與使用要求函復該單位。`);
      l=letter(o,`有關貴單位辦理「${act}」申請核發${v(o,'awardType')}一案，復如說明，請查照。`,[reply,`本次核發範圍及用途：${v(o,'awardReason')}。`,`適用依據與使用要求：\n${v(o,'law')}\n${v(o,'awardRules')}`,optional]);
    }
    if(id==='forward')l=letter(o,`函轉${org}辦理「${act}」相關資料，請鼓勵貴屬踴躍報名參加，請查照。`,[ref,`旨揭內容如下：\n（一）活動時間：${v(o,'eventDate')}。\n（二）地點：${v(o,'place')}。\n（三）報名期間：${v(o,'deadline')}。\n（四）報名方式：${v(o,'registration')}。`,`倘對本案有任何問題，請逕洽${v(o,'contact')}。`]);
    if(id==='resend')l=letter(o,`補送「${act}」相關附件，請查照。`,[`依據${v(o,'priorLetter')}（諒達）續辦。`,`前函${v(o,'omissionReason')}，爰補送${v(o,'attachments')}，敬請見諒。`]);
    if(id==='attend_yes')m=memo(o,`有關${org}函邀本局蒞臨指導「${act}」一案，簽請鑒核。`,[ref,event,`活動規模及出席時段：${v(o,'scale')}。`,`考量${v(o,'review')}。`,attach],`擬${v(o,'attendance')}。奉核後，依核示之出席安排辦理。`);
    if(id==='attend_no')m=memo(o,`有關${org}辦理「${act}」，函請本局備查並邀請蒞臨指導一案，簽請鑒核。`,[ref,event,`經查${v(o,'review')}。`,attach],`擬不派員出席；後續處理為${v(o,'handling')}。奉核後，依核定意見辦理。`);
    if(id==='copy_archive')m=memo(o,`有關${org}函送「${act}」相關事項一案，簽請鑒核。`,[ref,`本局係${v(o,'recipientRole')}；經確認應辦情形：${v(o,'content')}。`,raw(o,'attachments')?attach:''],`擬${v(o,'handling')}。奉核後，依核定意見辦理。`);
    if(id==='website_review')m=memo(o,`檢陳「${act}」相關成果及樣稿，簽請鑒核。`,[`辦理緣由：${v(o,'background')}。`,`本次完成內容及範圍如下：\n${v(o,'content')}`,`本案會辦事項：${v(o,'coReview')}。`,attach],`奉核後，擬${v(o,'publishPlan')}。`);
    if(id==='settlement'){
      m=memo(o,`有關${org}檢送「${act}」經費核銷資料一案，簽請鑒核。`,[ref,`本案前經${v(o,'originalApproval')}核定補助新臺幣${money(o,'approvedAmount')}元；核定比例及支給方式為${v(o,'ratio')}。`,`實際執行情形：${v(o,'actual')}；實際結算總經費為新臺幣${money(o,'actualTotal')}元。`,`本次檢附資料：${v(o,'attachments')}。檢視結果及差異：${v(o,'settlementReview')}。`],`本次擬認列核銷金額為新臺幣${money(o,'reviewedAmount')}元，擬核撥金額為新臺幣${money(o,'payoutAmount')}元；具體辦理意見：${v(o,'settlementDecision')}。經費擬由${v(o,'budget')}項下支應。奉核後，依核定結果函復該單位，並辦理相關核銷或核撥事宜。`);
      l=letter(o,`有關貴單位檢送「${act}」經費核銷資料一案，復如說明，請查照。`,[reply,`原核定依據：${v(o,'originalApproval')}；核定補助新臺幣${money(o,'approvedAmount')}元。`,`本次文件檢視結果：${v(o,'settlementReview')}。`,`本次辦理意見：${v(o,'settlementDecision')}；認列核銷金額新臺幣${money(o,'reviewedAmount')}元，核撥金額新臺幣${money(o,'payoutAmount')}元。`]);
    }
    return {memo:m,letter:l};
  }
  function generate(id,o,mode){const template=registry.find(t=>t.id===id);if(!template)throw Error('找不到定型稿。');if(!template.modes.includes(mode))throw Error('此定型稿沒有對應的文件類型。');const parts=build(id,o);const docs=mode==='簽稿併陳'?[{kind:'簽',text:parts.memo},{kind:'函',text:parts.letter}]:[{kind:mode,text:mode==='簽'?parts.memo:parts.letter}];if(docs.some(d=>!d.text))throw Error('定型稿缺少對應內容。');const text=docs.map(d=>d.text).join('\n\n────────────────────\n\n');const missing=[...new Set([...text.matchAll(/【待填：([^】]+)】/g)].map(m=>m[1]))];return {docs,text,missing}}
  return {fields:F,list:registry,costs,generate,numeric};
})();
