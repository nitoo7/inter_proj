export default function reducer(state={
    list: [],
    total: 0,
    presents: 0,
    rollno_Sort: 'asc',
    name_Sort: 'asc',
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_LIST": {
        var presents = 0;
        action.payload.map(function(item) {
          if(item.Status == true) {
            presents++;
          }
        })

        return {
          ...state,
          fetching: false,
          fetched: true,
          list: action.payload,
          total: action.payload.length,
          presents: presents,
        }
      }
      
      case "SORT_LIST": {     
        console.log('00000===>', action.payload)
        var presents = 0;
        var rollno_sort = action.payload.roll_sort;
        var name_sort = action.payload.name_sort;
        action.payload.list.map(function(item) {
          if(item.Status == true) {
            presents++;
          }
        })

        function dynamicSort(property, sort) {
            var sortOrder = 1;
            if(sort !== "asc") {
              sortOrder = -1;
            }
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
        if(action.payload.key == "Name") {
          if(name_sort == "asc") {
            action.payload.list.sort(dynamicSort("Name", "asc"));
            name_sort = "desc";
          } else {
            action.payload.list.sort(dynamicSort("Name", "desc"));
            name_sort = "asc";
          }

        } else {
          if(rollno_sort == "asc") {
            action.payload.list.sort(dynamicSort("RollNo", "asc"));
            rollno_sort = "desc";
          } else {
            action.payload.list.sort(dynamicSort("RollNo", "desc"));
            rollno_sort = "asc";
          }
        }
        
        console.log('>>>>', rollno_sort, name_sort)
        
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: action.payload.list,
          total: action.payload.list.length,
          presents: presents,
          rollno_Sort: rollno_sort,
          name_Sort: name_sort,
        }
      }
      
      case "SEARCH_LIST": {
        var presents = 0;
        action.payload.list.map(function(item) {
          if(item.Status == true) {
            presents++;
          }
        })        
        //var newList=[];
        action.payload.list.map(function(item) {
          if(action.payload!== "" && item.Name.includes(action.payload.key)) {
           // newList.push(item);
           item.hide = false;
          } else {
            item.hide = true;
          }
        })      
        
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: action.payload.list,
          total: action.payload.list.length,
          presents: presents
        }
      }           
      
      case "MARK_ATTENDANCE": {
        var presents = 0;
        
        action.payload.list.map(function(item){
          if(item.RollNo == action.payload.rollno) {
            item.Status = item.Status ? false : true;
          }
          if(item.Status == true) {
            presents++;
          }
        })  
           
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: action.payload.list,
          total: action.payload.list.length,
          presents: presents
        }
      }         
       
    }

    return state
}
