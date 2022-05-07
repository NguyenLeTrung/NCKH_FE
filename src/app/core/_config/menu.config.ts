import {environment} from "../../../environments/environment";

export class MenuConfig {
  roleParam = environment.ROLE;
  ADMIN = this.roleParam.ADMIN;
  GV = this.roleParam.GV;
  SV = this.roleParam.SV;
  public defaults: any = {
    aside: {
      self: {},
      items: [
        {
          title: 'Trang chủ',
          page: '/system/dashboard',
          iconSvg: 'home.svg',
          translate: 'MENU.DASHBOARD',
        },
        // {
        //   title: 'Quản lý người dùng',
        //   page: '/system/manages-user',
        //   iconSvg: 'hocsinh.svg',
        //   translate: 'MENU.CATEGORY',
        // },
        {
          title: 'Quản lý giáo viên',
          page: '/system/manages-teacher',
          iconSvg: 'hocsinh.svg',
          translate: 'MENU.MANAGER_TEACHER',
          permission: [this.ADMIN],
        },
        {
          title: 'Quản lý sinh viên',
          page: '/system/manages-student',
          iconSvg: 'hocsinh.svg',
          translate: 'MENU.MANAGER_STUDENT',
          permission: [this.ADMIN, this.GV],
        },
        {
          title: 'Quản lý lớp học',
          icon: 'flaticon-dashboard',
          iconSvg: 'Paper.svg',
          page: '/system/manages-classroom',
          translate: 'MENU.NSX',
          permission: [this.ADMIN, this.GV],
        },
        {
          title: 'Quản lý môn học',
          translate: 'MENU.BOOK',
          iconSvg: 'dashboard-report.svg',
          page: '/system/manages-subject',
          permission: [this.ADMIN, this.GV],
        },
        {
          title: 'Quản lý câu hỏi',
          translate: 'MENU.BORROW',
          iconSvg: 'goicuoc.svg',
          page: '/system/manages-question',
          permission: [this.ADMIN, this.GV],
        },
        {
          title: 'Quản trị bài thi',
          translate: 'MENU.ACCOUNT',
          iconSvg: 'congvan-vb.svg',
          page: '/system/manages-exam',
          permission: [this.ADMIN, this.GV],
        },
        {
          title: 'Bài thi',
          translate: 'MENU.EXAM',
          iconSvg: 'congvan-vb.svg',
          page: '/system/exam-student',
          permission: [this.SV],
        },
        {
          title: 'Danh sách bài thi',
          translate: 'MENU.LIST_EXAM',
          iconSvg: 'congvan-vb.svg',
          page: '/system/list-exam-teacher',
          permission: [this.GV],
        },      ],
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
