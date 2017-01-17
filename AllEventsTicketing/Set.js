function Set() {
	
	
	this.intersection = function(listA, listB) {

       if (listA === null || listB === null) {
           return null;
       }

       var resultList = [];

       var arrayLength = listA.length;
       for (var i = 0; i < arrayLength; i++) {
           var nextValue = listA[i];

           for (var j = 0; j < listB.length; j++) {
               if (listB[j] === nextValue) {
                   resultList.push(listB[j]);
                   break;
               }
           }
       }

	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {

        if (listA === null || listB === null) {
            return null;
        }

        var resultList = [];
        this.append(resultList,listA);

        var relativeComp = this.relativeCompliment(listB, listA);
        this.append(resultList,relativeComp);

	   return resultList;
	}




	this.relativeCompliment = function(listA, listB) {

        if (listA === null || listB === null) {
            return null;
        }

        if (listB.length === 0) {
            return listA;
        }

        var resultList = [];

        for (var i = 0; i < listA.length; i++) {
            for (var j = 0; j < listB.length; j++) {
                if (listA[i] === listB[j]) {
                    break;
                }
                if (listB[j + 1] == undefined) {
                    resultList.push(listA[i]);
                }
            }
        }
       
	   return resultList;
	}



	this.symetricDifference = function(listA, listB) {

        if (listA === null || listB === null) {
            return null;
        }

	    var resultList = [];
	    var relativeComplimentResult = this.relativeCompliment(listA, listB);
        this.append(resultList,relativeComplimentResult);

	    relativeComplimentResult = this.relativeCompliment(listB, listA);
        this.append(resultList,relativeComplimentResult);

	   return resultList;
	}

	this.append = function(resultList, list) {
        for (var i = 0; i < list.length; i++) {
            resultList.push(list[i]);
        }
    }
}
