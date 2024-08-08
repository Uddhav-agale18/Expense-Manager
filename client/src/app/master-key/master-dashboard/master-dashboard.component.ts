import { Component } from '@angular/core';
import { TypeService } from '../../services/type.service';
import Swal from 'sweetalert2';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../states/reducers/type.reducers';
import { Observable } from 'rxjs';
import * as ETypeActions from '../../states/actions/type.actions';
import { Page } from '../../model/pageModel';
import { Etype } from '../../model/etypeModel';

@Component({
  selector: 'app-master-dashboard',
  templateUrl: './master-dashboard.component.html',
  styleUrl: './master-dashboard.component.css'
})
export class MasterDashboardComponent {
  etype: any;
  edit: boolean = false;
  id: any;
  etypes$: Etype[] = [];
  types$: any;
  page = 1;
  paginationData: Page;


  constructor(private typeService: TypeService, private store: Store<{ etypeReducer: AppState }>) {
    this.store.select(state => state.etypeReducer.etypes).subscribe((data) => {
      this.etypes$ = data.slice(0, 5);
    })
    this.store.select(state => state.etypeReducer.error).subscribe((data) => {
      const error = data?.error?.message
      if (error) {
        this.swalError(error)
      }

    })
    this.store.select(state => state.etypeReducer.page).subscribe((data) => {
      this.paginationData = data;
      console.log(data)
    })
  }

  types: any;

  addType() {
    if (this.edit) {
      let type = {
        id: this.id,
        etype: this.etype
      }

      let id = this.id
      this.store.dispatch(ETypeActions.updateEtype({ id: id, etype: type }))
      this.swalSuccess('Type Updated Success')
      this.id = null;
      this.etype = null;

    }
    if (this.etype != '' && this.edit == false) {
      console.log(this.etype)
      let type = {
        etype: { etype: this.etype }
      }
      this.store.dispatch(ETypeActions.addEtype(type))
      this.swalSuccess("Type Added Successfully")
      this.loadType()
      this.etype = ''
    }
    this.edit = false;
  }

  editType(item: any) {
    this.edit = true;
    this.etype = item.etype;
    this.id = item._id;
    console.log(this.id);
  }

  deleteType(item: any) {
    let id = item._id
    this.store.dispatch(ETypeActions.deleteEtype({ id }))
  }

  loadType(page = 1) {
    this.store.dispatch(ETypeActions.loadEtypes({ page: page }));
  }

  ngOnInit(): void {
    this.loadType()
  }


  swalError(err: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: err,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  swalSuccess(msg: any) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }


  pageEvent(event) {
    this.loadType(event.pageIndex + 1)
  }
}


