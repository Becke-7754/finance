// Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstrigs = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    incomeList: '.income__list',
    expenseList: '.expenses__list',
    tusuvLabel : '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: ".budget__expenses--value",
    percentageLabel: '.budget__expenses--percentage',
    containerDiv: ".container"
  }
return {
  getInput: function(){
    return {
      type: document.querySelector(DOMstrigs.inputType).value,
      description: document.querySelector(DOMstrigs.inputDescription).value,
      value: parseInt(document.querySelector(DOMstrigs.inputValue).value)
    };
  },
  getDOMstrings: function (){
    return DOMstrigs;
  },

  clearFields: function(){
    var fields = document.querySelectorAll(DOMstrigs.inputDescription + ', ' +  DOMstrigs.inputValue);



// COnvert list to Array
var fieldsArr = Array.prototype.slice.call(fields);
fieldsArr.forEach(function(el, index, array){
  el.value = "";
})
// for(var i = 0 ; i < fieldsArr.length; i++) {
//   fieldsArr[i].value = "";
// }

// CURSORIIG BAIRUULAH
fieldsArr[0].focus();

  },

 tusviigUzuuleh: function(tusuv){
   document.querySelector(DOMstrigs.tusuvLabel).textContent = tusuv.tusuv;
   document.querySelector(DOMstrigs.incomeLabel).textContent = tusuv.totalInc;
   document.querySelector(DOMstrigs.expenseLabel).textContent = tusuv.totalExp;

   if(tusuv.huvi !== 0)
   {
    document.querySelector(DOMstrigs.percentageLabel).textContent = tusuv.huvi + "%";

   } else {
    document.querySelector(DOMstrigs.percentageLabel).textContent = tusuv.huvi;

   }


 },

 deleteListItem: function(id){
   var el = document.getElementById(id);
   el.parentNode.removeChild(el);

 },

  addListItem: function(item, type) {
    // Orlogo zarlagiin elementig aguulsan HMTL-iig beltgene.
    var html, list;
    if(type === 'inc') {
      list = DOMstrigs.incomeList;
      html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else {
      list = DOMstrigs.expenseList;
      html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

    }
    // HTML dotroo orlogo zarlagin utguudig REPLACE ashiglaj uurchilj ugno
    html = html.replace('%id%', item.id);
    html = html.replace('%DESCRIPTION%', item.description);
    html = html.replace('%VALUE%', item.value)
    // Beltgsene HTML-ee DOM ruu hiij ugno
    document.querySelector(list).insertAdjacentHTML("beforeend", html );
  }

};
});

// Санхүүтэй ажиллах контроллер
var financeController = (function () {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    }
    
    var Expense = function(id, description, value) {
      this.id = id;
    this.description = description;
    this.value = value;
    }

var calculateTotal = function(type){
  var sum = 0;
data.items[type].forEach(function(el){
  sum = sum + el.value;
});

data.totals[type] = sum;
}

    var data = {
      items : {
        inc:[],
        exp:[]
      },
      totals: {
        inc: 0,
        exp: 0
      },
     tusuv: 0,

     huvi: 0

    };
    return {
      tusuwTootsooloh: function(){
        // Нийт орлогын нийлбэрийг тооцоолно
        calculateTotal("inc");
         // Нийт зарлагийн нийлбэрийг тооцоолно
        calculateTotal("exp");

        // Төсвийг шинээр тооцоолно
      data.tusuv = data.totals.inc - data.totals.exp;

      // Орлого зарлагийн хувийш тооцоолно
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      },


      tusviigAvah: function(){
        return {
          tusuv: data.tusuv,
          huvi: data.huvi,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp
        }

      },

      deleteItem: function(type, id){
        var ids = data.items[type].map(function(el){
          return el.id;
        });

 
        var index = ids.indexOf(id);



        if(index !== -1){
          data.items[type].splice(index, 1);
        }

      },

      addItem: function(type, desc, val) {
        var item, id;
        if(data.items[type].length === 0) id = 1;
        else {
         id = data.items[type][data.items[type].length - 1].id + 1;
        }
        if(type === 'inc'){
          item = new Income(id, desc, val);
        }
          else {
            item = new Expense(id, desc, val);
          }

       data.items[type].push(item);

       return item;
      }
    }
});

// Програмын холбогчконтроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function() {    
// 1. Oruulah ugugdliig delgetsees olj awna
var input = uiController.getInput();
if(input.description !== "" && input.value !== ""){

  // 2. Oruulah ogogdluudee sanhuugiin controllert damjuulj tend hadgalna
  var item = financeController.addItem(input.type, input.description, input.value);
  // 3 .Olj awsan ogogdluudiig   web deeree tohiroh hesegt n gargana
  uiController.addListItem(item, input.type);
  uiController.clearFields();
  // 4.Tusviig tootsoolno
  financeController.tusuwTootsooloh();

  // 5. Etssiin uldegdel toostoog delgetsend gargana
var tusuv = financeController.tusviigAvah();
// Tuswiin tootsoog delgetsend gargah
uiController.tusviigUzuuleh(tusuv);
    }
  };
  var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();
  
    document.querySelector(DOM.addBtn).addEventListener('click', function(){
      ctrlAddItem();
        });
      
        document.addEventListener('keypress', function(event) {
          if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
          }
        });

        document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
          var id =event.target.parentNode.parentNode.parentNode.parentNode.id;

          if(id){
                      var arr = id.split('-');;
                      var type = arr[0];
                      var itemId = parseInt(arr[1]);

                      console.log(type + ' ===> ' + itemId);

                      // 1. Санхүүгийн модулиас, iD ашиглаад устгана.
                      financeController.deleteItem(type, itemId)

                      // 2. Дэлгэц дээрээс энэ элементийг устгана.

                      uiController.deleteListItem(id);

                      // 3. Үлдэглэл тооцоог шинэчилж харуулна.
          }
        });
  };
return {
  init: function() {
    console.log('Applications started....');
    uiController.tusviigUzuuleh({
      tusuv: 0,
      huvi: 0,
      totalInc: 0,
      totalExp: 0})
    setupEventListeners();
  }
};

})(uiController, financeController);


appController.init();