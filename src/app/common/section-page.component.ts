import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent {
  @Input() titleSectionCommon: string;
}
