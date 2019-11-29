<template>
  <div class="text-center">
    <v-pagination v-model="page" :length="6">
      <div>
        <div>a</div>
      </div>
    </v-pagination>

    <div id="source-html">
      <h1>
        <center>Artificial Intelligence</center>
      </h1>
      <h2>Overview</h2>
      <h1>{{test}}</h1>
      <p>
        Artificial Intelligence(AI) is an emerging technology
        demonstrating machine intelligence. The sub studies like
        <u>
          <i>
            Neural
            Networks
          </i>,
          <i>Robatics</i> or
          <i>Machine Learning</i>
        </u>
        are
        the parts of AI. This technology is expected to be a prime part
        of the real world in all levels.
      </p>
    </div>
    <div class="content-footer">
      <button id="btn-export" v-on:click="exportHTML()">
        Export to
        word doc
      </button>
    <table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
  </tr>
  <tr>
    <td>Lois</td>
    <td>Griffin</td>
  </tr>
</table>
<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>
  <tr>
    <td>Peter</td>
    <td>Griffin</td>
  </tr>
  <tr>
    <td>Lois</td>
    <td>Griffin</td>
  </tr>
</table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      page: 1,
      test: ""
    };
  },
  methods: {
    exportHTML() {
      var header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
      var footer = "</body></html>";
      var sourceHTML =
        header + document.getElementById("source-html").innerHTML + footer;

      var source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(sourceHTML);
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "document.doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
      this.test = "kjbjebdbediedfefdjbiubieufe";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table, td, th {
  border: 1px solid black;
}
</style>
