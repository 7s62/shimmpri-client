import {createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {defaultRankReducer} from "./types";
import {RootState} from "../../app/store";

export const getRanks = createAsyncThunk("ranks/get", async () => {
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
        console.log("7s200:temp", temp);
        return temp;
      })
      .catch((err) => {
        console.log("7s200:err", err);
        return [];
      });

    console.log("7s200:rank:", data);
  } catch (error) {
    return [];
  }
});

const rankReducer = createReducer(defaultRankReducer, (builder) => {
  builder
    .addCase(getRanks.pending, (state) => {
      return {...state, loading: true};
    })
    .addCase(getRanks.fulfilled, (state) => {
      return {...state, loading: false};
    })
    .addCase(getRanks.rejected, (state) => {
      return {...state, loading: false};
    });
});

export const selectDitto = (state: RootState) => state.ranks;

export default rankReducer;
