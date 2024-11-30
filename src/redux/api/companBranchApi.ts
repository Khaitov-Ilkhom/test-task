import {api} from "./index.ts";
import {CreateBranch, EditBranch, EditBranchForm, GetAllBranches, SingleBranch} from "../../types";
import {FieldTypeC} from "../../routes/dashboard/company-branch/CompanyBranch.tsx";

const companyBranchApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBranches: build.query<GetAllBranches, {page: number, size: number}>({
      query: ({page, size}) => ({
        url: `branch/get/all?page=${page}&size=${size}`,
      }),
      providesTags: ["BRANCH"]
    }),
    createBranch: build.mutation<CreateBranch, FieldTypeC>({
      query: (body) => ({
        url: "branch/create",
        method: "POST",
        body
      }),
      invalidatesTags: ["BRANCH"]
    }),
    updateBranch: build.mutation<EditBranch, EditBranchForm>({
      query: ({body, id}) => ({
        url: `branch/update/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["BRANCH"]
    }),
    getSingBranch: build.query<SingleBranch, { id: string | null }>({
      query: ({id}) => ({
        url: `branch/get/${id}`,
      }),
      providesTags: ["BRANCH"]
    }),
    deleteBranch: build.mutation({
      query: ({id}) => ({
        url: `branch/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["BRANCH"]
    }),
    changeManager: build.mutation({
      query: ({body, id}) => ({
        url: `branch/changeManager/${id}`,
        method: "POST",
        body
      }),
      invalidatesTags: ["BRANCH"]
    })
  })
})

export const {
  useGetAllBranchesQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useGetSingBranchQuery,
  useDeleteBranchMutation,
  useChangeManagerMutation
} = companyBranchApi