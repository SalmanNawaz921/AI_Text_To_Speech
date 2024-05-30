import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_API_BASE_URL =
  "https://text-to-speech-for-28-languages.p.rapidapi.com/";
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_AUDIO_KEY;

// const encodedParams = new URLSearchParams();

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: RAPID_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/x-www-form-urlencoded"),
        headers.set("X-RapidAPI-Key", RAPID_API_KEY),
        headers.set(
          "X-RapidAPI-Host",
          "text-to-speech-for-28-languages.p.rapidapi.com"
        );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    syntesizeText: builder.mutation({
      query: (params) => ({
        url: "/",
        method: "POST",
        body: parameters(params.msg, params.lang, params.source),
      }),
    }),
  }),
});

const parameters = (msg, lang, source) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("msg", msg);
  encodedParams.set("lang", lang);
  encodedParams.set("source", source);
  return encodedParams;
};

export const { useSyntesizeTextMutation } = audioApi;
