import React, {Component} from 'react';
import axios from 'axios';

class ReactMultiSelect extends Component {

  constructor() {
    super()

    this.state = {
      "data": "",
      "keyLevel1": 0,
      "keyLevel2": 0,
      "keyLevel3": 0,
      "optionMarka": "",
      "optionRodzaj": "",
      "optionType": "",
      "selectLevel1": 0,
      "selectLevel2": 0,
      "selectLevel3": 0
    }
  }

  componentDidMount() {
    let self = this;
    axios
      .get('http://sklep.ambrozy.com.pl/webservice.php')
      .then(data => {
        console.log(data.data);

        let optionMarka = "";
        let optionRodzaj = "";
        let optionType = "";

        if (data.data !== "") {
          console.log(data.data);
          optionMarka = data
            .data
            .map((data, key) => <option value={key}>{data.name}</option>);
        }

        if (data.data !== "") {

          optionRodzaj = data
            .data[this.state.keyLevel1]
            .subcategory
            .map((data, key) => <option value={key}>{data.name}</option>);
        }

        if (data.data !== "") {
          optionType = data
            .data[this.state.keyLevel1]
            .subcategory[this.state.keyLevel2]
            .type
            .map((data, key) => <option key={key} value={key} selected={key==="0"?"selected": null}>{data.name}</option>);
        }

         
        self.setState({"data": data.data, "optionMarka": optionMarka, "optionRodzaj": optionRodzaj, "optionType": optionType, "selectLevel2": 0, "selectLevel3": 0});

      })
  }

  changeLevel1(e) {
    //console.log(e.target.value);

    let optionRodzaj;
    let optionType;

    if (this.state.data !== "") {
      if (this.state.data[e.target.value].subcategory !== undefined) {
        //console.log(this.state);
        //optionRodzaj = <option value="" selected="selected">wybierz rodzaj maszyny</option>
        optionRodzaj = this
          .state
          .data[e.target.value]
          .subcategory
          .map((data, key) => <option key={key} value={key} selected={key === 0 ? "selected": null}>{data.name}</option>);
      } else {
        //przejdź do strony
      }
    }

    if (this.state.data !== "") {
      if (this.state.data[e.target.value].subcategory[0].type !== undefined) {

        optionType = this
          .state
          .data[e.target.value]
          .subcategory[0]
          .type
          .map((data, key) => <option key={key} value={key} selected="selected">{data.name}</option>);
      } else {
        //przejdź do innej strony
      }
    }

    this.setState({"keyLevel1": e.target.value, "optionRodzaj": optionRodzaj, "optionType": optionType, "selectLevel1": e.target.value, "selectLevel2": 0, "selectLevel3": 0});

  }

  changeLevel2(e) {
    //console.log(e.target.value);
    let optionType;

    if (this.state.data !== "") {
      if (this.state.data[this.state.keyLevel1].subcategory[e.target.value].type !== undefined) {

        optionType = this
          .state
          .data[this.state.keyLevel1]
          .subcategory[e.target.value]
          .type
          .map((data, key) => <option key={key} value={key}>{data.name}</option>);
      } else {
        //przejdź do innej strony
      }
    }

    this.setState({"keyLevel2": e.target.value, "optionType": optionType, "selectLevel2": e.target.value, "selectLevel3": 0});
  }

  changeLevel3(e) {
    console.log(e.target.value);
    console.log(this.state.data[this.state.selectLevel1].subcategory[this.state.selectLevel2].type[e.target.value]);
    let id = this.state.data[this.state.selectLevel1].subcategory[this.state.selectLevel2].type[e.target.value].id;
    let linkRewrite = this.state.data[this.state.selectLevel1].subcategory[this.state.selectLevel2].type[e.target.value].link_rewrite;
    let link = "http://sklep.ambrozy.com.pl/"+id+"-"+linkRewrite;
    console.log(link);
    window.location.href = link;
    

    this.setState({"keyLevel3": e.target.value});
  }

  render() {

    //console.log(this.state);
    let optionMarka = this.state.optionMarka;
    let optionRodzaj = this.state.optionRodzaj;
    let optionType = this.state.optionType;

    let rodzajCounter = 0;
    let typeCounter = 0;

    let markaCounter = this.state.data.length-1;
    if(this.state.data !== "")
    {
      rodzajCounter = this.state.data[this.state.selectLevel1].subcategory.length-1;
    }

    console.log(this.state.data);
    console.log(this.state.data[this.state.keyLevel1]);
    console.log(this.state.keyLevel1, this.state.keyLevel2);
    if(this.state.data !== "")
    {
      typeCounter = this.state.data[this.state.selectLevel1].subcategory[this.state.selectLevel2].type.length-1;
    }
    
 
    //let typeCounter = this.state.data.length;

    const selectEnabled2 = <select id="test" className="form-control" onChange={this.changeLevel2.bind(this)} value={this.state.selectLevel2}>{optionRodzaj}</select>;
    const selectDisabled2 = <select id="test2" className="form-control" ><option>Wybierz rodzaj maszyny</option></select>;
    let select2 = this.state.selectLevel1 === 0 ? selectDisabled2: selectEnabled2;
    
   // console.log(this.state.selectLevel2);
    return (
      <div
        className="row"
        style={{
        backgroundColor: '#821515',
        color: 'white',
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 15
      }}>
        <div className="col-md-3 bigLetter">KUP NASZE CZĘŚCI
          <br/>Wybierz swój pojazd</div>
        <div className="col-md-3">
          <label htmlFor="marka" className="whiteText">Marka ({markaCounter})</label><br/>
          <select
            className="form-control"
            onChange={this
            .changeLevel1
            .bind(this)}
            value={this.state.selectLevel1}>
            {optionMarka}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="rodzaj" className="whiteText">Rodzaj maszyny ({rodzajCounter})</label><br/>
          {select2}
        </div>
        <div className="col-md-3">
          <label htmlFor="model" className="whiteText">Model/Rodzaj maszyny ({typeCounter})</label><br/>
          <select
            className="form-control"
            onChange={this
            .changeLevel3
            .bind(this)}
            value={this.state.selectLevel3}>
            {optionType}
          </select>
        </div>
      </div>
    );
  }
}

export default ReactMultiSelect;