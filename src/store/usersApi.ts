import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@shared/types/User";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result 
          ? [...result.map(u => ({ type: "User" as const, id: u._id })), { type: "Users", id: "LIST" }] 
          : [{ type: "Users", id: "LIST" }]
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
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "User", id }, { type: "Users", id: "LIST" }]
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (userData) => ({
        url: "/sign-up",
        method: "POST",
        body: userData,
      }),
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }]
    }),
  })
});

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useUpdateUserMutation,
  useDeleteUserMutation, 
  useLoginMutation,
  useRegisterMutation,
  useCreateUserMutation
} = usersApi;