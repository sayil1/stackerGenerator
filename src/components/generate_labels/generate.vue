<style  scoped src='./gen.css'>
</style>
<template >
  <div>
    <v-container fluid>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select :items="exams" label="Select Examination" dense v-model="exam"></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            :items="items"
            label="Select the number of subjects as contained in the sheets"
            dense
            v-model="subjectsNo"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="4">
          <v-text-field label="Enter Examination Year" v-model="examyear"></v-text-field>
        </v-col>
        <!-- <v-col class="d-flex" cols="12" sm="3">
          <v-select :items="items" label="Select the number of Sections" dense v-model="subjectsNo"></v-select>
        </v-col>-->
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="omrplus" label="Add or remove OMR" v-model="omrplus_" dense></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="sheetsPerDoc" label="Sheets Per Docket" v-model="sheetsPerDoc_" dense></v-select>
        </v-col>
      </v-row>
    </v-container>

    <div style="margin:20px">
      <v-alert
        text
        outlined
        color="blue"
        type="info"
      >Please Enter the Names of the Subjects in the order they Appear on the Excel Sheets and as they would be printed out!!</v-alert>
    </div>

    <v-container>
      <v-row align="center" fluid>
        <v-col class="d-flex flex-wrap" cols="12" sm="3" v-for="(n,index) in subjectsNo">
          <v-card class="mx-auto" max-width="344" color="blue lighten-5" hover p-3>
            <v-text-field
              placeholder="Enter Subject Name"
              style="padding:10px"
              :key="index"
              v-model="pricing.name[index]"
              color="info"
              outline
              validate-on-blur
            />
            <br />
            <v-select
              style="padding-left:10px; padding-right:10px"
              :items="section"
              label="Select the number of Sections"
              dense
              v-model="pricing.section[index]"
            ></v-select>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- <div
      v-for="(n, index) in subjectsNo"
      v-bind:key="n.key"
      v-if="uploaded"
    >{{subs[0][index][index]}} see</div>-->
<div class="buttons">
   <div style="margin-right:20px; margin-left:20px">
      <label for="fileUploader" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i>Upload Excel Sheet
      </label> 
      <input
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
        v-on:change="generate"
      />
    </div>

    <div class="text-center">
      <v-btn rounded color="primary" v-on:click="print('print')" dark>Print</v-btn>
    </div>

</div>
   

    <div id="print">
      <div v-for="(n) in subjectsNo" v-bind:key="n.key" v-if="uploaded">
        <div v-for="(data, index) in datas" v-bind:key="data.key">
          <div v-if="subs[0][0][index]>0" >
            <div  v-if="uploaded"  >
              <table
               
                v-for="(test) in (Math.ceil(subs[0][0][index]/sheetsPerDoc_))"
                v-bind:key="test.key"

              >
                <td colspan="2" v-if="exam == 'Neco'">
                  <div>
                    <v-container class="grey lighten-5">
                      <v-row no-gutters>
                        <v-col cols="12" sm="4">
                          <img src="../../assets/neco.jpeg" alt srcset />
                        </v-col>
                        <v-col cols="12" sm="8">
                          <div style="margin:20px">National Examination Council (NECO)</div>
                          <div style="margin:20px">{{examyear}}</div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </td>
                <td colspan="2" v-if="exam == 'Nabteb'">
                  <div>
                    <v-container class="grey lighten-5">
                      <v-row no-gutters>
                        <v-col cols="12" sm="4">
                          <img src="../../assets/nabteb.jpeg" alt srcset />
                        </v-col>
                        <v-col cols="12" sm="8">
                          <div
                            style="margin:20px"
                          >National Business and Technical Examinations Board (NABTEB)</div>
                          <div style="margin:20px">{{examyear}}</div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </td>
                <td colspan="2" v-if="exam == 'Waec'">
                  <div>
                    <v-container class="grey lighten-5">
                      <v-row no-gutters>
                        <v-col cols="12" sm="4">
                          <img src="../../assets/waec.jpeg" alt srcset />
                        </v-col>
                        <v-col cols="12" sm="8">
                          <div style="margin:20px">West African Examinations Council (WAEC)</div>
                          <div style="margin:20px">{{examyear}}</div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </td>
                <tr>
                  <th>State:</th>
                  <td>{{data.state}}</td>
                </tr>
                <tr>
                  <th>Custodian Name:</th>
                  <td>{{data.sch_name}}</td>
                </tr>
                <tr>
                  <th>Custodian NO</th>
                  <td>{{data.cust_code}}</td>
                </tr>
                <tr>
                  <th>SCH/Center NO</th>
                  <td>{{data.schnum}}</td>
                </tr>
                <tr>
                  <th>Subject/papper Name</th>
                  <td>{{pricing.name[n-1]}}</td>
                </tr>
                <tr v-if="subs[0][0][index]<sheetsPerDoc_">
                  <th>No. Of copies</th>
                  <td>{{subs[0][0][index]}}</td>
                </tr>
                <tr v-else>
                  <th>No. Of copies</th>
                  <td
                    v-if="test == (Math.ceil(subs[0][0][index]/sheetsPerDoc_ ))"
                  >{{subs[0][0][index]%sheetsPerDoc_}}</td>
                  <td v-else>{{sheetsPerDoc_}}</td>
                </tr>

                <tr>
                  <th>OMR</th>

                  <td v-if="test == (Math.ceil(subs[0][0][index]/sheetsPerDoc_))">
                    <div
                      v-if="!pricing.section[n-1]"
                    >{{(1*(subs[0][0][index]%sheetsPerDoc_))+omrplus_}}</div>
                    <div
                      v-else
                    >{{(pricing.section[n-1]*(subs[0][0][index]%sheetsPerDoc_ ))+omrplus_}}</div>
                  </td>

                  <td v-else>
                    <div v-if="!pricing.section[n-1]">{{sheetsPerDoc_+omrplus_}}</div>
                    <div v-else>{{(pricing.section[n-1]*sheetsPerDoc_)+omr_}}</div>
                  </td>
                </tr>
                <tr>
                  <th>Pack</th>
                  <td>{{test}} of {{Math.ceil(subs[0][0][index]/sheetsPerDoc_)}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <label id="jsonObject"> JSON : </label> -->
  </div>
</template>
<script lang="javascript" src="dist/xlsx.full.min.js"></script>
<script>
// import XLSX from "./js/xlsx.full.min.js";
import XLSX from "xlsx";
export default {
  data() {
    return {
      subs: [],
      datas: "",
      tester: "see me?",
      uploaded: false,
      subjectsNo: 1,
      subjectNames: {},
      // docketNum: "",
      remainingCopies: 0,
      copiesPerDocket: "",
      subject1: [],
      subject2: [],
      subject3: [],
      subject4: [],
      subject5: [],
      subject6: [],
      subject7: [],
      subject8: [],
      subject9: [],
      subject10: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      omrplus: [-5, -4, -3, -2, -1, +0, +1, +2, +3, +4, +5],
      omrplus_: 0,
      sheetsPerDoc: [50, 60, 70, 80, 90, 100, 110, 120],
      sheetsPerDoc_: 50,
      exams: ["Neco", "Nabteb", "Waec"],
      exam: "",
      examyear: "",
      section: [1, 2, 3],
      pricing: {
        name: [],
        section: []
      },
      isActive: false
    };
  },
  methods: {
    loader(event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary"
      });
      // loop through the uploaded files
      for (let i = 0; i < workbook.SheetNames.length; i++) {
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[workbook.SheetNames[i]]
        );
        for (let i = 0; i < XL_row_object.length; i++) {
          // console.log(Object.values(a[i])[2])
          let subject1 = parseInt(Object.values(XL_row_object[i])[7], 10);
          this.subject1.push(subject1);
          let subject2 = parseInt(Object.values(XL_row_object[i])[8], 10);
          this.subject2.push(subject2);
          let subject3 = parseInt(Object.values(XL_row_object[i])[9], 10);
          this.subject3.push(subject3);
          let subject4 = parseInt(Object.values(XL_row_object[i])[10], 10);
          this.subject4.push(subject4);
          let subject5 = parseInt(Object.values(XL_row_object[i])[11], 10);
          this.subject5.push(subject5);
          let subject6 = parseInt(Object.values(XL_row_object[i])[12], 10);
          this.subject5.push(subject6);
          let subject7 = parseInt(Object.values(XL_row_object[i])[13], 10);
          this.subject7.push(subject7);
          let subject8 = parseInt(Object.values(XL_row_object[i])[14], 10);
          this.subject8.push(subject8);
          let subject9 = parseInt(Object.values(XL_row_object[i])[15], 10);
          this.subject9.push(subject9);
          let subject10 = parseInt(Object.values(XL_row_object[i])[16], 10);
          this.subject5.push(subject10);
        }

        let subs = [
          this.subject1,
          this.subject2,
          this.subject3,
          this.subject4,
          this.subject5,
          this.subject6,
          this.subject7,
          this.subject8,
          this.subject9,
          this.subject10
        ];
        // console.log(subs, "subs");
        // console.log(this.datas);
        this.subs.push(subs);

        this.uploaded = true;
      

        //  console.log(ages);
        // console.log(this.subject1, this.subject2);
        this.datas = XL_row_object;
        console.log(this.datas);
      }
    },
    print(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },

    generate(evt) {
      var selectedFile = evt.target.files[0];
      var reader = new FileReader();
      reader.onload = this.loader;
      reader.onerror = function(event) {
        console.error(
          "File could not be read! Code " + event.target.error.code
        );
      };

      reader.readAsBinaryString(selectedFile);
    }
  },
  computed: {}
};
</script>

