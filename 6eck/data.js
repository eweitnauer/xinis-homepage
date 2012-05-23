function loadData() {
  var data = 
  [{label: "Grafik",
    path: "grafik",
    count: 9
   }
  ,{label: "Fotografie",
    path: "fotografie",
    count: 6
   }
  ,{label: "Malerei",
    path: "malerei",
    count: 4
   }
   ,{label: "Medien",
     path: "medien",
     count: 7
   }
   ,{label: "Medien2",
     path: "medien",
     count: 7
   }
   ,{label: "Medien3",
     path: "medien",
     count: 7
   }];
  
  addChildren(data);
  addId(data);
  addI(data);
  addKind(data);
  return data;
}

function addChildren(data) {
  for (var i=0; i<data.length; i++) {
    data[i].children = [];
    for (var j=1; j<=data[i].count; j++) {
      data[i].children.push({image: data[i].path+'/'+j+".png"});
    }
  }
}

var id_counter = 0;
function addId(data) {
  for (var i=0; i<data.length; i++) {
    data[i].id = id_counter++;
    if (data[i].children) addId(data[i].children);
  }
}

function addI(data, start_at) {
  if (typeof(start_at) === 'undefined') start_at = 0;
  for (var i=0; i<data.length; i++) {
    data[i].i = start_at+i;
    if (data[i].children) addI(data[i].children, data.length);
  }
}

function addKind(data, lvl) {
  if (typeof(lvl) === 'undefined') lvl = 0;
  for (var i=0; i<data.length; i++) {
    data[i].kind = ['main', 'sub'][lvl];
    if (data[i].children) addKind(data[i].children, lvl+1);
  }
}
