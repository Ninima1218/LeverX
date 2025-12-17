import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
    tagTypes: ["Users", "User"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: (result) => result ? [...result.map(u => ({ type: "User", id: u._id })), { type: "Users", id: "LIST" }] : [{ type: "Users", id: "LIST" }]
        }),
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: (result) => result ? [{ type: "User", id: result._id }] : []
        }),
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: "User", id }, { type: "Users", id: "LIST" }]
        })
    })
});
export const { useGetUsersQuery, useGetUserByIdQuery, useUpdateUserMutation } = usersApi;
