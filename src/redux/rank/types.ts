// Copyright (c) Fewcha. All rights reserved.

export type RankReducer = {
  ranks: Array<Rank>;
  isLoading: boolean;
};
export type Rank = {
  address: string;
  point: number;
};

export const emptyRank: Rank = {
  address: "",
  point: 0,
};

export const defaultRankReducer: RankReducer = {
  ranks: [],
  isLoading: false,
};
