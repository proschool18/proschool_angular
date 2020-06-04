import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data = { };

  // Assignments
  getAssignments_byDate(date, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_assignment/' + date + '/' + section_id);
  }

  getAssignments(lession_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignments/' + lession_id);
  }

  getAssignmentsBySection(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignments_by_section/' + section_id);
  }

  addAssignment(data, section_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/assignments/' + section_id, data)
  }

  editAssignment(data, assignment_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_assignments/' + assignment_id, data)
  }

  deleteAssignment(assignment_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_assignments/' + assignment_id, this.empty_data)
  }

  // Assignment Marks
  getAssignment_marks(section_id, subject_id, lession_id, assignment_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignment_marksbulk_eval/' + section_id + '/' + subject_id + '/' + lession_id + '/' + assignment_id)
  }

  addAssignment_marks(data, section_id, subject_id, lession_id, assignment_id): Observable<any> {
    console.log(data) 
    var test = {
      "students": data,
    };
    return this.http.post<any>(this.url + '/assignment_marksbulk_eval/' + section_id + '/' + subject_id + '/' + lession_id + '/' + assignment_id, test)
  }

  editAssignment_marks(assignment_result_id, marks): Observable<any> {
    var data = {
      marks: marks
    }
    return this.http.put<any>(this.url + '/edit_assignments_marks/' + assignment_result_id, data)
  }

  // Class Tests
  getClassTests_byDate(section_id, subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/classTests/' + section_id + '/' + subject_id);
  }

  getClassTests(lession_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignments/' + lession_id);
  }

  addClassTest(data, section_id, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/classTests/' + section_id + '/' + subject_id, data);
  }

  editClassTest(data, classTest_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_classTests/' + classTest_id, data)
  }

  deleteClassTest(classTest_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_classTests/' + classTest_id, this.empty_data)
  }

  // ClassTest Marks
  getClassTest_marks(section_id, subject_id, classTest_id): Observable<any> {
    return this.http.get<any>(this.url + '/classTests_marksbulk_eval/' + section_id + '/' + subject_id + '/' + classTest_id)
  }

  addClassTest_marks(data, section_id, subject_id, classTest_id): Observable<any> {
    console.log(data) 
    var test = {
      "students": data,
    };
    return this.http.post<any>(this.url + '/classTests_marksbulk_eval/' + section_id + '/' + subject_id + '/' + classTest_id, test)
  }

  editClassTest_marks(classTest_result_id, marks): Observable<any> {
    var data = {
      marks: marks
    }
    return this.http.put<any>(this.url + '/edit_classTests_marks/' + classTest_result_id, data)
  }

  // Project Works
  getProjectworks(section_id, subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/projectworks/' + section_id + '/' + subject_id + '/' + this.school_id);
  }

  assignProjectwork(data, section_id, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/projectworks/' + section_id + '/' + subject_id + '/' + this.school_id, data);
  }

  editProjectwork(data, projectwork_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_projectworks/' + projectwork_id, data)
  }

  deleteProjectwork(projectwork_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_projectworks/' + projectwork_id, this.empty_data)
  }

  // Projectwork Marks
  getProjectwork_marks(section_id, subject_id, projectwork_id): Observable<any> {
    console.log(projectwork_id)
    return this.http.get<any>(this.url + '/projectworks_marksbulk_eval/' + section_id + '/' + subject_id + '/' + projectwork_id)
  }

  addProjectwork_marks(data, section_id, subject_id, projectwork_id): Observable<any> {
    console.log(data) 
    var test = {
      "studentprojectworkMarks": data,
    };
    return this.http.post<any>(this.url + '/projectworks_marksbulk_eval/' + section_id + '/' + subject_id + '/' + projectwork_id, test)
  }

  editProjectwork_marks(projectwork_result_id, marks): Observable<any> {
    var data = {
      marks: marks
    }
    return this.http.put<any>(this.url + '/edit_projectworks_marks/' + projectwork_result_id, data)
  }

  // Reports
  getAssignmentreports(subject_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assignment_marks_by_subject_id/' + subject_id + '/' + section_id)
  }

  getClasstestsreports(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_classTests_marks_by_section_id/' + section_id)
  }

  getProjectworkreports(subject_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assignment_marks_by_subject_id/' + subject_id + '/' + section_id)
  }

}
