import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueSearchPage } from './league-search.page';

describe('LeagueSearchPage', () => {
  let component: LeagueSearchPage;
  let fixture: ComponentFixture<LeagueSearchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeagueSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
