# 教學與寫作提示的來源

整理與核對日期：2026-10-30。頁面內已提供教學重點、使用者欄位對應、核對方式及來源連結；使用工具不需要開啟外部教學，也不呼叫 AI API。

## 公文

依使用者先前討論的撰作習慣整理：主旨明確，說明交代來源與事實，擬辦提出具體方案；內簽／函稿稱謂分開；副本存查精簡；舊案事實逐項重新確認。這些是個人寫作提示，不是法規或機關通用規範。

檢查以可解釋的文字規則運作，會標明原文與行號，不自動修改，也不判定事實、補助資格、核銷額或法規正確性。公文舊案與 PDF 由使用者在瀏覽器私下匯入，不隨程式公開。

## Excel（Microsoft 官方說明）

| 工作 | 來源 |
|---|---|
| 分類統計 | [建立樞紐分析表](https://support.microsoft.com/zh-tw/excel/get-started/create-a-pivottable-to-analyze-worksheet-data) |
| 條件計數 | [COUNTIFS](https://support.microsoft.com/zh-tw/excel/functions/countifs-function) |
| 條件加總 | [SUMIFS](https://support.microsoft.com/zh-tw/excel/functions/sumifs-function) |
| 查找資料 | [XLOOKUP](https://support.microsoft.com/zh-tw/excel/functions/xlookup-function)、[查閱與參照函數](https://support.microsoft.com/zh-tw/excel/lookup-and-reference-functions-reference) |
| 重複資料 | [尋找及移除重複項目](https://support.microsoft.com/zh-tw/excel/find-and-remove-duplicates)、[COUNTIF](https://support.microsoft.com/zh-tw/excel/get-started/use-the-countif-function-in-microsoft-excel) |
| 多餘空白 | [TRIM](https://support.microsoft.com/zh-tw/excel/functions/trim-function) |
| 文字拆欄 | [資料剖析精靈](https://support.microsoft.com/zh-tw/excel/get-started/split-text-into-different-columns-with-the-convert-text-to-columns-wizard) |
| 一致填寫 | [下拉式清單](https://support.microsoft.com/zh-tw/excel/get-started/create-a-drop-down-list) |

教學以桌面版 Excel 為主。XLOOKUP 不適用 Excel 2016／2019，因此提供 INDEX＋MATCH 相容公式。不確定版本時選相容公式。

公式產生器不重新計算活頁簿。COUNTIFS/SUMIFS 的條件輸入採字面完全比對，跳脫萬用字元；公式範圍保留實際列位置（含中間空白列）。地址辨識是本站規則，不是 Excel 資料剖析功能的完整模擬。
