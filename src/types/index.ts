import {FieldTypeC} from "../routes/dashboard/company-branch/CompanyBranch.tsx";
// login

export interface Login {
  message: null;
  code:    number;
  isError: boolean;
  data:    Data;
}

export interface Data {
  id:           string;
  name:         string;
  surname:      string;
  roles:        string[];
  token:        string;
  phone:        string;
  photo:        null;
  notification: null;
}

export interface Rgeister {
  message: null;
  code:    number;
  isError: boolean;
  data:    null;
}

// get all branch
export interface GetAllBranches {
  message: null;
  code:    number;
  isError: boolean;
  data:    Data1;
}

export interface Data1 {
  content:          Content[];
  pageable:         Pageable;
  totalElements:    number;
  totalPages:       number;
  last:             boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

export interface Content {
  id:              string;
  name:            string;
  address:         string;
  status:          string;
  managerName:     null;
  managerSurname:  null;
  managerPhotoUrl: null;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

// get all users
export interface AllUsers {
  id:          string;
  name:        string;
  surname:     string;
  phone:       string;
  password:    string;
  photoId:     null | string;
  status:      string;
  roleList:    string[];
  createdDate: Date;
}

// create branch
export interface CreateBranch {
  message: string;
  code:    number;
  isError: boolean;
  data:    null;
}

// edit branch
export interface EditBranch {
  message: string;
  code:    number;
  isError: boolean;
  data:    null;
}

// edit branch form
export interface EditBranchForm {
  body: FieldTypeC,
  id: string,
}

// single branch
export interface SingleBranch {
  message: null;
  code:    number;
  isError: boolean;
  data:    Data2;
}

export interface Data2 {
  name:      string;
  address:   string;
  companyId: string;
}
