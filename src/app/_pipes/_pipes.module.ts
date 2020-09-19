import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { PaginationPipe } from './pagination.pipe';

@NgModule({
  declarations: [SearchPipe, PaginationPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchPipe,
    PaginationPipe
  ]
})
export class PipesModule { }
