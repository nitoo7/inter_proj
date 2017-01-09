export function fetchList() {
  return {
    type: "FETCH_LIST",
    payload: [
      {
          RollNo: '1',
          Name: 'Nithin',
          Status: false,
          hide: false
      },
      {
          RollNo: '2',
          Name: 'Freddy',
          Status: false,
          hide: false
      },
      {
          RollNo: '3',
          Name: 'Abhilash',
          Status: false,
          hide: false
      },
      {
          RollNo: '4',
          Name: 'Kai',
          Status: false,
          hide: false
      },
      {
          RollNo: '5',
          Name: 'Deepak',
          Status: false,
          hide: false
      },
    ]
  }
}

export function sortList(list, key, name_sort, roll_sort) {
  return {
    type: 'SORT_LIST',
    payload: {
      key: key,
      name_sort: name_sort,
      roll_sort: roll_sort,
      list: list,
    }
  }
}

export function searchList(list, key) {
  return {
    type: 'SEARCH_LIST',
    payload: {
      key: key,
      list: list
    }
  }
}

export function markAttendance(list, rollno) {
  return {
    type: 'MARK_ATTENDANCE',
    payload: {
      list: list,
      rollno: rollno
    }
  }
  
}
