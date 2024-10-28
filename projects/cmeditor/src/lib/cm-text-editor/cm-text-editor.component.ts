import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToolbarConfigType } from '../toolbar-config-type';

@Component({
  selector: 'cm-text-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cm-text-editor.component.html',
  styleUrl: './cm-text-editor.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CMTextEditorComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None // Add this line

})
export class CMTextEditorComponent implements ControlValueAccessor {
  @Input() customToolbar!: ToolbarConfigType;
  @Input() customStyleSheet: string = '';
  // @Input() textInputStyle: { [key: string]: string } = {};
  // @Input() containerStyle: { [key: string]: string } = {};
  // @Input() buttonStyle: { [key: string]: string } = {};
  // @Input() activeButtonStyles:

  classicToolbar: boolean = true;
  fontList: string[] = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'cursive',
  ];
  fontSizeOptions: number[] = [1, 2, 3, 4, 5, 6, 7];
  doc = document;
  private _value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  private injectStyles() {
    const styleElement = this.renderer.createElement('style');
    this.renderer.appendChild(styleElement, this.renderer.createText(this.customStyleSheet));
    this.renderer.appendChild(this.el.nativeElement, styleElement);
  }

  ngOnInit(): void {
    this.initializer();
    if (this.customToolbar) {
      this.classicToolbar = false;
    }
    if(this.customStyleSheet){
      this.injectStyles();
    }
    this.modifyText('foreColor', false, { value: '#000' });
    document.addEventListener(
      'selectionchange',
      this.updateActiveButtons.bind(this)
    );
  }
  customStyleApplyingFun(){

  }
  initializer() {
    this.highlighter(document.querySelectorAll('.align'), true);
    this.highlighter(document.querySelectorAll('.spacing'), true);
    this.highlighter(document.querySelectorAll('.format'), false);
    this.highlighter(document.querySelectorAll('.script'), true);
  }

  writeValue(value: string): void {
    this._value = value;
    const textInput = document.getElementById('text-input') as HTMLElement;
    if (textInput) {
      textInput.innerHTML = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Call this method when the content of the text area changes
  updateValue() {
    const textInput = document.getElementById('text-input') as HTMLElement;
    if (textInput) {
      this._value = textInput.innerHTML; // Get the current HTML content
      this.onChange(this._value); // Call onChange to propagate the value
    }
  }

  modifyText(command: string, defaultUi: boolean, value: any) {
    const isActive = document.queryCommandState(command);
    if (isActive) {
      document.execCommand(command, defaultUi);
      // console.log('HELLO');
    } else {
      // console.log(value);

      document.execCommand(command, defaultUi, value?.value || null);
    }
    const excluded = [
      'undo',
      'redo',
      'unlink',
      'indent',
      'outdent',
      'backColor',
      'foreColor',
      'createLink',
    ];
    // console.log(!excluded.includes(command));
    if (!excluded.includes(command)) {
      // console.log(!excluded.includes(command));

      this.updateButtonState(command);
    } // Update button state after executing the command
  }

  updateButtonState(command: string) {
    // console.log('updateButtonState : ', command);
    const button = document.querySelector(`button[data-command="${command}"]`);
    if (button) {
      const isActive = document.queryCommandState(command);
      // console.log('isactive : ', isActive);

      if (isActive) {
        // console.log('applying class active');

        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }
  }

  updateActiveButtons() {
    [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'superscript',
      'subscript',
      'insertOrderedList',
      'insertUnorderedList',
      'createLink',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      'insertTable',
    ].forEach((command) => {
      this.updateButtonState(command);
    });
  }

  createLink() {
    const userLink = prompt('Enter a URL');
    // console.log(userLink);

    if (userLink) {
      const formattedLink = /http/i.test(userLink)
        ? userLink
        : `http://${userLink}`;
      this.modifyText('createLink', false, { value: formattedLink });
    }
  }

  highlighter(buttons: NodeListOf<Element>, needsRemoval: boolean) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const alreadyActive = button.classList.contains('active');
        if (needsRemoval) {
          this.removeActive(buttons);
          if (!alreadyActive) {
            button.classList.add('active');
          }
        } else {
          button.classList.toggle('active');
        }
      });
    });
  }

  removeActive(buttons: NodeListOf<Element>) {
    buttons.forEach((button) => {
      button.classList.remove('active');
    });
  }

  insertTable() {
    const rows = prompt('Enter the number of rows:');
    const cols = prompt('Enter the number of columns:');

    if (rows && cols) {
      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';

      for (let i = 0; i < Number(rows); i++) {
        const row = table.insertRow();
        for (let j = 0; j < Number(cols); j++) {
          const cell = row.insertCell();
          cell.style.border = '1px solid #000';
          cell.style.padding = '8px';
          cell.contentEditable = 'true'; // Make cells editable
        }
      }

      // Insert the table at the current cursor position
      const selection = window.getSelection();
      if (selection == null) return;
      const range = selection.getRangeAt(0);
      range.insertNode(table);
    }
  }
}
