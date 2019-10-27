
<template >
  <div>
    <v-container fluid>
      <v-row align="center">
       
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            :items="exams"
            label="Select Examination"
            dense
            v-model="exam"
          ></v-select>
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
             <v-text-field
            label="Enter Examination Year"
            v-model="examyear"
          ></v-text-field>
          </v-col>
      </v-row>
    </v-container>
   
    <div style="margin:20px">
      <v-alert
        type="info"
      >Please Enter the Names of the Subjects in the order they Appear on the Excel Sheets and as they would be printed out!!</v-alert>
    </div>

    <v-container>
      <v-row align="center" fluid>
        <v-col class="d-flex flex-wrap" cols="12" sm="12">
          <v-text-field
            style="margin-left:10px"
            v-for="(n,index) in subjectsNo"
            :key="index"
            v-model="pricing.name[index]"
            color="info"
            outline
            validate-on-blur
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- <div
      v-for="(n, index) in subjectsNo"
      v-bind:key="n.key"
      v-if="uploaded"
    >{{subs[0][index][index]}} see</div> -->

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

    <div v-for="(n) in subjectsNo" v-bind:key="n.key" v-if="uploaded">
      <div v-for="(data, index) in datas" v-bind:key="data.key">
        <div>
          <div class="table-div" v-if="uploaded">
            <table
              style="width:45%"
              v-for="test in (Math.ceil(subject1[index]/50 ))"
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
                        <div style="margin:20px">National Business and Technical Examinations Board (NABTEB) </div>
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
              <tr>
                <th>No. Of copies</th>
                <td>{{subs[0][0][index]}}</td>
              </tr>
              <tr v-if="subs[0][0][index] > 50">
                <th>Pack</th>
                <td>{{test}} of</td>
              </tr>
              <tr v-else>
                <th>Pack</th>
                <td>{{test}} of</td>
              </tr>
            </table>
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
      subjectsNo: "",
      subjectNames: {},
      docketNum: "",
      remainingCopies: 0,
      copiesPerDocket: "",
      subject1: [],
      subject2: [],
      subject3: [],
      subject4: [],
      subject5: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      exams: ["Neco", "Nabteb", "Waec"],
      exam: "",
      examyear:'',
      pricing: {
        name: []
      }
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

          // console.log(XL_row_object[x], "x");
          if (this.subject1[i] > 50) {
            this.docketNum = Math.ceil(this.subject1[i] / 50) + 1;
            this.remainingCopies = this.subject1[i] % 50;
            this.datas = XL_row_object;

            console.log(this.subject1[i]);
          } else {
            this.datas = XL_row_object;
          }
        }
        let subs = [this.subject1, this.subject2, this.subject3];
        console.log(subs, "subs");
        console.log(this.datas);
        this.subs.push(subs);

        this.uploaded = true;

        //  console.log(ages);
        // console.log(this.subject1, this.subject2);
      }
    },
    uploadForm() {},

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

<style  scoped>
.table-div {
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background-color: cyan;
}
img {
  width: 150px;
}
</style>