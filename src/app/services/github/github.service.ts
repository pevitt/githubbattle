import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
// import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  githubUrl: string;
  apiUrl: string;
  constructor(private http:HttpClient, 
              public afAuth: AngularFireAuth) {
    this.githubUrl = environment.githubUrl;
    this.apiUrl = environment.apiUrl;
  }

  getUser(username){
    const concatUrl = `${this.githubUrl}users/${username}`;
    return this.http.get<User>(concatUrl);
  }

  getUsers(query){
    const concatUrl = `${this.githubUrl}search/users?q=${query}`;
    return this.http.get(concatUrl);
  }

  getToken(){
		return JSON.parse(localStorage.getItem("github.token"));
  }
  isLogin(){
    return false;
  }
  getOwnUser(){
    return JSON.parse(localStorage.getItem('github.profile'));
  }

  loginGithub(){
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }
  resultFight(data){
    const token = this.getToken();
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const headersHttp  = {headers: headers};
    const url = `${this.apiUrl}fight/`;
    return this.http.post(url, data);
  }
}