import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CMTextEditorComponent, ToolbarConfigType } from 'cm-text_editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CMTextEditorComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CMEditorProject';
  data = `
    <h1 style="text-align: center;">
    <b>CM Text Editor</b></h1>
    <div><br></div>Hello There I'm Using <b>CM Text Editor</b>!&nbsp;
    <div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <b>CM Text Editor</b> is a rich text editor for Angular applications, o
    ffering a simple yet powerful interface. It's open source and free to use, 
    making it accessible to everyone. This library is designed to provide 
    easy integration, full customization options, 
    and seamless two-way data binding.</div>
  `;
  customToolbar: ToolbarConfigType = {
    bold: true,
    italic: true,
  };
  textInputStyle = {
    'background-color': 'grey',
    color: 'white',
  };
  containerStyles = {
    background: 'black',
    color: 'red',
  };
  buttonStyles = {
    background: 'red',
  };
  activeButtonStyles = {
    background: 'green',
  };
  customStyleSheet = `
                        .active{
                          background: green !important;
                        }
                        .options button{
                          background: red ;
                        }
                        .container{
                          background-color: black;
                          color: red;
                        }
                        #text-input{
                          background-color : grey;
                          color: white;
                        }
  `;
}
