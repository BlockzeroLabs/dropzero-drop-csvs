export declare const editFileName: (req: any, file: any, callback: any) => void;
export declare const editCsvFileName: (file: any) => string;
export declare const imageFileFilter: (res: any, file: any, callback: any) => any;
export declare const convertJsonToCsv: (data: any, token_name: any, date: any, id: any) => string;
export declare const movedFilePath: (data: any, dropName: any, filePath: any) => Promise<void>;
export declare const uploadFileToGit: (csv: any, dropName: any) => Promise<void>;
