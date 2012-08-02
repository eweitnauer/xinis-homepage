function loadData() {
  var data = 
  [
  {title: "Kunst+Foto"
  ,children:
    [{title: ''
     ,img: 'kunst/f1.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/f2.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/f3.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/f4.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/k1.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/k2.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/k3.png'
     ,description: 'Test Test Test'}
    ,{title: ''
     ,img: 'kunst/k4.png'
     ,description: 'Test Test Test'}
    ]
  },
  {title: "Grafik"
  ,children:
    [{title: ''
     ,img: 'grafik/g1.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/g2.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/g3.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/g4.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/allergosan.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/crelo.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/heizung.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/htm.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/ilab.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/lesen.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/redearth.png'
     ,description: ''}
    ,{title: ''
     ,img: 'grafik/siemens.png'
     ,description: ''}
    ]
  },
  {title: "Illustration"
  ,children:
    [{title: ''
     ,img: 'illustration/1.png'
     ,description: ''}
    ,{title: ''
     ,img: 'illustration/2.png'
     ,description: ''}
    ,{title: ''
     ,img: 'illustration/3.png'
     ,description: ''}
    ,{title: ''
     ,img: 'illustration/4.png'
     ,description: ''}
    ,{title: ''
     ,img: 'illustration/5.png'
     ,description: ''}
    ,{title: ''
     ,img: 'illustration/6.png'
     ,description: ''}
    ]
  },
  {title: "Medien"
  ,children:
    [{title: ''
     ,img: 'medien/1.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/2.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/3.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/4.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/5.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/6.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/7.png'
     ,description: ''}
    ,{title: ''
     ,img: 'medien/8.png'
     ,description: ''}
    ]
  }];
  
  addId(data);
  addI(data);
  return data;
}

var id_counter = 0;
function addId(data) {
  for (var i=0; i<data.length; i++) {
    data[i].id = id_counter++;
    if (data[i].children) addId(data[i].children);
  }
}

function addI(data, start_at) {
  start_at = start_at || 0;
  for (var i=0; i<data.length; i++) {
    data[i].i = start_at+i;
    if (data[i].children) addI(data[i].children, data.length);
  }
}
