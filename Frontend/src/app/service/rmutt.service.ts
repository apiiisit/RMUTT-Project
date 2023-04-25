import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '../interface/dashboard';
import { DetailEvent } from '../interface/detailEvent';
import { Doc } from '../interface/doc';
import { DocVerify } from '../interface/docVerify';
import { Event, Events } from '../interface/event';
import { EventCheck } from '../interface/eventCheck';
import { EventScan } from '../interface/eventScan';
import { HistoryEvent } from '../interface/historyEvent';
import { Setting, Settings } from '../interface/settings';
import { Std, Stds } from '../interface/std';
import { Upload } from '../interface/upload';
import { AuthService } from './auth.service';
import { Pointi } from '../interface/point';
import { PhotoVerify } from '../interface/photoVerify';

@Injectable({
  providedIn: 'root'
})
export class RmuttService {

  get header() {
    return { authorization: 'Bearer ' + this.authService.user!.token };
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // settings
  settings() {
    return this.http.get<Setting>('api');
  }

  updateSetting(setting: Settings) {
    return this.http.post('api/admin/settings', setting, {
      headers: this.header
    });
  }

  //event
  getEventById(eventid: number) {
    return this.http.get<any>(`api/admin/event/${eventid}/list`, {
      headers: this.header
    });
  }

  getEventName() {
    return this.http.get<Event>('api/admin/event', {
      headers: this.header
    });
  }

  addEvent(name: string[]) {
    return this.http.post('api/admin/event/create', name, {
      headers: this.header
    });
  }

  editEvent(event: Events) {
    return this.http.post('api/admin/event/edit', event, {
      headers: this.header
    });
  }

  deleteEvent(eventid: string) {
    return this.http.delete('api/admin/event/delete', {
      headers: this.header,
      body: { eventid }
    });
  }

  // point
  getAllPointByEventId(eventid: string) {
    return this.http.get<Pointi>(`api/admin/event/${eventid}/list`, {
      headers: this.header
    });
  }

  addPoint(data: any) {
    return this.http.post('api/admin/point/create', data, {
      headers: this.header
    });
  }

  editPoint(data: any) {
    return this.http.post('api/admin/point/edit', data, {
      headers: this.header
    });
  }

  delPoint(pointid: number) {
    return this.http.delete('api/admin/point/delete', {
      headers: this.header,
      body: { pointid }
    });
  }

  getLogScanPoint(pointid: number) {
    return this.http.get<any>(`api/admin/point/${pointid}/list`, {
      headers: this.header
    });
  }

  // scan
  pointScan(tag: string, pointid: number) {
    return this.http.post<EventScan>('api/admin/point/scan', { tag, pointid }, {
      headers: this.header
    });
  }

  getScanById(stdId: string) {
    return this.http.get(`api/admin/scan/${stdId}`, {
      headers: this.header
    });
  }

  deleteEventScan(eventid: number, studentId: string) {
    return this.http.delete('api/admin/scan/delete', {
      headers: this.header,
      body: { eventid, studentId }
    });
  }

  // user
  getDetail() {
    return this.http.get<Std>('api/user', {
      headers: this.header
    });
  }

  getUploadTask() {
    return this.http.get<Upload>('api/user/uploadtask', {
      headers: this.header
    });
  }

  getHistoryEventCheck() {
    return this.http.get<any>('api/user/checkpass', {
      headers: this.header
    });
  }

  getHistoryEventCheckById(stdId: string) {
    return this.http.get<any>(`api/admin/students/checkpass/${stdId}`, {
      headers: this.header
    });
  }

  getCheckuploadById(stdId: string) {
    return this.http.get<any>(`api/admin/students/checkupload/${stdId}`, {
      headers: this.header
    });
  }

  // admin
  getDashboard() {
    return this.http.get<Dashboard>('api/admin/dashboard', {
      headers: this.header
    });
  }

  scanRFiD(tag: string) {
    return this.http.get<Std>(`api/admin/scan/rfid/${tag}`, {
      headers: this.header
    });
  }

  getStdAll() {
    return this.http.get<Std>('api/admin/students', {
      headers: this.header
    });
  }

  getStdById(id: string) {
    return this.http.get<Std>(`api/admin/students/${id}`, {
      headers: this.header
    });
  }

  addStd(std: Stds[]) {
    return this.http.post('api/admin/students/add', std, {
      headers: this.header
    });
  }

  editStd(stdObj: Stds) {
    return this.http.post(`api/admin/students/update`, stdObj, {
      headers: this.header
    });
  }

  deleteStd(stdId: Object[]) {
    return this.http.delete('api/admin/students/delete', {
      headers: this.header,
      body: stdId
    });
  }

  addRFiD(id: string, tag: string) {
    return this.http.post('api/admin/students/setrfid', { id, rfid: tag }, {
      headers: this.header
    });
  }

  // verify doc
  getStdInDoc(docid: number) {
    return this.http.get<any>(`api/admin/doc/list/${docid}`, {
      headers: this.header
    });
  }
  
  getDocList() {
    return this.http.get<Doc>('api/admin/doc/list', {
      headers: this.header
    });
  }

  getPhotoList() {
    return this.http.get<PhotoVerify>('api/admin/doc/getphotolist', {
      headers: this.header
    });
  }

  getFileAllVerify() {
    return this.http.get<DocVerify>('api/admin/doc/getdoclist', {
      headers: this.header
    });
  }

  getFileVerifyInDoc(id: number) {
    return this.http.get<DocVerify>(`api/admin/doc/getdoclist/${id}`, {
      headers: this.header
    });
  }

  addDoc(name: string) {
    return this.http.post('api/admin/doc/create', [name], {
      headers: this.header
    });
  }

  editDoc(documentsId: number, name: string) {
    return this.http.post('api/admin/doc/edit', { documentsId, name }, {
      headers: this.header
    });
  }

  delDoc(documentsId: number) {
    return this.http.delete('api/admin/doc/delete', {
      headers: this.header,
      body: { documentsId }
    });
  }

  getDocAll() {
    return this.http.get<Std>('api/admin/doc/getlist', {
      headers: this.header
    });
  }

  verifyDoc(docObj: Stds) {
    return this.http.post('api/admin/doc/verify', docObj, {
      headers: this.header
    });
  }

  verifyFile(data: any) {
    return this.http.post('api/admin/doc/verifyfile', data, {
      headers: this.header
    });
  }

  verifyPhoto(data: any) {
    return this.http.post('api/admin/doc/verifyphoto', data, {
      headers: this.header
    });
  }

}
