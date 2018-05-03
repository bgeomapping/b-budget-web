import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from '../../services/finance.service';
import { Expense, Transaction } from '../../models';
import { Category, ExpenseMonth } from '../../models';
import { Observable } from 'rxjs/Observable';
import { FilterControlsComponent } from '../../filter-controls/filter-controls.component';
import { NavigationService } from '../../services/navigation.service';
import { PanelBaseComponent } from '../panel-base/panel-base.component'

@Component({
  selector: 'budget-panel-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class PanelExpensesComponent extends PanelBaseComponent implements OnInit {

  expenses: Observable<Expense[]>;
  categories: Observable<Category[]>;
  plannedExpensesTotal: number = 0;
  actualExpensesTotal: number = 0;
  differencesTotal: number = 0;
  selectedTransactions: Transaction[];
  selectedTransactionCategoryName: string;

  @ViewChild(FilterControlsComponent)
  private filterControls: FilterControlsComponent;


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public apiService: FinanceService,
    public navigationService: NavigationService,
    public datePipe: DatePipe
  ) {
    super(route, navigationService);
  }
  ngOnInit() {
    this.resolveRoutes();
    this.categories = this.apiService.getExpenseMonths();
  }

  getData(): void {
    this.expenses = this.apiService.getExpense(this.user, this.year, this.filterControls.activeCategories);
    this.expenses.subscribe(t => {
      this.summarizeExpenses(t);
    });
  }

  summarizeExpenses(expenses: Expense[]) {
    this.plannedExpensesTotal = 0;
    this.actualExpensesTotal = 0;
    this.differencesTotal = 0;
    expenses.forEach(t => {
      this.plannedExpensesTotal += t.plannedExpense;
      this.actualExpensesTotal += t.actualExpense;
      this.differencesTotal += t.difference;
    });
  }


  openTransactionsModal(expense: Expense) {
    if (expense.month) {
      this.router.navigate(['.', { outlets: { transactionsByMonth: [expense.categoryName, expense.month] } }], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['.', { outlets: { transactions: [expense.categoryName] } }], { relativeTo: this.route });
    }
  }

}
