export class CategoryModel{
  id: number;
  code: string;
  name: string;
  createDate: any;
  createBy: string;
  updateDate: any;
  updateBy: string;

  constructor(code: string, name: string) {
    this.code = code;
    this.name = name;
  }
}
