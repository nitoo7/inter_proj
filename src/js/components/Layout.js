import React from "react"
import { connect } from "react-redux"

import { fetchList, sortList, searchList, markAttendance } from "../actions/listActions"

@connect((store) => {
  return {
    list: store.list.list,
    total: store.list.total,
    presents: store.list.presents,
    rollno_Sort: store.list.rollno_Sort,
    name_Sort: store.list.name_Sort
  };
})
export default class Layout extends React.Component {
  
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.markAttendance = this.markAttendance.bind(this);
    
    this.state = {
      searchText: "",
    };
  }
  
  componentWillMount() {
    this.props.dispatch(fetchList());
  }

  
  onSearch(e) {
  this.setState({ searchText: e.target.value });
  this.props.dispatch(searchList(this.props.list, e.target.value));
  }
  
  sortBy(key, name_sort, roll_sort) {
    this.props.dispatch(sortList(this.props.list, key, name_sort, roll_sort));
  }
  
  markAttendance(list, rollno) {
    this.props.dispatch(markAttendance(list, rollno));
  }

  render() {
    const { list, studentsInfo} = this.props;
    var present= 0;
    this.props.list.map(function(item){
      if(item.Status == true) {
        present++;
      }
    })

    return (
      <div>
    
      <h1>Students Attendence Sheet</h1>
      <h2>Total No: - {this.props.total}</h2>
      <h2>Present Strength: - {this.props.presents}</h2>

      <input type="text" value={this.state.searchText} onChange = {this.onSearch}></input>      
      <div>
        <div style={{width:'100%'}}>
          <div style={{width:'30%', float:'left', cursor: 'pointer', 'background-color': 'antiquewhite'}} onClick={(evt) => this.sortBy('RollNo', this.props.name_Sort, this.props.rollno_Sort) }>Roll No</div>
          <div style={{width:'30%', float:'left', cursor: 'pointer',  'background-color': 'antiquewhite'}} onClick={(evt) => this.sortBy('Name', this.props.name_Sort, this.props.rollno_Sort) }>Name</div>
          <div style={{width:'30%', float:'left', cursor: 'pointer',  'background-color': 'antiquewhite'}}>Mark Attendance</div>
        </div>     
        {this.props.list.map(item => 
          !(item.hide) ?
          <div style={{width:'100%'}}>
            <div style={{width:'30%', float:'left'}}>{item.RollNo}</div>
            <div style={{width:'30%', float:'left'}}>{item.Name}</div>
            <div style={{width:'30%', float:'left'}}><input onClick={(evt) => this.markAttendance(this.props.list, item.RollNo) } type="checkbox" name="vehicle" checked={item.Status}></input></div>
          </div>  : ""
        )}               
      </div>    
    </div>    
    )
  }
}
