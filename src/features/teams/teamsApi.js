import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => {
                return {
                    url: `/teams?creator=${email}`,
                    method: "GET",
                };
            },
        }),

        createTeam: builder.mutation({
            query: (data) => {
                return {
                    url: "/teams",
                    method: "POST",
                    body: data
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result?.data) {
                    dispatch(
                        apiSlice.util.updateQueryData('getTeams', args.creator, (draft) => {
                            draft.push(result.data);
                        })
                    );
                };
            },
        }),

        updateTeam: builder.mutation({
            query: ({ id, data, creator }) => {
                return {
                    url: `/teams/${id}`,
                    method: "PATCH",
                    body: data
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result?.data) {
                    dispatch(
                        apiSlice.util.updateQueryData('getTeams', args.creator, (draft) => {
                            const findTeam = draft.find(team => team.id == result.data.id);
                            findTeam.members = args.data.members;
                        })
                    );
                };
            },
        }),
    }),
});

export const { useGetTeamsQuery, useCreateTeamMutation, useUpdateTeamMutation } = teamsApi;
