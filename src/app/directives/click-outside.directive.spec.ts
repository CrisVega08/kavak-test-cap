import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectivesModule } from './directives.module';

@Component({
  template: `
    <div class="parent">
      <div class="child" appClickOutside (clickOutside)="log()">click me!</div>
      <div class="sibling">click me!</div>
    </div>
  `,
})
class TestComponent {
  log() {}
}

describe('appClickOutside', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [DirectivesModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call log when click outside', () => {
    const spy = jest.spyOn(component, 'log');
    fixture.detectChanges();
    const sibling: HTMLElement =
      fixture.nativeElement.querySelector('.sibling');
    const siblingDb: HTMLElement =
      element.nativeElement.querySelector('.sibling');

    siblingDb.click();
    sibling.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should not call log when click inside', () => {
    const spy = jest.spyOn(component, 'log');
    fixture.detectChanges();
    const child: HTMLElement = fixture.nativeElement.querySelector('.child');
    child.click();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
  });
});
