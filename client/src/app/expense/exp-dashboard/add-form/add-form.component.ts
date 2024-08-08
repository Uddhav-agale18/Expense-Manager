import { TypeService } from './../../../services/type.service';
import { ofType } from '@ngrx/effects';
import { Component, inject, Input, TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseService } from '../../../services/expense.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ExpState } from '../../../states/reducers/expense.reducers';
import * as expenseActions from '../../../states/actions/expense.actions'
import { Expense } from '../../../model/expenseModel';
import * as ETypeActions from '../../../states/actions/type.actions'


@Component({
	selector: 'app-add-form',
	templateUrl: './add-form.component.html',
	styleUrl: './add-form.component.css'
})
export class AddFormComponent {

	private modalService = inject(NgbModal);
	closeResult = '';
	form: FormGroup = new FormGroup({})
	etypes: any;

	@Input()
	selectedExpense: Expense = null
	date: string;

	constructor(private typeService: TypeService, private store: Store<{ expReducer: ExpState }>) {

	}

	ngOnInit(): void {
		this.loadType()

		this.form = new FormGroup({
			etype: new FormControl('', Validators.required),
			title: new FormControl('', Validators.required),
			desc: new FormControl('', Validators.required),
			date: new FormControl('', Validators.required),
			amount: new FormControl('', Validators.required),
			tags: new FormArray([])
		})

		if (this.selectedExpense) {

			const tagsArray = this.form.get('tags') as FormArray;
			tagsArray.clear(); // Clear existing tags

			// Add tags to the FormArray
			if (this.selectedExpense.tags) {
				this.selectedExpense.tags.forEach((tag: { key: string; value: string }) => {
					tagsArray.push(new FormGroup({
						key: new FormControl(tag.key),
						value: new FormControl(tag.value)
					}));
				});
			}
			this.form.patchValue({
				etype: this.selectedExpense?.etype,
				title: this.selectedExpense?.title,
				desc: this.selectedExpense?.desc,
				date: this.selectedExpense?.date,
				amount: this.selectedExpense?.amount,
				//tags:tagsArray.controls
			})
		}
	}



	get tags(): FormArray {
		return this.form.get('tags') as FormArray;
	}

	addTag(): void {
		const tagForm = new FormGroup({
			key: new FormControl('', Validators.required),
			value: new FormControl('', Validators.required)
		});
		this.tags.push(tagForm);
	}

	removeTag(index: number): void {
		this.tags.removeAt(index);
	}

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.form.reset()
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	onSubmit(activeModal: NgbActiveModal) {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
		} else {
			if (this.selectedExpense) {
				let expense: Expense = this.form.value
				let id = this.selectedExpense._id
				this.store.dispatch(expenseActions.updateExpense({ id: id, expense: expense }))
				activeModal.close();
				this.selectedExpense = null;
			} else {
				console.log(this.form.value);
				let expense: Expense = this.form.value
				this.store.dispatch(expenseActions.addExpense({ expense }))
				activeModal.close();
			}

		}
		this.form.reset()
	}


	loadType(page = 1) {
		this.typeService.getAllTypes(0).subscribe({
			next: (value) => {
				this.etypes = value
			},
			error: (err) => {
				console.log(err);

			}
		})
	}


















	// private getDismissReason(reason: any): string {
	// 	switch (reason) {
	// 		case ModalDismissReasons.ESC:
	// 			return 'by pressing ESC';
	// 		case ModalDismissReasons.BACKDROP_CLICK:
	// 			return 'by clicking on a backdrop';
	// 		default:
	// 			return `with: ${reason}`;
	// 	}
	// }

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

}
