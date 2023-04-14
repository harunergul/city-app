export interface PageInfo {
    totalItems:number;
    totalPages:number,
    currentPage: number

}

export interface PagedData<T> {
    pageInfo: PageInfo;
    data: T
}
