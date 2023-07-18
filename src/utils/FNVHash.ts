export const FNVHash = (str: string): number => {
  let value = 215681; // 소수

  for (let i = 0; i < str.length; i++) {
    value ^= str.charCodeAt(i);
    value *= 1677619; // FNV 소수
  }

  return value >>> 0; // 부호 없는 32비트 정수로 변환
};
