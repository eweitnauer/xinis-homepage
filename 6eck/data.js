function loadData() {
  var data = [{i: 0, label: "Illustrationen", children:
       [{i: 4, label: "I1"}
       ,{i: 5, label: "I2"}
       ,{i: 6, label: "I3"}
       ,{i: 7, label: "I4"}
       ,{i: 8, label: "I5"}
       ,{i: 9, label: "I6"}
       ,{i: 10, label: "I7"}
       ,{i: 11, label: "I8"}
       ,{i: 12, label: "I9"}
       ]
     },
     {i: 1, label: "Kunst", children:
       [{i: 4, label: "K1"}
       ,{i: 5, label: "K2"}
       ,{i: 6, label: "K3"}
       ,{i: 7, label: "K4"}
       ]
     },
     {i: 2, label: "Logos", children:
       [{i: 4, label: "L1"}
       ,{i: 5, label: "L2"}
       ,{i: 6, label: "L3"}
       ,{i: 7, label: "L4"}
       ,{i: 8, label: "L5"}
       ,{i: 9, label: "L6"}]
     },
     {i: 3, label: "Kataloge", children:
       [{i: 4, label: "K1"}]
     }];
     
//  addLevel(data, 0);
//  addI(data, 0);
  return data;
}

function addI(data, start_at) {
  for (var i=0; i<data.length; i++) {
    data[0].i = start_at+i;
    if (data.children) addI(data.children, start_at+data.length);
  }
}

function addLevel(data, lvl) {
  for (var i=0; i<data.length; i++) {
    data[i].css_class = 'level' + lvl;
    if (data.children) addLevel(data.children, lvl+1);
  }
}
