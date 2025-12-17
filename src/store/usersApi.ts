import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../server/src/server-types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result ? [...result.map(u => ({ type: "User" as const, id: u._id })), { type: "Users", id: "LIST" }] : [{ type: "Users", id: "LIST" }]
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result) => result ? [{ type: "User", id: result._id }] : []
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
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
