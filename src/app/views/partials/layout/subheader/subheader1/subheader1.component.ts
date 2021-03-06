// Angular
import {AfterViewInit, Component, Input, OnDestroy, OnInit,} from '@angular/core';
// RxJS
import {Subscription} from 'rxjs';
// Layout
import {SubheaderService} from '../../../../../core/_base/layout';
import {Breadcrumb} from '../../../../../core/_base/layout/services/subheader.service';
import {ClassroomService} from '../../../../../core/service/service-model/classroom.service';
import {SearchReport} from '../../../../../core/service/model/searchReport';
import {DataPackageService} from '../../../../../core/service/service-model/data-package.service';
import { QUARTERS } from 'src/app/helpers/constants';
import { SUB_HEADER } from '../../../../../helpers/constants';

@Component({
  selector: 'kt-subheader1',
  templateUrl: './subheader1.component.html',
  styleUrls: ['./subheader1.component.scss'],
})
export class Subheader1Component implements OnInit, OnDestroy, AfterViewInit {
  // Public properties
  @Input() fixed = true;
  @Input() clear = false;
  @Input() width = 'fluid';
  @Input() subheaderClasses = '';
  @Input() subheaderContainerClasses = '';
  @Input() displayDesc = false;
  @Input() displayDaterangepicker = true;

  // today: number = Date.now();
  title = '';
  desc = '';
  breadcrumbs: Breadcrumb[] = [];
  notSchoolYear;
  disableYears = false;
  disableStaticDataPackage;
  schoolYearList: any;
  years;
  quy;
  thang;
  thang2;
  yearNow;
  monthNow;
  quarterNow
  type;
  searchReport: SearchReport = new SearchReport();
  listType = SUB_HEADER.LIST_TYPE;

  listYear = []

  // listQ = QUARTERS;
  listQ;

  // listT = SUB_HEADER.LIST_MONTH
  listT;

  showHeaderTeacherProfile;
  showDashboard

  // Private properties
  private subscriptions: Subscription[] = [];

  /**
   * Component constructor
   *
   * @param subheaderService: SubheaderService
   */
  constructor(
    public subheaderService: SubheaderService,
    public classroomService: ClassroomService,
    public dataPackageService: DataPackageService,
  ) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    // this.getYearNow();
    const now = new Date();
    this.yearNow = now.getFullYear()
    this.monthNow = now.getMonth() + 1
    this.quarterNow = QUARTERS.find(v => v.months.includes(this.monthNow))?.id

    this.getListSchoolYear();
    this.type = SUB_HEADER.TYPE_MONTH;
    this.thang = now.getMonth() + 1;
    this.years = now.getFullYear();
    if(this.years === this.yearNow){
      this.listT = [];
      this.listQ = [];
      // X??? l?? th??ng
      for (let i = 1; i <= this.monthNow; i++) {
        this.listT.push({id: i, name: i.toString()})
      }
      this.thang = this.monthNow;
      // X??? l?? qu??
      for (let i = 0; i < this.quarterNow; i++) {
        this.listQ.push(QUARTERS[i]);
      }
    }else{
      this.listT = SUB_HEADER.LIST_MONTH;
      this.listQ = QUARTERS;
    }
    this.quy = this.quarterNow;

    this.dataPackageService.changeYearCurrent(this.years);
    this.dataPackageService.changeQuartersCurrent(this.quy);
    this.dataPackageService.changeMonthCurrent(this.thang);

    this.dataPackageService.changeSubheader({
      type: this.type,
      year: this.years,
      month: this.thang,
      quarter: this.quy,
      months: [this.thang]
    })
  }

  /**
   * After view init
   */
  getListSchoolYear() {
    for (let i = 0; i < 10; i++) {
      this.listYear.push({name: this.yearNow - i})
    }
  }

  selectYears(event) {
    // this.classroomService.changeYearCurrent(this.years);
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.subheaderService.title$.subscribe((bt) => {
        // breadcrumbs title sometimes can be undefined
        if (bt) {
          this.title = bt.title;
          this.desc = bt.desc;
        }
      })
    );

    this.subscriptions.push(
      this.subheaderService.breadcrumbs$.subscribe((bc: any) => {

        if (bc && bc.length > 0) {
          console.log(bc[bc.length - 1])
          if (bc[bc.length - 1].page
            && (bc[bc.length - 1].page.indexOf('/system/school/schedule-timetable') > -1
              || bc[bc.length - 1].page.indexOf('/system/teacher/teaching-timetable') > -1
              || bc[bc.length - 1].page.indexOf('/system/student/transfer-students') > -1
              || bc[bc.length - 1].page.indexOf('system/student/students-gradebook') > -1
              || bc[bc.length - 1].page.indexOf('/system/student/attendance-student') > -1
              || bc[bc.length - 1].page.indexOf('/system/student/academic-abilities') > -1
              || bc[bc.length - 1].page.indexOf('/system/student/conduct-assessment') > -1
              || bc[bc.length - 1].page.indexOf('/system/dashboard') > -1
            )
          ) {
            this.disableYears = true;
          } else {
            this.disableYears = false;
          }
        }

        this.breadcrumbs = bc;
        if (location.href.includes('/school-year') ||
          location.href.includes('/teacher-management') ||
          location.href.includes('/student-profile/') ||
          location.href.includes('/create-update-student') ||
          location.href.includes('/teacher-profile/') ||
          location.href.includes('/create-update-teacher') ||
          location.href.includes('/account-management') ||
          location.href.includes('/system/official-letter-document') ||
          location.href.includes('/change-password') ||
          location.href.includes('/contact-group') ||
          location.href.includes('/contact/send-mail')||
          location.href.includes('system/data-package') ||
          location.href.includes('/system/school/manages-school') ||
          location.href.includes('/system/dashboard') ||
          location.href.includes('/system/package-management') ||
          location.href.includes('/system/statistic')
        ) {
          this.notSchoolYear = false;
        } else {
          this.notSchoolYear = true;
        }
        // Th??ng k?? c??c g??i c?????c
        if(location.href.includes('/system/statistic')){
          this.disableStaticDataPackage = true;
        }else{
          this.disableStaticDataPackage = false;
        }

        this.showDashboard = !location.href.includes('system/dashboard')

        let bre: Breadcrumb[] = [];


        if (location.href.includes('/account-management')) {
          bre = [{
            page: '/system/account/account-management',
            title: 'Qu???n l?? t??i kho???n'
          }];
          this.breadcrumbs = bre;
        }

        // if (location.href.includes('/change-password')) {
        //   bre = [{
        //     page: '/system/account/change-password',
        //     title: '?????i m???t kh???u'
        //   }];
        //   this.breadcrumbs = bre;
        // }

        if (location.href.includes('/contact/send-mail')) {
          bre = [{
            page: '/system/contact/send-mail',
            title: 'Li??n l???c c??n b??? gi??o vi??n'
          }, {
            page: '/system/contact/send-mail',
            title: 'G???i tin nh???n m???i'
          }];
          this.breadcrumbs = bre;
        }

        if (location.href.includes('/contact/contact-group')) {
          bre = [{
            page: '/system/contact/contact-group',
            title: 'Li??n l???c c??n b??? gi??o vi??n'
          }, {
            page: '/system/contact/contact-group',
            title: 'Danh s??ch nh??m li??n l???c'
          }];
          this.breadcrumbs = bre;
        }

        if (location.href.includes('/system/dashboard')) {
          bre = [];
          this.breadcrumbs = bre;
        }

        if (location.href.includes('/system/classroom-student')){
          bre = [
            {
              page: '/system/classroom-student',
              title: 'Sinh vi??n thu???c l???p h???c'
            }
          ];
          this.breadcrumbs = bre;
        }

        if (location.href.includes('/system/exam-student')){
          bre = [
            {
              page: '/system/exam-student',
              title: 'Danh s??ch b??i thi'
            }
          ];
          this.breadcrumbs = bre;
        }

        if (location.href.includes('/system/exam-student-detail')){
          bre = [
            {
              page: '/system/exam-student-detail',
              title: 'B??i thi'
            }
          ];
          this.breadcrumbs = bre;
        }

        if (location.href.includes('/system/point-exam-student')){
          bre = [
            {
              page: '/system/point-exam-student',
              title: 'Chi ti???t b??i thi c???a sinh vi??n'
            }
          ];
          this.breadcrumbs = bre;
        }
      })
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  selectType(event){
    const now = new Date()
    this.years = now.getFullYear()
    let months = [1,2,3,4,5,6,7,8,9,10,11,12]
    if(this.type === SUB_HEADER.TYPE_MONTH){
      this.thang = now.getMonth() + 1;
      months = [this.monthNow]
    }

    if(this.type === SUB_HEADER.TYPE_QUARTER){
      const foundQuarter = QUARTERS.find(quarter => quarter.months.includes(now.getMonth() + 1))
      console.log(foundQuarter)
      this.quy = foundQuarter.id
      this.quy = this.quarterNow;
      months = [this.monthNow]
    }

    this.dataPackageService.changeSubheader({
      type: this.type,
      year: this.years,
      month: this.thang,
      quarter: this.quy,
      months: months
    })
  }

  // L???y n??m
  changeYear(event){
    // List th??ng theo n??m
    this.listT = SUB_HEADER.LIST_MONTH
    this.listQ = QUARTERS

    if(this.years == this.yearNow){
      this.listT = SUB_HEADER.LIST_MONTH.filter( month => month.id <= this.monthNow)
      this.listQ = QUARTERS.filter(quarter => quarter.id <= this.quarterNow)
      this.thang = this.monthNow
      this.quy = this.quarterNow
    }
    this.searchReport.year = this.years;
    this.dataPackageService.changeYearCurrent(this.years);

    let months = this.handleMonths()

    this.dataPackageService.changeSubheader({
      type: this.type,
      year: this.years,
      month: this.thang,
      quarter: this.quy,
      months: months
    })
  }

  // Qu??
  changeQuy($event){
    this.searchReport.quarters = this.quy;
    this.thang = null;
    this.dataPackageService.changeQuartersCurrent(this.quy);
    const foundQuarter = QUARTERS.find(quarter => quarter.id == this.quy)

    let months = this.handleMonths()
    this.dataPackageService.changeSubheader({
      type: this.type,
      year: this.years,
      month: this.thang,
      quarter: this.quy,
      months: months
    })
  }
  // Th??ng
  changeMonth($event){
    this.searchReport.month = this.thang;
    this.quy = null;
    this.dataPackageService.changeMonthCurrent(this.thang);

    let months = this.handleMonths()

    this.dataPackageService.changeSubheader({
      type: this.type,
      year: this.years,
      month: this.thang,
      quarter: this.quy,
      months: months
    })
  }

  handleMonths(): any[] {
    let months = [1,2,3,4,5,6,7,8,9,10,11,12]
    if (this.years == this.yearNow) {
      months = [this.monthNow]
    }
    return months
  }
}
