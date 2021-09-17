const ESTADOS = [
  'RJ',
  'SP',
  'RS',
  'PA'
]
const useSheetApi = false;
const inicioUrlApi = 'https://cartola-proj-bloco-js.herokuapp.com'
const baseUrlApi = {
  times:`${inicioUrlApi}/times`,
  jogadores:`${inicioUrlApi}/jogadores`,
  partidas:`${inicioUrlApi}/partidas`,
  gols:`${inicioUrlApi}/gols`,
  
} 
//apiDev_times.json
//https://sheetdb.io/api/v1/afbp0fdkdpjvi
//"https://sheetdb.io/api/v1/isafz2ukd7tkk";
// "https://sheetdb.io/api/v1/cuyfdc2x1vwf4"

export { ESTADOS, baseUrlApi, useSheetApi  }

