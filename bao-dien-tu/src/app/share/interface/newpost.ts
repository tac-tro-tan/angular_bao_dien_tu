type MyType = {
    id: string,
    tenChuyenMuc: string,
    maChuyenMuc: string
}

export interface INewPost {
    id: string,
    tieuDe: string,
    nguoiDang: string,
    ngayDang: string,
    luotXem: number,
    chuyenMuc: MyType[],
    noiDung: string,
    anh: string
}