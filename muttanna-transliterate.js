const exactMap = {
  'ಕಾ': 'ka', 'ಕಿ': 'ki', 'ಕೀ': 'kia', 'ಕು': 'ku', 'ಕೂ': 'kua',
  'ಕೆ': 'ke', 'ಕೇ': 'kea', 'ಕೈ': "kV", 'ಕೊ': 'ko', 'ಕೋ': 'koa',
  'ಕೌ': 'kY', 'ಕಂ': 'kM', 'ಕಃ': 'kH',

  // Special vowel sign ೃ cases
  'ಕೃ': 'kRu', 'ಗೃ': 'gRu', 'ದೃ': 'dRu', 'ತೃ': 'tRu', 'ವೃ': 'vRu',

  // Predefined clusters
  'ಕ್ರ': 'kÈ', 'ಖ್ರ': 'KÈ', 'ಗ್ರ': 'gÈ', 'ಘ್ರ': 'GÈ',
  'ಚ್ರ': 'cR', 'ಛ್ರ': 'CÉ',

  'ಕ್': 'kÁ', 'ಖ್': 'KÆ', 'ಗ್': 'gÁ', 'ಘ್': 'GÆ', 'ಙ್': 'ZÁ',

  'ಕ್ಕ': 'kÀ', 'ಖ್ಖ': 'KÀ', 'ಗ್ಗ': 'gÀ', 'ಘ್ಘ': 'GÀ', 'ಙ್ಙ': 'ZÀ',
  'ಕ್ಕ್': 'kÀÆ',

  'ಚ್': 'cx', 'ಚ್ಚ': 'cf', 'ಛ್': 'CÃ', 'ಛ್ಛ': 'CÂ', 'ಛ್ಛ್': 'CÊ'
};

const baseMap = {
  'ಅ': 'A', 'ಆ': 'Aa', 'ಇ': 'I', 'ಈ': 'Ia', 'ಉ': 'U', 'ಊ': 'Ua',
  'ಎ': 'E', 'ಏ': 'Ea', 'ಐ': 'F', 'ಒ': 'O', 'ಓ': 'Oa', 'ಔ': 'Y',

  'ಕ': 'k', 'ಖ': 'K', 'ಗ': 'g', 'ಘ': 'G', 'ಙ': 'Z',
  'ಚ': 'c', 'ಛ': 'C', 'ಜ': 'j', 'ಝ': 'J', 'ಞ': 'z',
  'ಟ': 'q', 'ಠ': 'Q', 'ಡ': 'w', 'ಢ': 'W', 'ಣ': 'N',
  'ತ': 't', 'ಥ': 'T', 'ದ': 'd', 'ಧ': 'D', 'ನ': 'n',
  'ಪ': 'p', 'ಫ': 'P', 'ಬ': 'b', 'ಭ': 'B', 'ಮ': 'm',
  'ಯ': 'y', 'ರ': 'r', 'ಲ': 'l', 'ಳ': 'L', 'ವ': 'v',
  'ಶ': 'S', 'ಷ': 'Ë', 'ಸ': 's', 'ಹ': 'h',

  'ಂ': 'M', 'ಃ': 'H', '್': 'x',

  'ಾ': 'a', 'ಿ': 'i', 'ೀ': 'ia', 'ು': 'u', 'ೂ': 'ua',
  'ೆ': 'e', 'ೇ': 'ea', 'ೈ': 'V', 'ೊ': 'o', 'ೋ': 'oa', 'ೌ': 'Y', 'ೃ': 'Ru'
};

const consonants = Object.keys(baseMap).filter(k => baseMap[k] && /[a-zA-Z{}]/.test(baseMap[k]) && k !== '್');

function convertText() {
  const input = document.getElementById("kannadaInput").value;
  let output = "";

  let i = 0;
  while (i < input.length) {
    const tri = input.slice(i, i + 3);
    const pair = input.slice(i, i + 2);
    const ch = input[i];

    // Exact map - try 3-char, then 2-char
    if (exactMap[tri]) {
      output += exactMap[tri];
      i += 3;
      continue;
    }
    if (exactMap[pair]) {
      output += exactMap[pair];
      i += 2;
      continue;
    }

    // Handle clusters like ಕ್ + ಕ or ತ್ + ರ etc.
    if (i + 2 < input.length && input[i + 1] === '್') {
      const c1 = input[i];
      const c2 = input[i + 2];
      if (consonants.includes(c1) && consonants.includes(c2)) {
        const m1 = baseMap[c1];
        const m2 = baseMap[c2];

        if (c1 === c2) {
          output += m1 + 'f'; // same consonant cluster
        } else if (c2 === 'ರ') {
          output += m1 + 'R'; // consonant + ರ cluster
        } else {
          output += m1 + 'x' + m2; // different consonants
        }

        i += 3;
        continue;
      }
    }

    output += baseMap[ch] || ch;
    i++;
  }

  /*
  // Optional: Post-process vowel sign reordering (like ಲ್ಲಿ → ÉX)
  output = output.replace(/([a-zA-ZÀÈÉÁÚÞ&~#üãß]+)(É|È|i|ia|u|ua|e|ea|V|o|oa|Y|Ru)/g, '$2$1');
  */

  document.getElementById("thirkeOutput").value = output;
}

function renderMappingTable() {
  const combined = { ...baseMap, ...exactMap };
  const entries = Object.entries(combined);
  const half = Math.ceil(entries.length / 2);
  const left = document.getElementById("leftColumn");
  const right = document.getElementById("rightColumn");

  entries.forEach(([kn, code], idx) => {
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = kn;
    td1.className = "kannada";

    const td2 = document.createElement("td");
    td2.textContent = code;

    row.appendChild(td1);
    row.appendChild(td2);

    if (idx < half) left.appendChild(row);
    else right.appendChild(row);
  });

  document.getElementById("search").addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    [left, right].forEach(column => {
      Array.from(column.children).forEach(row => {
        const match = row.textContent.toLowerCase().includes(filter);
        row.style.display = match ? "" : "none";
      });
    });
  });
}

function copyOutput() {
  const outputBox = document.getElementById("thirkeOutput");
  outputBox.select();
  outputBox.setSelectionRange(0, 99999); // mobile support
  navigator.clipboard.writeText(outputBox.value).then(() => {
    alert("ಲಿಪಿ ನಕಲು ಮಾಡಲಾಗಿದೆ!");
  });
}

function adjustFontSize(size) {
  document.getElementById("thirkeOutput").style.fontSize = size + "px";
  document.getElementById("fontSizeLabel").textContent = size + "px";
}

document.addEventListener("DOMContentLoaded", renderMappingTable);
