export interface PageVo {
    totalItems:number;
    totalPages:number,
    currentPage: number

}

export interface PagedData<T> {
    pageInfo: PageVo;
    data: T
}
