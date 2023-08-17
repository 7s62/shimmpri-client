import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {Rank, defaultRankReducer} from "./types";
import {RootState} from "../../app/store";

export const getRanks = createAsyncThunk(
  "ranks/get",
  async (): Promise<Array<Rank>> => {
    try {
      const RANK_API = "https://staging-api.balue.xyz/v1/leaderboard";
      const data = await fetch(RANK_API, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
        },
      })
        .then(async (data) => {
          let temp = await data.json();
          return temp;
        })
        .catch((err) => {
          return [];
        });

      return data;
    } catch (error) {
      return [];
    }
  }
);

const rankReducer = createReducer(defaultRankReducer, (builder) => {
  builder
    .addCase(getRanks.pending, (state) => {
      return {...state, isLoading: true};
    })
    .addCase(getRanks.fulfilled, (state, action) => {
      if (action.payload) {
        state.ranks = action.payload;
      }
      state.isLoading = false;
    })
    .addCase(getRanks.rejected, (state) => {
      return {...state, isLoading: false};
    });
});

export const selectRanks = (state: RootState) => state.ranks;

export default rankReducer;
