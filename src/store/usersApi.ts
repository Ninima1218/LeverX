import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/User";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users"
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`
    })
  })
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
