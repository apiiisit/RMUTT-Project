import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Docs } from 'src/app/interface/doc';
import { AlertService } from 'src/app/service/alert.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormService } from 'src/app/service/form.service';
import { RmuttService } from 'src/app/service/rmutt.service';

@Component({
  selector: 'app-manage-document',
  templateUrl: './manage-document.component.html',
  styleUrls: ['./manage-document.component.scss']
})
export class ManageDocumentComponent {

  docList: TreeNode[] = [];
  dialogDocId!: number;

  constructor(
    private rmuttService: RmuttService,
    public formService: FormService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.docList.push(
      {
        label: 'ตรวจสอบรูปภาพบัณฑิต',
        collapsedIcon: "pi pi-file"
      },
      {
        label: 'ตรวจสอบเอกสารทั้งหมด',
        collapsedIcon: "pi pi-file"
      }
    );

    this.rmuttService.getDocList().subscribe({
      next: (res) => {

        for (let data of res.data) {
          this.docList.push(
            {
              label: data.name,
              data: data.id,
              expandedIcon: "pi pi-folder-open",
              collapsedIcon: "pi pi-folder",
              children: [
                {
                  label: 'ตรวจสอบ',
                  icon: 'pi pi-calendar'
                },
                {
                  label: 'ดูรายชื่อบัณฑิต',
                  icon: 'pi pi-search'
                },
                {
                  label: 'แก้ไขชื่อเอกสาร',
                  icon: 'pi pi-pencil'
                },
                {
                  label: 'ลบรายการเอกสาร',
                  icon: 'pi pi-trash'
                }
              ]
            }
          );
        }

      }
    });
  }

  openDialog(mode: string, docid?: number, name?: any) {

    this.formService.docForm.setValue({ name: null });

    if (name) this.formService.docForm.setValue({ name });
    if (docid) this.dialogDocId = docid;
    this.formService.mode = mode;
    this.dialogService.docDialog = true;
  }

  nodeSelect(event: any) {
    const docId = event.node.parent?.data;
    const docName = event.node.parent?.label;
    const menuName = event.node.label;
    
    if (!docId && menuName === 'ตรวจสอบรูปภาพบัณฑิต') return this.router.navigate(['admin', 'verify', 'document'], { state: { docName: 'รูปภาพบัณฑิต', mode: 'photo' } });
    if (!docId && menuName === 'ตรวจสอบเอกสารทั้งหมด') return this.router.navigate(['admin', 'verify', 'document'], { state: { docName: 'เอกสารทั้งหมด', mode: 'allfile' } });

    if (menuName === 'ตรวจสอบ') return this.router.navigate(['admin', 'verify', 'document', docId], { state: { docName, mode: 'file' } });
    if (menuName === 'ดูรายชื่อบัณฑิต') return this.router.navigate(['admin', 'verify', 'document', 'stdlist', docId], { state: { docName } });
    if (menuName === 'แก้ไขชื่อเอกสาร') return this.openDialog('edit', docId, docName);
    if (menuName === 'ลบรายการเอกสาร') return this.delDoc(docId);
  }

  delDoc(id: number) {
    this.alertService.sweetalertConfirm('คุณต้องการลบรายการเอกสารหรือไม่?').then((result) => {
      if (result.isConfirmed) {
        this.rmuttService.delDoc(id).subscribe({
          complete: () => {
            this.alertService.sweetalertTime('success', 'ลบรายการเอกสารสำเร็จ').then(() => {
              window.location.reload();
            });
          },
          error: () => {
            this.alertService.sweetalert('error', 'มีบางอย่างผิดพลาด');
          }
        });
      }
    });
  }




}
