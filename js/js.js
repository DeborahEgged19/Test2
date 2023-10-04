//This is the url for all countries
const url = "https://restcountries.com/v3.1/all";
//This is the url for one country
const urlCountry = "https://restcountries.com/v3.1/name/"


let allCountries = [];
let totalPopulation = 0;
var myRegions = {};
var countryList = [];


const showAllcountries = async () => {
    allCountries = await $.get(url);
    insertData()
}


const search = async () => {
    const countName =$("#medina").val();
    allCountries = await $.get(urlCountry+countName);
    insertData();
};

const getData = () => {
  $("#container").html("");
  for (let counter = 0; counter < allCountries.length; counter++) {
    $("#container").append(`
                  <div class="Box">
                      ${allCountries[counter].name.common}<br/>
                      ${allCountries[counter].population}<br/>
                  </div>
              `);
    totalPopulation += allCountries[counter].population;
    //console.log(allCountries[counter].region);
    //check if the data inside the object literal is null
    if (myRegions[allCountries[counter].region] == null) {
      //if it's null, it's new region, and we can set the number to 1, since it's the first one
      myRegions[allCountries[counter].region] = 1;
    } else {
      //the region already exists in the literal object, therefor , we can add 1 to count it.
      myRegions[allCountries[counter].region] += 1;
    }
  }
  $("#totalContries").html(countries);
  $("#total").html(totalPopulation);
  $("#average").html(totalPopulation/countries);
  console.log(myRegions);
  makeVerTable();
};

const makeVerTable = () => {
  let tableVer = "<table style='margin:auto;'>";

  for (singleRegion in myRegions) {
    tableVer += `<tr><td><b>${singleRegion}</b></td><td>${myRegions[singleRegion]}</td></tr>`;
  }
  tableVer += "</table>";
  $("#tableVer").html(tableVer);
};

const insertData = () => {
    myRegions = {};
    //const tableData = document.getElementById("countryList");
    totalPopulation=0;
    var myHTML = "<table>";
    allCountries.map((item) => {
      myHTML += `
          <tr>
              <td>${item.name.common}</td>
              <td>${item.population}</td>
          </tr>
      `;
      totalPopulation+=item.population;
      if (myRegions[item.region] == null) {
        //if it's null, it's new region, and we can set the number to 1, since it's the first one
        myRegions[item.region] = 1;
      } else {
        //the region already exists in the literal object, therefor , we can add 1 to count it.
        myRegions[item.region] += 1;
      }
    });
    myHTML+="</table>";
    //tableData.innerHTML = myHTML;
    $("#countryList").html(myHTML);
    $("#totalContries").html(allCountries.length);
    $("#total").html(totalPopulation);
    $("#average").html(totalPopulation/allCountries.length);
    makeVerTable();
}

