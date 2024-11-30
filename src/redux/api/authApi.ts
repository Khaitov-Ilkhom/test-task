import {api} from "./index.ts";
import {FieldTypeL} from "../../routes/auth/login/Login.tsx";
import {FieldType} from "../../routes/auth/register/Register.tsx";
import {Login, Rgeister} from "../../types";

const authApi = api.injectEndpoints?.({
  endpoints: (build) => ({
    signUp: build.mutation<Rgeister, FieldType>({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body
      })
    }),
    signIn: build.mutation<Login, FieldTypeL>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body
      })
    }),
    verification: build.mutation({
      query: (body) => ({
        url: "/auth/registration/verification",
        method: "POST",
        body
      })
    })
  })
})

export const {useSignUpMutation, useSignInMutation, useVerificationMutation} = authApi;