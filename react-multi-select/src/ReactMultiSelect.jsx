import React, { Component } from 'react';
import axios from 'axios';

class ReactMultiSelect extends Component {

    constructor(){
        super()
        this.state = {
            "selectLevel1": "",
            "selectLevel2": "",
            "selectLevel3": ""
        }

    }


    componentDidMount(){
        let self = this;
        axios.get('http://sklep.ambrozy.com.pl/webservice.php').then(data => {
            console.log(data.data);
            self.setState({"data": data.data});
        })
    }

    changeLevel1(e){
        console.log(e.target.value);
        let rodzajMaszyny = [{"name":"test1", "id":"1"}, {"name":"test2", "id":"2"}, {"name":"test3", "id":"3"}];

        this.setState({"selectLevel1": e.target.value, "optionRodzajMaszyny":rodzajMaszyny });

    }


    
  render() {

    console.log(this.state);
    let  optionMarka = "";

    if(this.state.data !== undefined){
            optionMarka = this.state.data.map((data) =>
            <option value={data.id}>{data.name}</option>
        );
    }

  


    return (
        <div className="row" style={{backgroundColor: '#821515', color: 'white', marginTop: 15, paddingTop: 10, paddingBottom: 15}}>
        <div className="col-md-3 bigLetter">KUP NASZE CZĘŚCI <br />Wybierz swój pojazd</div>
        <div className="col-md-3">
          <label htmlFor="marka" className="whiteText">Marka</label><br />
          <select className="form-control" onChange={this.changeLevel1.bind(this)} value={this.state.selectLevel1}>
           {optionMarka}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="rodzaj" className="whiteText">Rodzaj maszyny</label><br />
          <select className="form-control">
            
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="model" className="whiteText">Model/Rodzaj maszyny</label><br />
          <select className="form-control">
            <option>Model 1</option>
            <option>Model 1</option>
          </select>
        </div>  
      </div>
    );
  }
}

export default ReactMultiSelect;