import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: () => ({
                url: "/teams",
                method: "GET",
            }),
        }),

        createTeams: builder.mutation({
            query: (data) => ({
                url: "/teams",
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const { useGetTeamsQuery } = teamsApi;
