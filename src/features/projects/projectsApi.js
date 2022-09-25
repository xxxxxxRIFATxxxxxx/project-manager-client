import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => {
                return {
                    url: `/projects?_sort=timestamp`,
                    method: "GET",
                };
            },
        }),

        createProject: builder.mutation({
            query: (data) => {
                return {
                    url: "/projects",
                    method: "POST",
                    body: data
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result?.data) {
                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {
                            draft.unshift(result.data);
                        })
                    );
                };
            },
        }),

        updateProject: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/projects/${id}`,
                    method: "PATCH",
                    body: data
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result?.data) {
                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {
                            const findProject = draft.find(project => project.id == result.data.id);
                            findProject.status = args.data.status;
                        })
                    );
                };
            },
        }),

        deleteProject: builder.mutation({
            query: (id) => {
                return {
                    url: `/projects/${id}`,
                    method: "DELETE",
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                if (result?.data) {
                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {
                            const index = draft.findIndex(project => project.id == args);
                            draft.splice(index, 1);
                        })
                    );
                };
            },
        }),
    }),
});

export const { 
    useGetProjectsQuery, 
    useCreateProjectMutation, 
    useUpdateProjectMutation, 
    useDeleteProjectMutation 
} = projectsApi;
