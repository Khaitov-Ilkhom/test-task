import {api} from "./index.ts";
import {AllUsers} from "../../types";

const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProfiles: build.query<AllUsers[], void>({
      query: () => ({
        url: "/profile/get/all"
      }),
      providesTags: ["BRANCH"]
    })
  })
})

export const {useGetAllProfilesQuery} = profileApi