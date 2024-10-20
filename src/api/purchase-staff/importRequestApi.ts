import { UseImportRequestsInput, UseImportRequestsResponse } from "@/types/ImportRequestType";
import { FilterBuilder, FilterOperationType } from '@chax-at/prisma-filter-common';
import axios from "axios";
import { get } from "../ApiCaller";

let importRequestUrl = "/import-request";

export const importRequestApi = {
  getOne: (id: string) => get(`${importRequestUrl}/${id}`),
  getAll: (queryString: string) => get(`${importRequestUrl}${queryString}`),
};

export const getAllImportRequestFn = async ({
  sorting,
  columnFilters,
  pagination,
}: UseImportRequestsInput): Promise<UseImportRequestsResponse> => {
  const limit = pagination.pageSize;
  const offset = pagination.pageIndex * pagination.pageSize;

  // Initialize filter and order arrays
  const filter: any[] = [];
  const order: any[] = [];

  columnFilters.forEach((filterItem) => {
    const { id, value } = filterItem;
  
    let type: FilterOperationType;
    if (id === 'name') {
      type = FilterOperationType.Ilike;
    } else {
      type = FilterOperationType.Eq;
    }
    if (Array.isArray(value)) {
      value.forEach((val) => {
        filter.push({ field: id, type, value: val });
      });
    } else {
      filter.push({ field: id, type, value });
    }
  });
  sorting.forEach((sort) => {
    const direction = sort.desc ? 'desc' : 'asc';
    order.push({ field: sort.id, dir: direction });
  });

  // Construct the query string
  const queryString = FilterBuilder.buildFilterQueryString({
    limit,
    offset,
    filter,
    order,
  });

  // Make the API request
  const res = await axios(importRequestApi.getAll(queryString));
  return res.data.data;
};
