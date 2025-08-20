// レアリティの定義
type Rarity = 'N' | 'UC' | 'R' | 'SR' | 'SSR' | 'UR';

// ベースレアリティの確率定義
const BASE_RARITY_PROBABILITIES = {
  牛乳: { R: 0.66, SR: 0.24, SSR: 0.08, UR: 0.02 },
  特別牛乳: { UR: 1.0 },
  成分調整牛乳: { N: 0.33, UC: 0.33, R: 0.18, SR: 0.11, SSR: 0.04, UR: 0.01 },
  低脂肪牛乳: { N: 0.33, UC: 0.33, R: 0.18, SR: 0.11, SSR: 0.04, UR: 0.01 },
  無脂肪牛乳: { N: 0.33, UC: 0.33, R: 0.18, SR: 0.11, SSR: 0.04, UR: 0.01 },
  加工乳: { N: 0.33, UC: 0.33, R: 0.24, SR: 0.08, SSR: 0.02 },
  乳飲料: { N: 0.33, UC: 0.33, R: 0.24, SR: 0.08, SSR: 0.02 },
  その他: { N: 0.8, UC: 0.2 },
} as const;

// レアリティの序列
const RARITY_ORDER: Rarity[] = ['N', 'UC', 'R', 'SR', 'SSR', 'UR'];

/**
 * ベースレアリティを確率に基づいて取得
 * @param type ベースとなる牛乳の種類別名称
 * @returns 算出されたベースレアリティ
 */
const getBaseRarity = (type: keyof typeof BASE_RARITY_PROBABILITIES): Rarity => {
  const probabilities = BASE_RARITY_PROBABILITIES[type];
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const rarity of RARITY_ORDER) {
    if (probabilities[rarity as keyof typeof probabilities]) {
      cumulativeProbability += probabilities[rarity as keyof typeof probabilities]!;
      if (rand < cumulativeProbability) {
        return rarity;
      }
    }
  }

  // フォールバック
  return 'N';
};

/**
 * レアリティを上昇させる関数
 * @param currentRarity 現在のレアリティ
 * @param increaseLevel 上昇レベル (1: 小さくアップ, 2: 大きくアップ)
 * @returns 上昇後のレアリティ
 */
const increaseRarity = (currentRarity: Rarity, increaseLevel: 1 | 2): Rarity => {
  const currentIndex = RARITY_ORDER.indexOf(currentRarity);
  const newIndex = Math.min(currentIndex + increaseLevel, RARITY_ORDER.length - 1);
  return RARITY_ORDER[newIndex];
};

/**
 * 最終的なレアリティを算出
 * @param milkData 牛乳の各種データ
 * @returns 算出された最終レアリティ
 */
export const calculateFinalRarity = (milkData: {
  type: keyof typeof BASE_RARITY_PROBABILITIES;
  fatContent: number;
  solidContent: number;
  origin: '未記載' | '国産' | '産地指定' | '牧場指定' | '牛指定';
  sterilization: '高温殺菌' | '低温殺菌' | '無殺菌';
  cowType: 'ホルスタイン' | 'ジャージー' | 'ガーンジー' | 'ブラウンスイス' | 'エアーシャ';
  breedingMethod: 'つなぎ' | '放牧';
  feed: '粗飼料・濃厚飼料混合' | '濃厚飼料のみ' | '粗飼料のみ';
}): Rarity => {
  // 法律違反のチェック
  if (milkData.fatContent < 3.0 || milkData.solidContent < 8.0) {
    return 'N';
  }

  // 固定レアリティのチェック
  if (milkData.origin === '牛指定' || milkData.sterilization === '無殺菌') {
    return 'UR';
  }
  if (milkData.origin === '牧場指定') {
    const baseRarity = getBaseRarity(milkData.type);
    const minRarityIndex = RARITY_ORDER.indexOf('SSR');
    const baseRarityIndex = RARITY_ORDER.indexOf(baseRarity);
    return RARITY_ORDER[Math.max(baseRarityIndex, minRarityIndex)];
  }

  // ベースレアリティの取得
  let finalRarity = getBaseRarity(milkData.type);

  // レアリティ上昇要素の適用
  // 乳脂肪分
  if (milkData.fatContent >= 3.8) {
    finalRarity = increaseRarity(finalRarity, 1);
  }

  // 無脂乳固形分
  if (milkData.solidContent >= 8.5) {
    finalRarity = increaseRarity(finalRarity, 1);
  }

  // 産地
  if (milkData.origin === '国産') {
    finalRarity = increaseRarity(finalRarity, 1);
  } else if (milkData.origin === '産地指定') {
    finalRarity = increaseRarity(finalRarity, 2);
  }

  // 殺菌方法
  if (milkData.sterilization === '低温殺菌') {
    finalRarity = increaseRarity(finalRarity, 2);
  }

  // 牛種
  if (milkData.cowType !== 'ホルスタイン') {
    finalRarity = increaseRarity(finalRarity, 1);
  }

  // 飼育方法
  if (milkData.breedingMethod === '放牧') {
    finalRarity = increaseRarity(finalRarity, 1);
  }

  // 飼料
  if (milkData.feed === '粗飼料のみ') {
    finalRarity = increaseRarity(finalRarity, 1);
  }

  return finalRarity;
};
