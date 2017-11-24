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
      "optionType": ""

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
            .map((data, key) => <option value={key}>{data.name}</option>);
        }

        self.setState({"data": data.data, "optionMarka": optionMarka, "optionRodzaj": optionRodzaj, "optionType": optionType});

      })
  }

  changeLevel1(e) {
    console.log(e.target.value);

    let optionRodzaj;
    if (this.state.data !== "") {
      if (this.state.data[e.target.value].subcategory !== undefined) {
        console.log(this.state);
        optionRodzaj = this
          .state
          .data[e.target.value]
          .subcategory
          .map((data, key) => <option value={key}>{data.name}</option>);
      } else {
        //przejdź do strony
      }
    }

    this.setState({"keyLevel1": e.target.value, "optionRodzaj": optionRodzaj});
  }

  changeLevel2(e) {
    console.log(e.target.value);
    let optionType;

    if (this.state.data !== "") {
      if (this.state.data[this.state.keyLevel1].subcategory[e.target.value].type !== undefined) {

        optionType = this
          .state
          .data[this.state.keyLevel1]
          .subcategory[e.target.value]
          .type
          .map((data, key) => <option value={key}>{data.name}</option>);
      } else {
        //przejdź do innej strony
      }
    }

    this.setState({"keyLevel2": e.target.value, "optionType": optionType});
  }

  changeLevel3(e) {
    console.log(e.target.value);

    this.setState({"keyLevel3": e.target.value});
  }

  render() {

    console.log(this.state);
    let optionMarka = this.state.optionMarka;
    let optionRodzaj = this.state.optionRodzaj;
    let optionType = this.state.optionType;

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
          <label htmlFor="marka" className="whiteText">Marka</label><br/>
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
          <label htmlFor="rodzaj" className="whiteText">Rodzaj maszyny</label><br/>
          <select
            className="form-control"
            onChange={this
            .changeLevel2
            .bind(this)}
            value={this.state.selectLevel2}>
            {optionRodzaj}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="model" className="whiteText">Model/Rodzaj maszyny</label><br/>
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