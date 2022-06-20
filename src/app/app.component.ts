import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import readXlsxFile from 'read-excel-file'

import { jsPDF } from "jspdf";

import { ngxCsv } from 'ngx-csv/ngx-csv';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uploadfile';

  listData: any = []

  @ViewChild("content", { static: false }) el!: ElementRef;


  excelRead(e: any) {
    let fileReader: any
    fileReader = e.target.files[0];
    let type = e.target.files[0].name.split('.').pop();

    this.listData = []

    const schema = {
      'ID': {
        prop: 'ID',
        type: String,
        required: false
      },

      'Name': {
        prop: 'Name',
        type: String,
        required: false
      },

      'Last Name': {
        prop: 'LastName',
        type: String,
        required: false
      },

      'email': {
        prop: 'email',
        type: String,
        required: false
      },

      'Phone Number': {
        prop: 'PhoneNumber',
        type: String,
        required: false
      }
    };

    readXlsxFile(e.target.files[0], { schema }).then((data) => {

      // this.excelData=data.rows

      // this.column = Object.keys(this.excelData[0])
      // console.log(this.column)

      if (data.rows) {

        for (let v of data.rows)
         {
          this.listData.push(v);
        }
      }
      console.log(this.listData)
      console.log(data)

    })

  }

  excel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      // noDownload: true,
      headers: ["ID", "Name", "Last Name", "email", "Phone Number"]
    };
    console.log(this.listData);
    new ngxCsv(this.listData, "Report", options);

  }

  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("listData.pdf")
        console.log(this.listData)

      }
    })
  }
}

