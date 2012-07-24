function loadData() {
  var data = 
  [{label: "Kunst+Foto",
    children: ['kunst/f1.png', 'kunst/f2.png', 'kunst/f3.png','kunst/f4.png', 'kunst/k1.png', 'kunst/k2.png', 'kunst/k3.png','kunst/k4.png']
   }
  ,{label: "Grafik",
    children: ['grafik/g1.png', 'grafik/g2.png', 'grafik/g3.png', 'grafik/g4.png', 'grafik/allergosan.png', 'grafik/crelo.png', 'grafik/heizung.png', 'grafik/htm.png', 'grafik/ilab.png', 'grafik/lesen.png', 'grafik/redearth.png', 'grafik/siemens.png', ]
   }
  ,{label: "Illustration",
    children: ['illustration/1.png', 'illustration/2.png', 'illustration/3.png', 'illustration/4.png', 'illustration/5.png', 'illustration/6.png']
   }
   ,{label: "Medien",
     children: ['medien/1.png', 'medien/2.png', 'medien/3.png', 'medien/4.png', 'medien/5.png', 'medien/6.png', 'medien/7.png', 'medien/8.png']
   }];
  
  addChildren(data);
  addId(data);
  addI(data);
  addKind(data);
  return data;
}

function addChildren(data) {
  for (var i=0; i<data.length; i++) {
    for (var j=0; j<data[i].children.length; j++) {
      data[i].children[j] = {img: data[i].children[j]};
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
