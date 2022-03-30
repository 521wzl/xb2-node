export class FileModel{
    id?: string;
    originalname: string;
    mimetype: string;
    filename: string;
    size: number;
    postId?: number;
    userId: number;
    width?:number;
    height?:number;
    metedata?:JSON

}