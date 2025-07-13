// transliterate.js

const exactMap = {
  'ಕಾ': 'kÀ', 'ಕಿ': 'kÉ', 'ಕೀ': 'kÈ', 'ಕು': 'kR', 'ಕೂ': 'kÙ',
  'ಕೃ': 'kÝ', 'ಕೄ': 'kß', 'ಕೆ': 'Ák', 'ಕೇ': 'õk', 'ಕೈ': 'ÁÁk',
  'ಕೊ': 'ÁkÀ', 'ಕೋ': 'õkÀ', 'ಕೌ': 'ÁkO', 'ಕಂ': 'kM', 'ಕಃ': 'kH',

  'ಗ*': 'Ç', 'ಏ*': 'Ü', 'ಕ್*': 'æ', 'ಟ್*': 'ç', 'ತ್*': 'è',
  'ತ್ತ್*': 'é', 'ನ್*': 'ê', 'ಙ್ಕ್*': 'ë', 'ಹ್*': 'ì',
  'ಣ್ಟ್*': 'í', 'ಣ್ಡ*': 'í', 'ನ್ತ್*': 'ï', 'ದ್*': 'ð', 'ನ್ದ್*': 'ñ',
  'ರ್*': 'ò', 'ಣ್*': 'ó', 'ನ್ನ್*': 'ô', 'ಕ್ಕ್*': 'ö', 'ಟ್ಟ್*': 'ÿ',

  'ನ್ಯ': '#', 'ತ್ತ': '$', 'ಕ್ಕ': '%', 'ನ್ನ': '&', 'ಜ್ಜ': '*',
  'ದ್ದ': '@', 'ದ್ದು': '@R', 'ದ್ಧ': '>', 'ಲ್ಲ': 'X', 'ಪ್ಪ': '^',
  'ಸ್ತ': '£', 'ಸ್ತ್ರ': '§', 'ಞ್ಚ': 'Ë', 'ಞ್ಜ': 'Ì', 'ಞ್ಞ': 'Í',
  'ನ್ದ': 'Î', 'ನ್ತ': 'Ï', 'ಬ್ಬ': 'Ð', 'ತ್ಕ': 'Ñ', 'ಙ್ಕ': 'Ò',
  'ಕ್ಷ': 'Ó', 'ಟ್ಟ': 'Ú', 'ಮ್ಮ': 'Û', 'ಚ್ಚ': 'Þ', 'ಖ್ಯ': 'ã',
  'ನ್ತ್ರ': 'ä', 'ಕ್ತ': 'ú', 'ಕ್ನ': 'û', 'ಗ್ಗ': 'ü', 'ದ್ಕ': 'ý',
  'ತ್ರ': '¶', 'ಟ್ರ': 'qF', 'ಡ್ರ': 'ÅF', 'ದ್ರ': 'þ',

  'ಎ*': 'Æ', 'ಣ್ಟ': 'Ã', 'ಣ್ಡ': 'Ã', 'ಕ್ರ': 'kF', 'ಕ್ಯ': 'kY', 'ಕ್ಖ': 'kÊK',

  '್ಯ': 'Y', '್ರ': 'F', "ರ್": "'", '್ಲ': 'Ä', '್ಣ': 'Â', '್ವ': 'V',
  'ರ್ಣ': "N'", 'ರ್ನ': "n'"
};

const baseMap = {
  'ಅ': 'a', 'ಆ': 'A', 'ಇ': 'i', 'ಈ': 'I', 'ಉ': 'u', 'ಊ': 'U',
  'ಋ': '<', 'ಎ': 'e', 'ಏ': 'Ô', 'ಐ': 'E', 'ಒ': '¿',
  'ಓ': 'o', 'ಔ': 'á',

  'ಕ': 'k', 'ಖ': 'K', 'ಗ': 'g', 'ಘ': 'Õ', 'ಙ': 'z',
  'ಚ': 'c', 'ಛ': 'å', 'ಜ': 'j', 'ಝ': '÷', 'ಞ': 'J',
  'ಟ': 'q', 'ಠ': 'Ö', 'ಡ': 'Å', 'ಢ': 'W', 'ಣ': 'N',
  'ತ': 't', 'ಥ': 'î', 'ದ': 'd', 'ಧ': 'D', 'ನ': 'n',
  'ಪ': 'p', 'ಫ': 'ù', 'ಬ': 'b', 'ಭ': 'B', 'ಮ': 'm',
  'ಯ': 'y', 'ರ': 'r', 'ಲ': 'l', 'ಳ': 'L', 'ವ': 'v',
  'ಶ': 'S', 'ಷ': 'Z', 'ಸ': 's', 'ಹ': 'h',

  'ಂ': 'M', 'ಃ': 'H', '್': 'Ê',

  'ಾ': 'À', 'ಿ': 'É', 'ೀ': 'È', 'ು': 'R', 'ೂ': 'Ù',
  'ೃ': 'Ý', 'ೄ': 'ß', 'ೆ': 'Á', 'ೇ': 'õ',
  'ೈ': 'ÁÁ', 'ೊ': 'ÁÀ', 'ೋ': 'õÀ', 'ೌ': 'ÁO'
};

const dependentVowels = new Set([
  'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ',
  'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ'
]);

const splitVowels = {
  'ೊ': ['Á', 'À'],
  'ೋ': ['õ', 'À'],
  'ೌ': ['Á', 'O']
};

function applyVowel(base, vowel) {
  if (splitVowels[vowel]) {
    const [pre, post] = splitVowels[vowel];
    return pre + base + post;
  } else if (vowel === 'ೈ') {
    return 'ÁÁ' + base;
  } else if (vowel === 'ೆ') {
    return 'Á' + base;
  } else if (vowel === 'ೇ') {
    return 'õ' + base;
  } else {
    return base + (baseMap[vowel] || vowel);
  }
}

function convertText() {
  const input = document.getElementById('kannadaInput').value;
  let result = '';
  let i = 0;

  while (i < input.length) {
    let matched = false;

    // Handle exact cluster + vowel
    for (let len = 5; len >= 2; len--) {
      const cluster = input.slice(i, i + len);
      const vowel = input[i + len];
      if (exactMap[cluster] && dependentVowels.has(vowel)) {
        result += applyVowel(exactMap[cluster], vowel);
        i += len + 1;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Handle exact cluster
    for (let len = 5; len >= 2; len--) {
      const chunk = input.slice(i, i + len);
      if (exactMap[chunk]) {
        result += exactMap[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // Handle ರ್ + consonant [+ vowel]
    if (input.slice(i, i + 2) === 'ರ್') {
      const next = input[i + 2];
      const vowel = input[i + 3];
      if (next) {
        const base = baseMap[next] || next;
        if (dependentVowels.has(vowel)) {
          result += applyVowel(base, vowel) + "'";
          i += 4;
        } else {
          result += base + "'";
          i += 3;
        }
        continue;
      }
    }

    // Regular consonant + vowel
    const curr = input[i];
    const next = input[i + 1];
    if (dependentVowels.has(next)) {
      const base = baseMap[curr] || curr;
      result += applyVowel(base, next);
      i += 2;
      continue;
    }

    // Fallback single character
    result += baseMap[curr] || curr;
    i++;
  }

  document.getElementById('thirkeOutput').value = result;
}

document.getElementById('kannadaInput').addEventListener('input', convertText);

document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('mappingTable');
  const allMappings = Object.entries(baseMap).concat(Object.entries(exactMap));
  allMappings.forEach(([kn, en]) => {
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.textContent = kn;
    td2.textContent = en;
    row.appendChild(td1);
    row.appendChild(td2);
    table.appendChild(row);
  });
});
