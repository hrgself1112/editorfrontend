import { configureStore } from "@reduxjs/toolkit";
import articleData from "../slices/article-data";
export const store = configureStore({
    reducer: {
        ArticlesData:articleData,
    },
})