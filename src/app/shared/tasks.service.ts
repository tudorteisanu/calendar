import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  type?: string;
  description?: string;
  project?: string | number;
  title: string;
  date: string;
  start: string;
  end: string;
  expected: string;
  duration: string;
}

interface CreateResponse {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  static url = 'https://organizer-694ad.firebaseio.com/tasks';
  db_url = 'https://organizer-694ad.firebaseio.com';
  showModal = false;

  tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TaskService.url}/${task.date}.json`, task)
      .pipe(
        map((res) => {
          return { ...task, id: res.name };
        })
      );
  }

  load(date: moment.Moment): Observable<Task[]> {
    console.log('looooaaaaaaaaaaaaad');

    return this.http
      .get<Task[]>(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks: any) => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key) => ({ ...tasks[key], id: key }));
        })
      );
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(
      `${TaskService.url}/${task.date}/${task.id}.json`
    );
  }

  close() {
    this.showModal = false;
  }

  open() {
    this.showModal = true;
  }

  async getProjects(): Promise<any> {
    // return await this.http.get(environment.url + '/project').toPromise()
    return new Promise((resolve) =>
      resolve([...new Array(23)].map((item) => ({ name: `item ${item}` })))
    );
  }
}
