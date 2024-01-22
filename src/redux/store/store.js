import { configureStore } from "@reduxjs/toolkit";
import articleData from "../slices/article-data";
import dataReducer from '../slices/fetch-refetch-api/fetch-data-api';
export const store = configureStore({
    reducer: {
        ArticlesData:articleData,
        data: dataReducer,
    },
})