const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const ctx={window:{},document:{addEventListener(){}},columnName(index){let n=index+1,r='';while(n>0){n--;r=String.fromCharCode(65+n%26)+r;n=Math.floor(n/26)}return r},columnIndex(s){return [...s.replace(/\d/g,'')].reduce((n,c)=>n*26+c.charCodeAt(0)-64,0)-1}};
vm.createContext(ctx);for(const f of ['workbench.js','office-templates.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const w=ctx.window.Workbench,t=ctx.window.OfficeTemplates;
const d={hi:2,width:3,file:{id:'fixture'},sh:{name:"報名 O'Brien",rows:[[],[],['組別','費用','編號'],['田徑',200,'01'],[],['游泳',100,'02']]},headers:['組別','費用','編號'],data:[['田徑',200,'01'],['游泳',100,'02']]};
let p=w.lessonPlan({id:'sum',a:0,b:1,criterion:'A*?~"'},d);
assert.equal(p.formulas[0],`=SUMIFS('報名 O''Brien'!$B$4:$B$6,'報名 O''Brien'!$A$4:$A$6,"=A~*~?~~""")`);
assert.match(w.lessonPlan({id:'lookup',a:2,b:0,version:'legacy',queryCell:'E4'},d).formulas[0],/INDEX\(.+MATCH\(.+,0\)/);
assert.match(w.lessonPlan({id:'lookup',a:2,b:0,version:'modern',queryCell:'E4'},d).formulas[0],/XLOOKUP/);
for(const bad of ['XFE1','A1048577','A0','A1);HYPERLINK("x")'])assert.equal(w.lessonPlan({id:'lookup',a:2,b:0,queryCell:bad},d).formulas.length,0);
for(const l of w.lessons){const plan=w.lessonPlan({id:l.id,a:0,b:1,criterion:'田徑'},d);assert(plan.steps.length>=3);assert(plan.checks.length>=2);assert(plan.lesson.source.startsWith('https://support.microsoft.com/'))}
const h=w.diagnostics({hi:0,width:3,headers:['A','A','空欄'],sh:{rows:[['A','A','']]},data:[[' x ','100',''],[' x ','100','']]});
assert.equal(h.duplicates,1);assert.equal(h.repeatedHeaders,1);assert.equal(h.emptyHeaders,1);assert.equal(h.columns[0].spaced,2);assert.equal(h.columns[1].numericText,2);
let review=w.lint('簽\n主旨：測試，請核示。\n說明：貴會115年申請。擬補助100元。\n擬辦：奉核後函復。');assert(review.some(r=>r.title==='核對內簽稱謂'));assert(review.some(r=>r.title==='說明中可能混入擬辦'));
review=w.lint('簽\n主旨：測試。\n說明：該會申請。\n擬辦：擬補助100元。\n────────────────────\n某局 函（草稿）\n主旨：有關貴會申請案。\n說明：請核對。');assert(!review.some(r=>r.title==='核對內簽稱謂'));
assert(w.lint('主旨：測試。\n說明：擬請貴會提供。','letter').some(r=>r.title==='核對函稿是否仍是內簽語氣'));
const v={org:'示意協會',activity:'示意活動',amount:'35860',budget:'測試科目',review:'已確認條件',naming:'同意列名指導單位',ratio:'依實際結算',attendance:'派員出席',handling:'文存查',reviewedAmount:'100',payoutAmount:'80',settlementDecision:'同意核銷並核撥',publishPlan:'公告網站',approvedChange:'同意備查'};
for(const template of t.list)for(const mode of template.modes){const result=t.generate(template.id,v,mode);assert(result.text.includes('主旨：'));assert(!result.text.includes('undefined'));if(mode==='簽'){const explanation=result.text.split('說明：')[1].split('擬辦：')[0];assert(!/擬補助|擬核撥|擬不派員|擬由.*支應|擬認列/.test(explanation),template.id)}}
for(const id of ['activity_grant','team_grant']){const x=t.generate(id,v,'簽').text;assert(x.split('擬辦：')[1].includes('35,860'));assert(x.includes('測試科目'))}
assert(!t.generate('coach_change',v,'函').text.includes('擬辦意見'));
assert.equal(t.costs({people:11,travelRate:930,travelTimes:2,lodgingRate:800,lodgingDays:1,mealRate:300,mealDays:2}).total,35860);
console.log('PASS: 8 lessons; escaped formulas and physical rows; version fallback; input validation; data diagnostics; memo/letter review; all 14 template modes; cost calculation.');
