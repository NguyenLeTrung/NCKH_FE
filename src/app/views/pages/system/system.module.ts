import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { CommonModule } from '@angular/common';
import { PanelBarModule, TabStripModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { DialogModule } from '@progress/kendo-angular-dialog';
import {
  DropDownListModule,
  DropDownsModule,
} from '@progress/kendo-angular-dropdowns';
import {
  FormFieldModule,
  InputsModule,
  TextBoxModule,
} from '@progress/kendo-angular-inputs';
// import {SchoolInfoModule} from './school-information/school-info.module';
import { LayoutModule } from '@angular/cdk/layout';
import { LabelModule } from '@progress/kendo-angular-label';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { environment } from '../../../../environments/environment';
import {
  BodyModule,
  ColumnResizingService,
  FilterMenuModule,
  GridModule,
  PagerModule,
  SharedModule,
} from '@progress/kendo-angular-grid';
import { MatSelectModule } from '@angular/material/select';
import { ActionShoolComponent } from './school/action-shool/action-shool.component';
import { SchoolComponent } from './school/school.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import 'ag-grid-enterprise';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { TranslateModule } from '@ngx-translate/core';
// tslint:disable-next-line:max-line-length
import { SystemsDirective } from './systems.directive';
import {CoreModule} from '../../../core/core.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TreeviewModule} from 'ngx-treeview';
import {EditorModule} from '@progress/kendo-angular-editor';
import {AccountManagementComponent} from './account-management/account-management.component';
import {AccountManagementModule} from './account-management/account-management.module';
import {ChangePasswordComponent} from '../auth/change-password/change-password.component';
import { ManagesSchoolComponent } from './manages-school/manages-school.component';
import { ActionManagesSchoolComponent } from './manages-school/action-manages-school/action-manages-school.component';
import { ViewSchoolComponent } from './manages-school/view-school/view-school.component';
import { StatisticComponent } from './statistic/statistic.component';
import {ChartModule} from '@progress/kendo-angular-charts';
import { StatisticSmsComponent } from './statistic/statistic-sms/statistic-sms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticalChartComponent } from './dashboard/statistical-chart/statistical-chart.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { StatisticRevenueComponent } from './statistic-revenue/statistic-revenue.component';
import { StatisticDetailComponent } from './statistic-revenue/statistic-detail/statistic-detail.component';
import { ListSchoolProvinceComponent } from './dashboard/list-school-province/list-school-province.component';
import { ActionStaticComponent } from './statistic/action-static/action-static.component';
import { ManagesUserComponent } from './manages-user/manages-user.component';
import { CreateUpdateUserComponent } from './manages-user/create-update-user/create-update-user.component';
import { ImportFileComponent } from './manages-user/import-file/import-file.component';
import { ManagesClassroomComponent } from './manages-classroom/manages-classroom.component';
import { CreateUpdateClassroomComponent } from './manages-classroom/create-update-classroom/create-update-classroom.component';
import { ManagesSubjectComponent } from './manages-subject/manages-subject.component';
import { CreateUpdateSubjectComponent } from './manages-subject/create-update-subject/create-update-subject.component';
import { ManagesQuestionComponent } from './manages-question/manages-question.component';
import { ManagesExamComponent } from './manages-exam/manages-exam.component';
import { CreateUpdateQuestionComponent } from './manages-question/create-update-question/create-update-question.component';
import { ImportClassroomComponent } from './manages-classroom/import-classroom/import-classroom.component';
import { ImportSubjectComponent } from './manages-subject/import-subject/import-subject.component';
import { ImportQuestionComponent } from './manages-question/import-question/import-question.component';
import { ActionManagesClassroomComponent } from './manages-classroom/action-manages-classroom/action-manages-classroom.component';
import { ActionManagesSubjectComponent } from './manages-subject/action-manages-subject/action-manages-subject.component';
import { PopupConfirmComponent } from './popup-confirm/popup-confirm.component';
import { ClassStudentComponent } from './class-student/class-student.component';
import { ViewClassStudentComponent } from './manages-classroom/view-class-student/view-class-student.component';
import { ManagesStudentComponent } from './manages-student/manages-student.component';
import { ManagesTeacherComponent } from './manages-teacher/manages-teacher.component';
import { CreateUpdateTeacherComponent } from './manages-teacher/create-update-teacher/create-update-teacher.component';
import { ActionManagesTeacherComponent } from './manages-teacher/action-manages-teacher/action-manages-teacher.component';
import { CreateUpdateStudentComponent } from './manages-student/create-update-student/create-update-student.component';
import { ActionManagesStudentComponent } from './manages-student/action-manages-student/action-manages-student.component';
import { ActionManagesQuestionComponent } from './manages-question/action-manages-question/action-manages-question.component';
import { CreateUpdateExamsComponent } from './manages-exam/create-update-exams/create-update-exams.component';
import { ExamStudentsComponent } from './exam-students/exam-students.component';
import { AddStudentComponent } from './class-student/add-student/add-student.component';
import { ActionClassStudentComponent } from './class-student/action-class-student/action-class-student.component';
import { ExamStudentDetailComponent } from './exam-students/exam-student-detail/exam-student-detail.component';
import {FormatTimePipe} from "../../../core/service/utils/format-time.pipe";
import { ListExamTeacherComponent } from './list-exam-teacher/list-exam-teacher.component';
import { DetailListExamPointComponent } from './list-exam-teacher/detail-list-exam-point/detail-list-exam-point.component';
import { ExamPointStudentComponent } from './list-exam-teacher/exam-point-student/exam-point-student.component';
import { ResultExamStudentComponent } from './exam-students/result-exam-student/result-exam-student.component';
import { ImportClassroomStudentComponent } from './class-student/import-classroom-student/import-classroom-student.component';
import { ImportTeacherComponent } from './manages-teacher/import-teacher/import-teacher.component';
import { ImportStudentComponent } from './manages-student/import-student/import-student.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
  },
  {
    path: 'account/change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'school/manages-school',
    component: ManagesSchoolComponent,
  },
  {
    path: 'statistic',
    component: StatisticComponent,

  },
  {
    path: 'statistic/revenue',
    component: StatisticRevenueComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'manages-user',
    component: ManagesUserComponent,
  },
  {
    path: 'manages-classroom',
    component: ManagesClassroomComponent,
  },
  {
    path: 'manages-subject',
    component: ManagesSubjectComponent,
  },
  {
    path: 'manages-question',
    component: ManagesQuestionComponent,
  },
  {
    path: 'manages-exam',
    component: ManagesExamComponent,
  },
  {
    path: 'classroom-student',
    component: ClassStudentComponent,
  },
  {
    path: 'manages-teacher',
    component: ManagesTeacherComponent,
  },
  {
    path: 'manages-student',
    component: ManagesStudentComponent,
  },
{
    path: 'create-exam',
    component: CreateUpdateExamsComponent,
  },
  {
    path: 'exam-student',
    component: ExamStudentsComponent,
  },
  {
    path: 'exam-student-detail',
    component: ExamStudentDetailComponent,
  },
  {
    path: 'list-exam-teacher',
    component: ListExamTeacherComponent,
  },
  {
    path: 'point-exam-student',
    component: ExamPointStudentComponent,
  },
  {
    path: 'result-exam',
    component: ResultExamStudentComponent,
  },  { path: '', redirectTo: 'system', pathMatch: 'full' },
  { path: '**', redirectTo: 'system', pathMatch: 'full' },
];

// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  providers: [ColumnResizingService,],
    declarations: [
        SystemComponent,
        SchoolComponent,
        SchoolComponent,
        ActionShoolComponent,
        SchoolComponent,
        SystemsDirective,
        AccountManagementComponent,
        ChangePasswordComponent,
        ManagesSchoolComponent,
        ActionManagesSchoolComponent,
        ViewSchoolComponent,
        StatisticComponent,
        StatisticSmsComponent,
        DashboardComponent,
        StatisticalChartComponent,
        ListSchoolProvinceComponent,
        ActionStaticComponent,
        StatisticRevenueComponent,
        StatisticDetailComponent,
        ManagesUserComponent,
        CreateUpdateUserComponent,
        ImportFileComponent,
        ManagesClassroomComponent,
        CreateUpdateClassroomComponent,
        ManagesSubjectComponent,
        CreateUpdateSubjectComponent,
        ManagesQuestionComponent,
        ManagesExamComponent,
        CreateUpdateQuestionComponent,
        ImportClassroomComponent,
        ImportSubjectComponent,
        ImportQuestionComponent,
        ActionManagesClassroomComponent,
        ActionManagesSubjectComponent,
        PopupConfirmComponent,
        ClassStudentComponent,
        ViewClassStudentComponent,
        ManagesStudentComponent,
        ManagesTeacherComponent,
        CreateUpdateTeacherComponent,
        ActionManagesTeacherComponent,
        CreateUpdateStudentComponent,
        ActionManagesStudentComponent,
        ActionManagesQuestionComponent,
        CreateUpdateExamsComponent,
        ExamStudentsComponent,
        AddStudentComponent,
        ActionClassStudentComponent,
        ExamStudentDetailComponent,
        FormatTimePipe,
        ListExamTeacherComponent,
        DetailListExamPointComponent,
        ExamPointStudentComponent,
        ResultExamStudentComponent,
        ImportClassroomStudentComponent,
        ImportTeacherComponent,
        ImportStudentComponent
    ],  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    InputsModule,
    LabelModule,
    FilterMenuModule,
    NgbModule,
    InputsModule,
    LabelModule,
    FilterMenuModule,
    HttpClientModule,
    NgSelectModule,
    NzTreeSelectModule,
    AngularFileUploaderModule,
    ModalModule.forRoot(),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    FormsModule,
    NgbModalModule,
    NgbCollapseModule,
    TabStripModule,
    PanelBarModule,
    LayoutModule,
    GridModule,
    ButtonsModule,
    DropDownsModule,
    DateInputsModule,
    SharedModule,
    DialogModule,
    DropDownListModule,
    FormFieldModule,
    ReactiveFormsModule,
    TextBoxModule,
    BodyModule,
    PagerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatRadioModule,
    TranslateModule,
    CoreModule,
    MatTooltipModule,
    EditorModule,
    AngularFileUploaderModule,
    TreeviewModule.forRoot(),
    AccountManagementModule,
    ChartModule,
    MatDatepickerModule,
    MatIconModule,
    AgGridModule
  ],
  entryComponents: [
    ActionShoolComponent,
    AccountManagementComponent,
    ChangePasswordComponent,
    ActionManagesSchoolComponent,
    ViewSchoolComponent,
    StatisticSmsComponent,
    ActionStaticComponent,
    ListSchoolProvinceComponent,
    StatisticRevenueComponent,
    StatisticDetailComponent,
    CreateUpdateUserComponent,
    ImportFileComponent,
    CreateUpdateClassroomComponent,
    CreateUpdateSubjectComponent,
    CreateUpdateQuestionComponent,
    ImportClassroomComponent,
    ImportSubjectComponent,
    ImportQuestionComponent,
    ActionManagesClassroomComponent,
    ActionManagesSubjectComponent,
    PopupConfirmComponent,
    ViewClassStudentComponent,
    ActionManagesTeacherComponent,
    CreateUpdateTeacherComponent,
    ActionManagesTeacherComponent,
    CreateUpdateStudentComponent,
    ActionManagesStudentComponent,
    ActionManagesQuestionComponent,
    AddStudentComponent,
    ActionClassStudentComponent,
    DetailListExamPointComponent,
    ImportClassroomStudentComponent,
    ImportTeacherComponent,
    ImportStudentComponent  ],
})

export class SystemModule {}
