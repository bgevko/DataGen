import { useState } from "react";

// function useActions() => {
//   const handleCopy = () => {
//     if (dataTypes.length === 0) return
//     const dataToCopy = data.loader.getFullString();
//     navigator.clipboard.writeText(dataToCopy);
//     setCopyButtonLabel("Copied!");
//   };

//   // Handler for when the user clicks on the Clear button
//   const handleClear = () => {
//     clearQuickOptions()
//     clearCustomOptions()
//     clearItemForms()
//   };

//   // Handler for when the user clicks on the refresh button
//   const handleRefresh = () => {
//     if (dataTypes.length === 0) return
//     data.shuffle()
//     updateDataString()
//   }

//   // Handler for when the user clicks on the download button
//   const handleDownload = () => {
//     if (dataTypes.length === 0) return

//     const dataToDownload = data.loader.getFullString()
//     let blob: Blob | MediaSource

//     switch (format) {
//       case "JSON":
//         blob = new Blob([dataToDownload], { type: 'application/json' });
//         break;
    
//       case "CSV":
//         blob = new Blob([dataToDownload], { type: 'text/csv' });
//         break
//     }

//     const a = document.createElement('a')
//     a.href = URL.createObjectURL(blob!)
//     a.download = `data.${format.toLowerCase()}`
//     document.body.appendChild(a)
//     a.click()
//   }
// }