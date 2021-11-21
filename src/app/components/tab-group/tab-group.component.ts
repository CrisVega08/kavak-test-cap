import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent {
  @Input() tabs: string[] = [];
  @Output() changeTab = new EventEmitter<string>();
  currentTab!: string;
  position = 0;

  setTab(newTab: string) {
    setTimeout(() => {
      const idx = this.tabs.findIndex((tab) => tab === newTab);
      const percent = 100 / this.tabs.length;
      this.position = percent * idx;
      this.changeTab.emit(newTab);
    }, 100);
  }
}
